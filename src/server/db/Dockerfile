# Use the official PostgreSQL image as a base
FROM postgres

RUN apt-get update && apt install iputils-ping -y

# Copy your custom initialization script and SQL file into the container
COPY clear-db-data.sh /clear-db-data.sh
COPY init_tables.sql /docker-entrypoint-initdb.d/init_tables.sql

# Set environment variables
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=db

# Expose the PostgreSQL port
EXPOSE 5432

# Use your custom entrypoint script
CMD ["/clear-db-data.sh"]
