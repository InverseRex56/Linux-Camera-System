# Senior_Design
To run this application, ensure you have [docker](https://docs.docker.com/engine/install/) installed and have the docker engine launched.

## Contents
| Functionality |
| ----------------- |
| [Client](#Client)
| [Viewing the RTSP Stream](#viewing-the-rtsp-stream)
| [Network/Server](#Network-Server) 
| [Database](#Database) 
| [User Interface](#User-Interface) 

## Installation
For linux system, you run sudo ./dockerDownload.sh

For Windows/Mac, go to https://www.docker.com/products/docker-desktop/ select your OS version

## Run Locally
Go to Senior_Design/src/client/docker-compose.yaml, uncomment the localhost section.


# Client
In this project, the client is defined as the linux-based machine that streams a RTSP stream through a webcam and hosts a flask server. Typically, you would run the client code on a Raspberry Pi. Ensure that the linux machine you are planning to run your client-side code with a USB webcam attached, and that an appropriate entry for the the webcam is in your system. For example, if you type `ls /dev` and see the `/dev/video0` device file, you most likely have a webcam attached to your client machine.

Launching/Closing the Client Code
To launch the client side locally, ensure you have the Docker Engine installed, and run the following in the terminal:
```bash
cd src/client
docker compose up --build
```
To close the client side code,  run the following in the terminal:
```bash
cd src/client
docker compose down -v #note: the '-v' flag is important so that you properly close down any volumes
```

When trying the run this code ip-based, run ifconfig in the server terminal for Mac(wlan0), Window(wifi name), linux (en0). Once you get the ipv4 ip, you will replace the server ip for the client's docker-compose.ymal file. then we repeat the step to run code locally.

# Viewing the RTSP Stream
After launching the client-side code, you can view the RTSP stream from your device's webcam by viewing it through a streaming app such as [VLC Viwer](https://www.videolan.org/vlc/). These instructions pertain to viewing the RTSP stream in VLC Viewer, but it should be consistent across most streaming apps. 

On VLC Viewer:
- press `Media` on the top left corner
- press on `Open Network Stream`
- enter in the following URL in the section that says `Please enter a network URL:`: `rtsp://<ip>:8554/cam`. Where `<ip>` is the wi-fi IP address of your device. For example: `rtsp://192.168.1.175:8554/cam`
- press `Play`
- you should now see a real-time stream coming from your webcam. Note: You are able to view this real-time stream from any wifi-based devices in your network as long as you follow these steps to view an RTSP stream on VLC Viewer


# Network Server
In this project, the server is defined as the linux-based machine that hosts many different services such as:
- Running a `Flask` server to act as a interface to forward requests between this server machine and its clients
- Hosts a `Postgres` database to store client-based data
- Hosts a Graphical User Interface for users to interact with the client

Typically, you would run the server on a powerful linux-based or windows-based computer such as a Desktop PC or Laptop. 

 Launching/Closing the Server Code
To launch the server side code, ensure you have the Docker Engine installed and run the following in the terminal:
```bash
cd src/server
docker compose up --build
```
To close the server side code,  run the following in the terminal:
```bash
cd src/server
docker compose down -v  #note: the '-v' flag is important so that you properly close down any volumes
```

When trying the run this code ip-based, run ifconfig in the server terminal for Mac(wlan0), Window(wifi name), linux (en0). Once you get the ipv4 ip, you will replace the server ip for the server's docker-compose.ymal file. then we repeat the step to run code locally.

# Database

To interact with the Postgres database command-line interface (CLI) type in the following:
```bash
docker container ls
docker exec -it <db_container_id> psql -U postgres db
\dt
select * FROM "blank";
```

Example:
```bash
user@host:$ docker container ls
CONTAINER ID   IMAGE        COMMAND            
c3e22a5fa241   src-ui       "docker-entrypoint.s…"
8016e079add4   src-server   "python server.py"
c0a29abb9da5   src-client   "python client.py" 
ab4c08ec6cb6   postgres     "docker-entrypoint.s…"  // db_container_id = ab4c08ec6cb6

user@host:$ docker exec -it ab4c08ec6cb6 psql -U postgres db
```

# User Interface
To launch the ui side locally, ensure you have the Docker Engine installed, and run the following in the url of a web browser:
```bash
http://localhost:8082/
```

To launch the ui side host machine, ensure you have the Docker Engine installed, and run the following in the url of a web browser:
```bash
http://server_ip:8082/
```
