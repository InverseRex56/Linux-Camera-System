# Senior_Design

To run application, ensure you have [docker](https://docs.docker.com/engine/install/) installed. Navigate over to /src, and run:
```bash
docker compose build
docker compose up
```



# Commands:
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
