import json
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class Reader:
    def __init__(self, ID=1, version_number=2, name="hello"):
        self.ID = ID
        self.version_number = version_number
        self.name = name

    def read_config(self, config_file):
        try:
            with open(config_file, 'r') as file:
                config_data = json.load(file)
                self.ID = config_data.get('ID', self.ID)
                self.version_number = config_data.get('version_number', self.version_number)
                self.name = config_data.get('name', self.name)
                print("Config values updated successfully.")
        except FileNotFoundError:
            print("Config file not found.")
        except json.JSONDecodeError:
            print("Error reading the JSON config file.")

    def update_config(self, data):
        try:
            data = json.loads(data)
            self.ID = data.get('ID', self.ID)
            self.version_number = data.get('version_number', self.version_number)
            self.name = data.get('name', self.name)
            print("Config values updated remotely.")
        except json.JSONDecodeError:
            print("Error decoding the JSON data.")

reader = Reader()
config_file = "config.json"
reader.read_config(config_file)

# Create an empty list to store received data
received_data_list = []

@app.route('/', methods=['POST'])
def receive_data():
    data = request.json
    
    # Append the received data to the list
    received_data_list.append(data)
    
    print("Received data:")
    print(data)
    
    # Update the configuration based on the received data
    reader.update_config(json.dumps(data))
    
    return "Config updated successfully"

@app.route('/get_received_data', methods=['GET'])
def get_received_data():
    # Return the list of received data as JSON
    return json.dumps(received_data_list)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data', methods=['GET'])
def get_data():
    # Replace the following line with how you fetch your data
    data = received_data_list
    return jsonify(data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
