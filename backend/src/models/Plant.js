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

module.exports = mongoose.model("Plant", plantSchema);
