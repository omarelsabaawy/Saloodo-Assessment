# Use an official Node.js runtime as a base image
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /Saloodo-Assessment/parcelTracking/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
