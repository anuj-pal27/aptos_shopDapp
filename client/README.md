Project Setup

Prerequisites:
Make sure you have the following installed:

Node.js (version 14.18+ or 16+ recommended)
npm (comes with Node.js)
Install Dependencies

Clone the repository:


git clone https://github.com/anuj-pal27/Project_dapp.git
cd Project_dapp

Install server and client dependencies:


# In the root directory, install dependencies for both server and client

npm install

Install client dependencies:

Navigate to the client folder and install dependencies:


cd client
npm install

Install server dependencies:

Navigate to the server folder and install dependencies:


cd server
npm install

Running the Application
You can run both the server and client simultaneously using the following command:

npm run dev
This will run:

The React client on http://localhost:5173/
The Express server on http://localhost:8080/

Build for Production
To build the React client for production:


cd client
npm run build

Environment Variables
Make sure to configure your environment variables in the .env file where your database connection DB_URL is having mongodb connection