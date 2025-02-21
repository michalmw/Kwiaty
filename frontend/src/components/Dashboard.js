import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = ({ plants }) => {
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getNextDate = (startDate, repeat, completedDates = {}, type) => {
    let currentDate = new Date(startDate);
    while (
      completedDates[new Date(currentDate).toISOString().split("T")[0]]?.[type]
    ) {
      currentDate.setDate(currentDate.getDate() + parseInt(repeat));
    }
    return currentDate;
  };

  const todayTasks = plants
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
    .filter(
      (plant) =>
        (isToday(plant.nextWateringDate) &&
          !plant.completedDates?.[
            plant.nextWateringDate.toISOString().split("T")[0]
          ]?.watering) ||
        (isToday(plant.nextMistingDate) &&
          !plant.completedDates?.[
            plant.nextMistingDate.toISOString().split("T")[0]
          ]?.misting)
    );

  return (
    <List>
      {todayTasks.length > 0 ? (
        todayTasks.map((plant) => (
          <ListItem key={plant.id} component={Link} to={`/plants/${plant.id}`}>
            <ListItemAvatar>
              <Avatar src={`http://localhost:4201${plant.photo}`} />
            </ListItemAvatar>
            <ListItemText
              primary={plant.name}
              secondary={
                <>
                  {isToday(plant.nextWateringDate) && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Watering due today
                    </Typography>
                  )}
                  <br />
                  {isToday(plant.nextMistingDate) && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Misting due today
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))
      ) : (
        <Typography>No tasks for today.</Typography>
      )}
    </List>
  );
};

export default Dashboard;
