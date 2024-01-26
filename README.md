# Senior_Design

To run this application, ensure you have [docker](https://docs.docker.com/engine/install/) installed and have the docker engine launched. On a terminal, run:
```bash
cd src
docker compose up --build
```
In order to succesfully shutdown this application run:
```bash
cd src
docker compose down -v
```



# Commands:
To view the web interface for this application, navigate to your desired web browser and enter in:
```bash
http://localhost:<local_machine_ui_port>
```
Example:
```bash
http://localhost:8082
```

To send data from client to server run:
```bash
curl -X GET http://localhost:<local_machine_client_port>/update_and_send
```
Example:
```bash
curl -X GET http://localhost:8081/update_and_send
```

To retrieve data from server, run:
```bash
curl -X GET http://localhost:<local_machine_server_port>/update_and_send
```
Example:
```bash
curl http://localhost:8080/get_received_data
```

To send status data from client to database, run:
```bash
curl -X GET http://localhost:<local_machine_server_port>/send_status
```
Example:
```bash
curl -X GET http://localhost:8081/send_status
```

To send event data from client to database, run:
```bash
curl -X GET http://localhost:<local_machine_server_port>/send_event
```
Example:
```bash
curl -X GET http://localhost:8081/send_event
```
To send replace data based on cam_id for status, run:
```bash
curl -X POST http://localhost:5000/replace_row_data_for_status/<cam_id>/<status>/<most_recent_pic>
```
Example:
```bash
curl -X POST http://localhost:8080/replace_row_data_for_status/1/0/'image.jpg'
```

To send replace data based on cam_id for events, run:
```bash
curl -X POST http://localhost:5000/replace_row_data_for_events/<cam_id>/<event>/<sent_at>
```


To delete a row based on cam_id for events, run:
```bash
curl -X POST http://localhost:5000/replace_row_data_for_events/<cam_id>/<event>/<sent_at>
```
Example:
```bash
curl -X POST http://localhost:8080/delete_data_in_row_for_events/1
```

To delete a row based on cam_id for status, run:
```bash
curl -X POST http://localhost:5000/delete_data_in_row_for_status/<cam_id>
```
Example:
```bash
curl -X POST http://localhost:8080/delete_data_in_row_for_status/1
```

How to enter database cli:
```bash
docker container ls
docker exec -it <db_container_id> psql -U postgres db
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

hosting rtsp server:
```bash
docker run --rm -it  -e MTX_PROTOCOLS=tcp -e MTX_WEBRTCADDITIONALHOSTS=192.168.x.x   -p 8554:8554 -p 1935:1935 -p 8888:8888 -p 8889:8889 -p 8890:8890/udp -p 8189:8189/udp   bluenviron/mediamtx
```

ffplay is used to view and ffmpeg is used to publish to rtsp
```bash
ffplay -rtsp_transport tcp rtsp://192.168.1.250:8554/mystream

ffmpeg -re -stream_loop -1 -i dummy.mp4 -c copy -f rtsp -rtsp_transport tcp rtsp://192.168.1.250:8554/mystream
```