### ANHTONS CODE #######

import json
import socket

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

def start_server(port):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('0.0.0.0', port))
    server_socket.listen(1)
    print(f"Server listening on port {port}")

    while True:
        client_socket, client_addr = server_socket.accept()
        print(f"Accepted connection from {client_addr}")
        
        with client_socket:
            data = client_socket.recv(1024)
            if data:
                data = data.decode()
                reader.update_config(data)
                client_socket.sendall("Config updated successfully".encode())
                print(f"ID: {reader.ID}")
                print(f"Version Number: {reader.version_number}")
                print(f"Name: {reader.name}")
                

if __name__ == "__main__":
    config_file = "config.json"
    reader = Reader()
    reader.read_config(config_file)
    
    # Start the server on a specific port (e.g., 8080)
    start_server(8080)

    print(f"ID: {reader.ID}")
    print(f"Version Number: {reader.version_number}")
    print(f"Name: {reader.name}")

