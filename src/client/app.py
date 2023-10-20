### ANHTONS CODE #####

import json
import socket

# Define the server address and port
server_address = ('localhost', 8080)  # Change to the actual server address if it's on a different machine
# server_address = ('169.254.52.74', 8080)

# Create a JSON object with the data you want to send
with open("config.json", "r") as config_file:
    data_to_send = json.load(config_file)

# Convert the JSON object to a string
data_string = json.dumps(data_to_send)

# Create a socket and connect to the server
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(server_address)

# Send the JSON data to the server
client_socket.sendall(data_string.encode())

# Receive a response from the server (optional)
response = client_socket.recv(1024)
print(response.decode())

# Close the socket
client_socket.close()


