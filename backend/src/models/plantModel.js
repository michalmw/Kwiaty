const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  mistingSchedule: {
    type: String,
    required: true,
  },
  wateringSchedule: {
    type: String,
    required: true,
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
