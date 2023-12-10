# Use an official Node.js runtime with your specified version
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose a port (e.g., 5000) that your application will listen on
EXPOSE 5000

# Define the command to run your application
CMD [ "npm", "start" ]