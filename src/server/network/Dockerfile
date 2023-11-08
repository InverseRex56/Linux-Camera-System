# Use the official Python image as the base image
FROM python:3.8-slim

# Update the package repositories and upgrade installed packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y procps
RUN apt-get update && apt install iputils-ping -y

# Install Flask using pip
RUN pip install flask

# Set the working directory in the container
WORKDIR /app

# Install Flask and requests using pip
RUN pip install flask requests
RUN pip install flask-cors


# Copy the Flask application files to the container
COPY network.py .

# Expose the port that the Flask app will run on (adjust as needed)
#EXPOSE 8080

# Run the Flask application
CMD ["python", "network.py"]
