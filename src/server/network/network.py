import os
import json
import base64
import requests
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from sqlalchemy import desc

app = Flask(__name__)
CORS(app)

SERVER_IP = os.environ.get("SERVER_IP", "network")

if SERVER_IP == "network":
    sql_address = f"postgresql://postgres:postgres@db:5432/db"
else:
    sql_address = f"postgresql://postgres:postgres@{SERVER_IP}:5432/db"

app.config['SQLALCHEMY_DATABASE_URI'] = sql_address
db = SQLAlchemy(app)



class Camera(db.Model):
    __tablename__ = 'Camera'

    cam_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    ip = db.Column(db.String(100))
    most_recent_pic = db.Column(db.String(10000000))

    def __init__(self, ip, most_recent_pic):
        self.ip = ip
        self.most_recent_pic = most_recent_pic

    def jsonify(self):
       return {"cam_id": self.cam_id, "ip": self.ip, "most_recent_pic": self.most_recent_pic}


@app.route('/client_init_handle', methods=['GET', 'POST'])
def client_init_handle():
    try:
        data = request.get_json()
        ip = data['ip']
        most_recent_pic = data['most_recent_pic']

        # checks if there is an already existing client with the same ip address
        existing_cam = Camera.query.filter_by(ip=ip).first()
        if existing_cam:
            return jsonify({'message': 'Camera with this IP already exists.'}), 404
        
        cam = Camera(ip, most_recent_pic)
        db.session.add(cam)
        db.session.commit()
        return cam.jsonify()
    except Exception as e: 
        print(f"Exception: {e}")
        return jsonify({'message': f"{e}"}), 400


