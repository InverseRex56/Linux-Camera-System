import time
import socket
import multiprocessing
import json
import requests
import cv2
import datetime
import base64
import os
from flask import Flask, request, jsonify

N = 30
SERVER_IP = os.environ.get("SERVER_IP", "network")
ip_address = None
app = Flask(__name__)

def get_ip_address():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]

        return ip_address
    except socket.error:
        return None


def capture_image():
    cap = cv2.VideoCapture(0)
    # cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc('M', 'J', 'P', 'G'))
    
    if not cap.isOpened():
        raise Exception("Could not open webcam")
    
    ret, frame = cap.read()
    cap.release()
    
    if not ret:
        raise Exception("Could not capture frame")
    
    return frame

# Function to convert image to Base64 byte array
def image_to_byte_array(image):
    _, jpeg = cv2.imencode('.jpg', image)
    return base64.b64encode(jpeg.tobytes()).decode('utf-8')


@app.route('/ui_capture_handle', methods=['GET', 'POST'])
def ui_capture_handle():
    try:
        # Capture image using OpenCV
        image = capture_image()
        picture_base64 = image_to_byte_array(image)
        
        dt = datetime.datetime.now()
        
        # Create JSON response
        response_data = {
            "ip": ip_address,
            "time": dt.strftime("%Y-%m-%d %H:%M:%S"),
            "picture": picture_base64
        }
        
        return jsonify(response_data)
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/change_n_handle', methods=['GET', 'POST'])
def change_n_handle():
    global N
    try:
        data = request.get_json()

        n = data.get('N')
        N = n

        return jsonify({'message': f'Changed value of N to {N}'})
    except ValueError:
        return jsonify({'message': 'Error occured'}), 404


@app.route('/get_n_handle', methods=['GET', 'POST'])
def get_n_handle():
    try:
        return jsonify({'N': N})
    except ValueError:
        return jsonify({'message': 'Error occured'}), 404

@app.route('/n_sec_pic', methods=['GET', 'POST'])
def n_sec_pic():
    remote_server_url = f"http://{SERVER_IP}:8080/n_sec_pic_handle"
    
    try:
        dt = datetime.datetime.now()
      
        # Capture base64 image
        image = capture_image()
        picture_base64 = image_to_byte_array(image)
     
        response = requests.post(remote_server_url, 
                            json={'ip': ip_address,
                                  'time': dt.strftime("%Y-%m-%d %H:%M:%S"),
                                  'picture': picture_base64})
                                  
        if response.ok:
            return 'IP address sent successfully to remote server.'
        else:
            return 'Failed to send IP address to remote server.', 500
    except Exception as e:
        return f'Error: {str(e)}', 500


@app.route('/client_init', methods=['GET', 'POST'])
def client_init():
    remote_server_url = f"http://{SERVER_IP}:8080/client_init_handle"
    
    try:
        # Sending IP address to remote server
        response = requests.post(remote_server_url, json={'ip': ip_address,
                                                          'most_recent_pic': "NONE"})
        if response.ok:
            return 'IP address sent successfully to remote server.'
        else:
            return 'Failed to send IP address to remote server.', 500
    except Exception as e:
        return f'Error: {str(e)}', 500


@app.route('/test', methods=['GET', 'POST'])
def test():
    return 'test\n'

if __name__ == "__main__":
    ip_address = get_ip_address()

    flask_process = multiprocessing.Process(target=app.run, kwargs={'host':'0.0.0.0', 'port':8081})
    flask_process.start()

    client_init()

    # uncomment the code below if you want to send pictures from the client every N seconds
    while(1):
        n_sec_pic()
        time.sleep(N)


