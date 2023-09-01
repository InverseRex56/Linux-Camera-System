# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Flask application files to the container
COPY app.py .

# Install necessary dependencies
RUN pip install flask opencv-python mmcv-full

# Download the COCO model configuration and checkpoint files
RUN mkdir model
COPY path_to_config_file model/
COPY path_to_checkpoint_file model/

# Expose the port that the Flask app will run on (adjust as needed)
EXPOSE 5000

# Define the environment variable for Flask to run in production mode
ENV FLASK_ENV=production

# Run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
