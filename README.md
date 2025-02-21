# Houseplants App

This project is a web application for managing houseplants. It allows users to add plants with photos, names, and set independent watering schedules for misting and watering. The application saves data locally, ensuring that all information is retained even after restarting.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

- **src/app.js**: Entry point of the backend application. Sets up the Express server, connects to the database, and configures middleware and routes.
- **src/controllers/plantController.js**: Contains the `PlantController` class with methods for handling plant-related requests (add, get, delete).
- **src/models/plantModel.js**: Defines the Plant model schema, including properties for name, photo, misting schedule, and watering schedule.
- **src/routes/plantRoutes.js**: Sets up routes for plant-related operations, linking them to the `PlantController` methods.
- **package.json**: Configuration file for npm, listing dependencies and scripts for the backend.

### Frontend

- **public/index.html**: Main HTML file for the frontend application, includes the root div for rendering the React app.
- **src/index.js**: Entry point of the React application, rendering the App component into the root div.
- **src/App.js**: Main App component managing the application state and rendering the AddPlantForm and PlantList components.
- **src/components/AddPlantForm.js**: Component providing a form for users to add a new plant, including fields for name, photo, and watering schedule.
- **src/components/PlantList.js**: Component displaying a list of plants, utilizing the PlantItem component for each individual plant.
- **src/components/PlantItem.js**: Component representing a single plant item in the list, displaying its name and photo.
- **src/styles/App.css**: CSS styles for the frontend application, ensuring a responsive and visually appealing UI.
- **package.json**: Configuration file for npm, listing dependencies and scripts for the frontend.

## Getting Started

To get started with the application, clone the repository and install the necessary dependencies for both the backend and frontend. Follow the instructions in the respective README files for detailed setup and usage information.

## License

This project is licensed under the MIT License.