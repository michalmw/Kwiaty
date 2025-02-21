class PlantController {
  constructor(plantService) {
    this.plantService = plantService;
  }

  async addPlant(req, res) {
    try {
      const {
        name,
        originalName, // New field
        wateringRepeat,
        mistingRepeat,
        nextWateringDate,
        nextMistingDate,
      } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;
      const newPlant = await this.plantService.createPlant({
        name,
        originalName, // New field
        photo,
        wateringRepeat,
        mistingRepeat,
        nextWateringDate,
        nextMistingDate,
      });
      res.status(201).json(newPlant);
    } catch (error) {
      console.error("Error adding plant:", error);
      res.status(500).json({ message: "Error adding plant", error });
    }
  }

  async getPlants(req, res) {
    try {
      const plants = await this.plantService.getAllPlants();
      res.status(200).json(plants);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving plants", error });
    }
  }

  async deletePlant(req, res) {
    try {
      const { id } = req.params;
      await this.plantService.removePlant(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting plant", error });
    }
  }

  async updateCompletedStatus(req, res) {
    try {
      const { id } = req.params;
      const { date, type, completed } = req.body;
      await this.plantService.updateCompletedStatus(id, date, type, completed);
      res.status(200).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating completed status", error });
    }
  }

  async getPlantHistory(req, res) {
    try {
      const { id } = req.params;
      const history = await this.plantService.getPlantHistory(id);
      res.status(200).json(history);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving plant history", error });
    }
  }

  async getNextActions(req, res) {
    try {
      const { id } = req.params;
      const nextActions = await this.plantService.getNextActions(id);
      res.status(200).json(nextActions);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving next actions", error });
    }
  }

  async updatePlant(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        originalName, // New field
        wateringRepeat,
        mistingRepeat,
        nextWateringDate,
        nextMistingDate,
      } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;
      const updatedPlant = await this.plantService.updatePlant(id, {
        name,
        originalName, // New field
        photo,
        wateringRepeat,
        mistingRepeat,
        nextWateringDate,
        nextMistingDate,
      });
      res.status(200).json(updatedPlant);
    } catch (error) {
      console.error("Error updating plant:", error);
      res.status(500).json({ message: "Error updating plant", error });
    }
  }
}

module.exports = PlantController;
