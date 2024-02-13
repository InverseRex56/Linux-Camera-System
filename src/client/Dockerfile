# Use the official Python image as the base image
FROM python:3.8-slim

# Update the package repositories and upgrade installed packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y procps
RUN apt-get update && apt install iputils-ping -y

COPY requirements.txt .

# Install Flask and requests using pip
# RUN pip install flask requests
RUN pip install --no-cache-dir -r requirements.txt

# Set the working directory in the container
WORKDIR /app

# Copy the Flask application files to the container
COPY client.py .
COPY config.json .

# Expose the port that the Flask app will run on (adjust as needed)
EXPOSE 8081
# EXPOSE 8100

# Run the Flask application
CMD ["python", "client.py"]
