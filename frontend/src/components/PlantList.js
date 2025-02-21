import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const PlantList = ({ plants }) => {
  const getNextDate = (startDate, repeat, completedDates = {}, type) => {
    let currentDate = new Date(startDate);
    while (
      completedDates[new Date(currentDate).toISOString().split("T")[0]]?.[type]
    ) {
      currentDate.setDate(currentDate.getDate() + parseInt(repeat));
    }
    return currentDate;
  };

  const sortedPlants = plants
    .map((plant) => {
      const nextWateringDate = getNextDate(
        plant.nextWateringDate,
        plant.wateringRepeat,
        plant.completedDates,
        "watering"
      );
      const nextMistingDate = getNextDate(
        plant.nextMistingDate,
        plant.mistingRepeat,
        plant.completedDates,
        "misting"
      );
      return { ...plant, nextWateringDate, nextMistingDate };
    })
    .sort((a, b) => {
      if (a.nextWateringDate < b.nextWateringDate) return -1;
      if (a.nextWateringDate > b.nextWateringDate) return 1;
      if (a.nextMistingDate < b.nextMistingDate) return -1;
      if (a.nextMistingDate > b.nextMistingDate) return 1;
      return 0;
    });

  return (
    <List>
      {sortedPlants.length > 0 ? (
        sortedPlants.map((plant) => (
          <ListItem key={plant.id} component={Link} to={`/plants/${plant.id}`}>
            <ListItemAvatar>
              <Avatar src={`http://localhost:4201${plant.photo}`} />
            </ListItemAvatar>
            <ListItemText
              primary={plant.name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Next Watering Date: {plant.nextWateringDate.toDateString()}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Next Misting Date: {plant.nextMistingDate.toDateString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))
      ) : (
        <Typography>No plants added yet.</Typography>
      )}
    </List>
  );
};

export default PlantList;
