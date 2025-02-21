import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ListPlants = ({ plants }) => {
  return (
    <Grid container spacing={3}>
      {plants.map((plant) => (
        <Grid item xs={12} sm={6} md={4} key={plant.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={plant.photo}
              alt={plant.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {plant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Original Name: {plant.originalName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Next Watering Date: {plant.nextWateringDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Next Misting Date: {plant.nextMistingDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

ListPlants.propTypes = {
  plants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      originalName: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      nextWateringDate: PropTypes.string.isRequired,
      nextMistingDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListPlants;
