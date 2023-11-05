import json
import requests
from flask import Flask, request

app = Flask(__name__)

# Define the server address and port
network_url = 'http://network:8080'  # Change to the actual server address if it's on a different machine

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

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)  # Change the port as needed
