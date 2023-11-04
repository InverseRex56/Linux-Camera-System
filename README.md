# Senior_Design

To run application, ensure you have [docker](https://docs.docker.com/engine/install/) installed. On a terminal, run:
```bash
cd src
docker compose up --build
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
How to enter database cli
```bash
docker container ls
docker exec -it <db_container_id> psql -U postgres db
```

Example:
```bash
user@host:docker container ls
CONTAINER ID   IMAGE        COMMAND            
c3e22a5fa241   src-ui       "docker-entrypoint.s…"
8016e079add4   src-server   "python server.py"
c0a29abb9da5   src-client   "python client.py" 
ab4c08ec6cb6   postgres     "docker-entrypoint.s…"
```

```bash
docker exec -it ab4c08ec6cb6 psql -U postgres db
```