# Use an official Node.js runtime as the base image. 
# Built alpine node in 55.9s
FROM node:20.9.0-alpine                

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install
RUN npm install react react-router-dom
RUN npm install -D tailwindcss postcss autoprefixer
RUN npm install react-chrono

# Copy the rest of the application source code to the container
COPY . .

# Expose a port for the Node.js application to listen on (if your app uses a specific port)
EXPOSE 3000

# Start the Node.js application
CMD [ "npm", "start" ]
