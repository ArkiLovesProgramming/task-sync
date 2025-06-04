# Use an official Node.js runtime as the base image
FROM node:23.5.0-alpine3.21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE ${TASKSYNC_FRONTEND_PORT:-3000}

# Start the application
CMD ["npm", "start"]