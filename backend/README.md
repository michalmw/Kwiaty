## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the `plantController.js` which handles plant-related requests.
  - **models/**: Contains the `plantModel.js` which defines the Plant schema.
  - **routes/**: Contains the `plantRoutes.js` which sets up the routes for plant operations.
  - **app.js**: The entry point of the application, setting up the server and middleware.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd houseplants-app/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the backend server, run:
```
node src/app.js
```

The server will start on the specified port, and you can access the API endpoints for managing houseplants.

## API Endpoints

- **POST /plants**: Add a new plant.
- **GET /plants**: Retrieve a list of all plants.
- **DELETE /plants/:id**: Delete a plant by ID.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.