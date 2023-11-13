import json
import requests
from flask import Flask, request

app = Flask(__name__)


network_url = 'http://network:8080' 

@app.route('/update_and_send', methods=['GET'])
def update_and_send_data():
    try:
        with open("config.json", "r") as config_file:
            data_to_send = json.load(config_file)
            response = requests.post(network_url, json=data_to_send)
            return response.text
    except FileNotFoundError:
        return "Config file not found."
    except json.JSONDecodeError:
        return "Error reading the JSON config file."
    

@app.route('/send_status', methods=['GET'])
def send_status():
    cam_status_url = network_url + '/send_status'
    try:
        with open("config.json", "r") as config_file:
            data = json.load(config_file)['status']
            response = requests.post(cam_status_url, json=data)
            return response.text
    except FileNotFoundError:
        return "Config file not found."
    except json.JSONDecodeError:
        return "Error reading the JSON config file."
    

@app.route('/send_event', methods=['GET'])
def send_event():
    cam_event_url = network_url + '/send_event'
    try:
        with open("config.json", "r") as config_file:
            data = json.load(config_file)['event']
            response = requests.post(cam_event_url, json=data)
            return response.text
    except FileNotFoundError:
        return "Config file not found."
    except json.JSONDecodeError:
        return "Error reading the JSON config file."


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)  # Change the port as needed
