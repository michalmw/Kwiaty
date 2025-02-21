import React from "react";

const PlantItem = ({ plant }) => {
  const backendUrl = "http://localhost:4201";
  return (
    <div className="plant-item">
      <img
        src={`${backendUrl}${plant.photo}`}
        alt={plant.name}
        className="plant-photo"
      />
      <h3 className="plant-name">{plant.name}</h3>
      <p className="watering-schedule">
        Watering Schedule: {plant.wateringRepeat} days
      </p>
      <p className="misting-schedule">
        Misting Schedule: {plant.mistingRepeat} days
      </p>
      <p className="next-watering-date">
        Next Watering Date: {plant.nextWateringDate}
      </p>
      <p className="next-misting-date">
        Next Misting Date: {plant.nextMistingDate}
      </p>
    </div>
  );
};

export default PlantItem;
