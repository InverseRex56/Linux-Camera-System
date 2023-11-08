#!/bin/sh

# Remove the contents of the /var/lib/postgresql/data directory
rm -rf /var/lib/postgresql/data/*

# Execute the PostgreSQL entrypoint command to start the database service
docker-entrypoint.sh postgres
