const express = require("express");
const PlantController = require("../controllers/plantController");
const PlantService = require("../services/plantService");

const router = express.Router();
const plantService = new PlantService();
const plantController = new PlantController(plantService);

function setRoutes(app, upload) {
  router.post(
    "/plants",
    upload.single("photo"),
    plantController.addPlant.bind(plantController)
  );
  router.get("/plants", plantController.getPlants.bind(plantController));
  router.delete(
    "/plants/:id",
    plantController.deletePlant.bind(plantController)
  );
  router.put(
    "/plants/:id/completed",
    plantController.updateCompletedStatus.bind(plantController)
  );
  router.get(
    "/plants/:id/history",
    plantController.getPlantHistory.bind(plantController)
  );
  router.get(
    "/plants/:id/next-actions",
    plantController.getNextActions.bind(plantController)
  );
  router.put(
    "/plants/:id",
    upload.single("photo"),
    plantController.updatePlant.bind(plantController)
  );

  app.use("/api", router);
}

module.exports = setRoutes;
