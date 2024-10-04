Vehicle Management API

A Node.js RESTful API for managing vehicles, built with Express and MongoDB.
Features

    Create, read, and list vehicles
    Filter vehicles by make or color
    Retrieve a vehicle by its ID

Technologies

    Node.js
    Express
    MongoDB
    Mongoose

Installation

    Clone the repository:

    bash

git clone https://github.com/yourusername/vehicle-api-express.git

Navigate to the project directory:

bash

cd vehicle-management-api

Install the dependencies:

bash

npm install

Start the MongoDB server:

bash

mongod

Run the application:

bash

    npm start

    The server will run on http://localhost:3000.

API Endpoints
GET /api/

    Returns a welcome message.

POST /api/vehicles

    Creates a new vehicle.

GET /api/vehicles

    Lists all vehicles.

GET /api/vehicle/

    Retrieves a vehicle by ID.

GET /api/vehicle/make/

    Retrieves vehicles by make.

GET /api/vehicle/color/

    Retrieves vehicles by color.

License

This project is licensed under the MIT License.
