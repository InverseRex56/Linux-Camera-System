# Senior_Design

To run this application, ensure you have [docker](https://docs.docker.com/engine/install/) installed and have the docker engine launched.



# Client
## Definition
In this project, the client is defined as the linux-based machine that streams a RTSP stream through a webcam and hosts a flask server. Typically, you would run the client code on a Raspberry Pi. Ensure that the linux machine you are planning to run your client-side code with a USB webcam attached, and that an appropriate entry for the the webcam is in your system. For example, if you type `ls /dev` and see the `/dev/video0` device file, you most likely have a webcam attached to your client machine.

## Launching/Closing the Client Code
To launch the client side code, ensure you have the Docker Engine installed, and run the following in the terminal:
```bash
cd src/client
docker compose up --build
```
To close the client side code,  run the following in the terminal:
```
cd src/client
docker compose down
```
## Viewing the RTSP Stream
After launching the client-side code, you can view the RTSP stream from your device's webcam by viewing it through a streaming app such as [VLC Viwer](https://www.videolan.org/vlc/). These instructions pertain to viewing the RTSP stream in VLC Viewer, but it should be consistent across most streaming apps. 

On VLC Viewer:
- press `Media` on the top left corner
- press on `Open Network Stream`
- enter in the following URL in the section that says `Please enter a network URL:`: `rtsp://<ip>:8554/cam`. Where `<ip>` is the wi-fi IP address of your device. For example: `rtsp://192.168.1.175:8554/cam`
- press `Play`
- you should now see a real-time stream coming from your webcam. Note: You are able to view this real-time stream from any wifi-based devices in your network as long as you follow these steps to view an RTSP stream on VLC Viewer



# Server
## Definition
In this project, the server is defined as the linux-based machine that hosts many different services such as:
- Running a `Flask` server to act as a interface to forward requests between this server machine and its clients
- Hosts a `Postgres` database to store client-based data
- Hosts a Graphical User Interface for users to interact with the client

Typically, you would run the server on a powerful linux-based or windows-based computer such as a Desktop PC or Laptop. 

## Launching/Closing the Server Code
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

## Commands to Interact with the Server Code
We are currently working on adding additional features to our server-side code, but here are some features that we currently support.

To view the web interface, navigate to your desired web brower (ex. firefox) and enter in the following into the URL text box:
```bash
http://localhost:8082
```

To retrieve data from the `Status` and `Event` Postgres database table respectively, type in the following command in the terminal:
```bash
# get data from "Status" table
curl -X GET http://localhost:8080/get_status_data

# get data from "Event" table
curl -X GET http://localhost:8080/get_event_data
```

To replace data based on cam_id for the `Status` and `Event` table respectively, run:
```bash
# replacing row in "Status" table
curl -X POST http://localhost:8080/replace_row_data_for_status/<cam_id>/<status>/<most_recent_pic>

# example usage for replacing row in "Status" table
curl -X POST http://localhost:8080/replace_row_data_for_status/1/0/'image.jpg'

# replacing row in "Event" table
curl -X POST http://localhost:8080/replace_row_data_for_events/<cam_id>/<event>/<sent_at>
```

To delete a row based on cam_id for the `Status` and `Event` table respectively, run:
```bash
# deleting row with cam_id in "Event" table
curl -X POST http://localhost:8080/delete_data_in_row_for_events/<cam_id>

# example usage for deleting row with cam_id=1 in "Event" table:
curl -X POST http://localhost:8080/delete_data_in_row_for_events/1

# deleting row with cam_id in "Status" table
curl -X POST http://localhost:8080/delete_data_in_row_for_status/<cam_id>

# example usage for deleting row with cam_id=1 in "Event" table:
curl -X POST http://localhost:8080/delete_data_in_row_for_status/1
```

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