@app.route('/get_ip/<int:cam_id>', methods=['GET', 'POST'])
def get_ip_from_id(cam_id):
    try:
        # Query the Camera table for the IP address corresponding to the given cam_id
        camera = Camera.query.filter_by(cam_id=cam_id).first()
        
        # If a Camera instance with the given cam_id exists, return its IP address
        if camera:
            return jsonify({'ip': camera.ip}), 200
        else:
            return jsonify({'error': f"No camera found with the provided id {cam_id}"}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Function that retrieves the largest camera ID in order to generate cameras.
@app.route('/get_number_of_cams', methods=['POST', 'GET'])
def get_number_of_cams():
    largest_id = db.session.query(db.func.max(Camera.cam_id)).scalar()
    return jsonify({'largest_cam_id': largest_id})


@app.route('/get_id/<string:ip>', methods=['GET', 'POST'])
def get_id(ip):
    try:
        # Query the Camera table to find the cam_id associated with the given IP address
        camera = Camera.query.filter_by(ip=ip).first()

        if camera:
            return jsonify({'cam_id': camera.cam_id})
        else:
            return jsonify({'error': f'No camera found with the provided IP address {ip}'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/n_sec_pic_handle', methods=['POST', 'GET'])
def n_sec_pic_handle():
    try:
        data = request.get_json()

        # extract json elements
        ip = data.get('ip')
        time = data.get('time')
        picture = data.get('picture')

        # obtains cam_id from ip
        request_ip = f"http://{SERVER_IP}:8080/get_id/{ip}"
        response = requests.post(request_ip)
        cam_id = (response.json())['cam_id']

        # Convert the time string to a datetime object
        time_obj = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
        time_only = time_obj.time()

        # Decode the base64-encoded image data
        img_data = base64.b64decode(picture)

        # Save the image data to a file in the uploadPictures folder
        with open(f"uploadPictures/{time_only}_{ip}.jpg", "wb") as img_file:
        # with open(f"uploadPictures/{time_only}_{cam_id}.jpg", "wb") as img_file:
            img_file.write(img_data)


        # Save into events data
        event = Event(ip, time, picture)
        db.session.add(event)  
        db.session.commit()

        # Replace the most_recent_pic field of Camera table
        status_to_replace = Camera.query.get(cam_id)
        
        if status_to_replace:
            status_to_replace.most_recent_pic = picture
            db.session.commit()
            return status_to_replace.jsonify()
        else:
            return jsonify({'message': 'Row not found'}), 404
       
        return jsonify({'message': f'event occured sucesfully'})
    except ValueError:
        return jsonify({'message': 'Error occured'}), 404


class Event(db.Model):
    __tablename__ = 'Event'
    ip =  db.Column(db.String(100))
    time = db.Column(db.String(100), primary_key=True)
    pic = db.Column(db.String(10000000))
    
    def __init__(self, ip, time, pic):
        self.ip = ip
        self.time = time
        self.pic = pic

    def jsonify(self):
        return {"ip": self.ip, "time": self.time, "pic": self.pic}


@app.route('/ui_capture/<int:cam_id>', methods=['POST', 'GET'])
def ui_capture(cam_id):

    # request_ip = f"http://network:8080/get_ip/{cam_id}"
    request_ip = f"http://{SERVER_IP}:8080/get_ip/{cam_id}"
    try:
        response = requests.post(request_ip)
        client_ip = response.json()['ip']
        client_url = "http://" + str(client_ip) + ":8081/ui_capture_handle"

        response = requests.post(client_url)

        if response.status_code == 200:
            data = response.json()

            ip = data['ip']
            time = data['time']
            pic = data['picture']

            # Convert the time string to a datetime object
            time_obj = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
            time_only = time_obj.time()
    
            # Decode the base64-encoded image data
            img_data = base64.b64decode(pic)

            # Save the image data to a file in the uploadPictures folder
            with open(f"uploadPictures/{time_only}_{ip}.jpg", "wb") as img_file:
            # with open(f"uploadPictures/{time_only}_{cam_id}.jpg", "wb") as img_file:
                img_file.write(img_data)
        
            # Create an instance of the img class with the extracted data
            event = Event(ip, time, pic)
    
            # Add the image to the database session
            db.session.add(event)
            db.session.commit()

            # Replace the most_recent_pic field of Camera table
            status_to_replace = Camera.query.get(cam_id)
            
            if status_to_replace:
                status_to_replace.most_recent_pic = pic
                db.session.commit()
                return status_to_replace.jsonify()
            else:
                return jsonify({'message': 'Row not found'}), 404
    
            return 'Image uploaded successfully\n'
    except ValueError:
        return jsonify({'message': 'Error occured'}), 404


@app.route('/get_img/<int:cam_id>', methods=['GET', 'POST'])
def get_img(cam_id):
    data_db = Camera.query.filter_by(cam_id=cam_id).first()
    data_list = []

    if data_db:
        data_list = [{
            'ip': data_db.ip,
            'most_recent_pic': data_db.most_recent_pic
    }]

    return data_list


@app.route('/get_events/<int:N>', methods=['GET', 'POST'])
def get_event(N):
    # Query the database to get the most recent N events sorted by time
    recent_events = Event.query.order_by(desc(Event.time)).limit(N).all()

    # Extract relevant data (e.g., ip, time, pic) from the events
    formatted_events = [{
        'ip': event.ip,
        'time': event.time,
        'pic': event.pic
    } for event in recent_events]

    # Return the formatted events as JSON
    return jsonify(formatted_events)


@app.route('/get_cam_id_events/<int:cam_id>/<int:N>', methods=['GET', 'POST'])
def get_cam_id_events(cam_id, N):

    # obtains cam_id from ip
    request_ip = f"http://{SERVER_IP}:8080/get_ip/{cam_id}"
    response = requests.post(request_ip)
    ip = (response.json())['ip']

    
    # Query the database to get the most recent N events sorted by time
    # recent_events = Event.query.order_by(desc(Event.time)).limit(N).all()
    recent_events = Event.query.filter_by(ip=ip).order_by(desc(Event.time)).limit(N).all()

    # Extract relevant data (e.g., ip, time, pic) from the events
    formatted_events = [{
        'ip': event.ip,
        'time': event.time,
        'pic': event.pic
    } for event in recent_events]

    # Return the formatted events as JSON
    return jsonify(formatted_events)
  
@app.route('/change_n/<int:cam_id>/<int:n>', methods=['POST'])
def change_n(cam_id, n):

    # obtains cam_id from ip
    request_ip = f"http://{SERVER_IP}:8080/get_ip/{cam_id}"
    response = requests.post(request_ip)
    if response.ok:
        client_ip = (response.json())['ip']
      
        request_ip = f"http://{client_ip}:8081/change_n_handle"
        try:
            response = requests.post(request_ip, json={'N': n})
            if response.ok:
                return f'Camera id {cam_id} event capture time N changed to {n}\n'

        except ValueError:
            return jsonify({'message': f'Request gone wrong to client with cam id {cam_id}'}), 404
    else:
        return jsonify({'message': f"Requested cam id {cam_id} doesn't exist in Camera table\n"})


@app.route('/get_n/<int:cam_id>', methods=['POST'])
def get_n(cam_id):

    # obtains cam_id from ip
    request_ip = f"http://{SERVER_IP}:8080/get_ip/{cam_id}"
    response = requests.post(request_ip)
    if response.ok:
        client_ip = (response.json())['ip']
      
        request_ip = f"http://{client_ip}:8081/get_n_handle"
        try:
            response = requests.post(request_ip)
            if response.ok:
                n = (response.json())['N']
                return f'Camera id {cam_id} has a value of N = {n}\n'

        except ValueError:
            return jsonify({'message': f'Request gone wrong to client with cam id {cam_id}'}), 404
    else:
        return jsonify({'message': f"Requested cam id {cam_id} doesn't exist in Camera table\n"})

@app.route('/upload_image', methods=['GET'])
def upload_image():
    image = Image(path=f'/app/uploadPictures/cam1.webp')
    db.session.add(image)
    db.session.commit()
    return 'Image uploaded successfully'


@app.route('/test', methods=['POST', 'GET'])
def test():
    return 'this is a test'


if __name__ == "__main__":
    try:
        with app.app_context():
            db.create_all()
            # db.session.add(Camera("192.168.1.254", "None"))
            db.session.commit()
            app.run(host='0.0.0.0', port=8080, debug=True)
    except: 
        pass

