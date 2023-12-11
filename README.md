# Saloodo Assessment

## Parcel Tracking Application

This is a Parcel Tracking Application developed as part of the Saloodo interview process.

## Apology Message

Worked on the project for the past 3 days and missed pushing updates to GitHub.

During the last three days, I dedicated my efforts to enhancing the project with various improvements and new features. Unfortunately, due to an oversight, these changes were not pushed to GitHub in real-time. This commit captures the accumulated work over the past three days.

### Changes Made during the first 3 days:

- Set up the Node.js REST API.
- Set up the React Application.
- Created routing for the frontend using react-router-dom.
- Implemented login, signup, and logout functionality with JWT for future authentication.
- Established a simple context provider.
- Developed middleware for validating senders and bikers.
- Created a web dashboard for senders.
- Improved the frontend routing system.
- Implemented sender functionality, enabling them to create parcels with pick-up and drop-off addresses.
- Implemented logic for senders to create new parcels and fetch their existing parcels.
- Implemented frontend for sender's previous parcels.
- Developed backend logic for sender operations.
- Created a bikers landing page displaying available parcels for bikers to select and deliver.
- Implemented backend logic for fetching available parcels for bikers.

I apologize for any inconvenience caused by the delay, and I am now pushing the updates to GitHub for review and collaboration.

### Tools Used:

### Language Used:

- JavaScript

#### Backend:

- Node.js
- Express.js
- Socket.IO

#### Frontend:

- React.js
- Material UI
- Context Provider
- Socket.IO

### How to Run the Application:

#### Option 1: Run Locally

1. Clone the repository:

   ```bash
      git clone https://github.com/omarelsabaawy/Saloodo-Assessment.git
   ```
   
2. Start the backend server:
   ```bash
      cd server
      npm install
      npm start
   ```
3. In a new terminal, start the frontend:
   ```bash
      cd server
      npm install
      npm start
   ```
**Now, the Parcel Tracking Application should be accessible at [http://localhost:3000](http://localhost:3000).**

#### Option 2: Run with Docker

1. Clone the repository:

   ```bash
      git clone https://github.com/omarelsabaawy/Saloodo-Assessment.git
   ```
   
2. Build and run the backend with Docker:

   ```bash
      cd server
      docker build -t saloodoAssessmentServer .
      docker run -p 5000:5000 saloodoAssessmentServer
   ```
3. In a new terminal, build and run the frontend with Docker:

   ```bash
      cd client
      docker build -t saloodoAssessmentClient .
      docker run -p 3000:3000 saloodoAssessmentClient
   ```

**Alternatively, you can use the provided Docker Compose file:**

   ```bash
      docker-compose up
   ```

**Now, the Parcel Tracking Application should be accessible at [http://localhost:3000](http://localhost:3000).**


