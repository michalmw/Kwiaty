const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "plants.json");

class PlantService {
  async createPlant(data) {
    const plants = await this.getAllPlants();
    const newPlant = { id: Date.now().toString(), ...data, completedDates: {} };
    plants.push(newPlant);
    await this.savePlants(plants);
    return newPlant;
  }

  async getAllPlants() {
    try {
      const data = await fs.promises.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async removePlant(id) {
    const plants = await this.getAllPlants();
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    await this.savePlants(updatedPlants);
  }

  async savePlants(plants) {
    await fs.promises.writeFile(filePath, JSON.stringify(plants, null, 2));
  }

  async updateNextDates() {
    const plants = await this.getAllPlants();
    const currentDate = new Date();
    plants.forEach((plant) => {
      if (new Date(plant.nextWateringDate) < currentDate) {
        const nextWateringDate = new Date(plant.nextWateringDate);
        nextWateringDate.setDate(
          nextWateringDate.getDate() + parseInt(plant.wateringRepeat)
        );
        plant.nextWateringDate = nextWateringDate.toISOString().split("T")[0];
      }
      if (new Date(plant.nextMistingDate) < currentDate) {
        const nextMistingDate = new Date(plant.nextMistingDate);
        nextMistingDate.setDate(
          nextMistingDate.getDate() + parseInt(plant.mistingRepeat)
        );
        plant.nextMistingDate = nextMistingDate.toISOString().split("T")[0];
      }
    });
    await this.savePlants(plants);
  }

  async updateCompletedStatus(id, date, type, completed) {
    const plants = await this.getAllPlants();
    const plant = plants.find((plant) => plant.id === id);
    if (plant) {
      if (!plant.completedDates) {
        plant.completedDates = {};
      }
      const isoDate = new Date(date).toISOString().split("T")[0];
      if (!plant.completedDates[isoDate]) {
        plant.completedDates[isoDate] = {};
      }
      plant.completedDates[isoDate][type] = completed;
      await this.savePlants(plants);
    }
  }

  async getPlantHistory(id) {
    const plants = await this.getAllPlants();
    const plant = plants.find((plant) => plant.id === id);
    if (plant) {
      return plant.completedDates;
    }
    throw new Error("Plant not found");
  }

  async getNextActions(id) {
    const plants = await this.getAllPlants();
    const plant = plants.find((plant) => plant.id === id);
    if (plant) {
      return {
        nextWateringDate: plant.nextWateringDate,
        nextMistingDate: plant.nextMistingDate,
      };
    }
    throw new Error("Plant not found");
  }

  async updatePlant(id, data) {
    const plants = await this.getAllPlants();
    const plantIndex = plants.findIndex((plant) => plant.id === id);
    if (plantIndex !== -1) {
      const updatedPlant = { ...plants[plantIndex], ...data };
      plants[plantIndex] = updatedPlant;
      await this.savePlants(plants);
      return updatedPlant;
    }
    throw new Error("Plant not found");
  }
}

module.exports = PlantService;
