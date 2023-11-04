import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Create an empty list to store received data
received_data_list = []

@app.route('/', methods=['POST'])
def receive_data():
    data = request.json
    
    # Append the received data to the list
    received_data_list.append(data)
    
    print("Received data:")
    print(data)
    
    return "Config updated successfully"

@app.route('/get_received_data', methods=['GET'])
def get_received_data():
    # Return the list of received data as JSON
    return json.dumps(received_data_list)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
