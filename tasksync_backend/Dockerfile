# Use an official Python runtime as a parent image
FROM node:23.5.0-alpine3.21

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN npm install && \
    npm install -g nodemon && \
    npm install -g pm2

# Make port 5000 available to the world outside this container
EXPOSE ${TASKSYNC_BACKEND_PORT:-9000}

# Run the application
CMD ["npm", "start"]