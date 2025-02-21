import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";

const EditPlantForm = ({ plants, setPlants }) => {
  const { id } = useParams();
  const history = useHistory();
  const plant = plants.find((plant) => plant.id === id);
  const [formData, setFormData] = useState({
    name: "",
    originalName: "", // New field
    wateringRepeat: "",
    mistingRepeat: "",
    nextWateringDate: "",
    nextMistingDate: "",
    photo: null,
  });

  useEffect(() => {
    if (plant) {
      setFormData({
        name: plant.name,
        originalName: plant.originalName, // New field
        wateringRepeat: plant.wateringRepeat,
        mistingRepeat: plant.mistingRepeat,
        nextWateringDate: plant.nextWateringDate,
        nextMistingDate: plant.nextMistingDate,
        photo: plant.photo,
      });
    }
  }, [plant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPlantData = new FormData();
    updatedPlantData.append("name", formData.name);
    updatedPlantData.append("originalName", formData.originalName); // New field
    updatedPlantData.append("wateringRepeat", formData.wateringRepeat);
    updatedPlantData.append("mistingRepeat", formData.mistingRepeat);
    updatedPlantData.append("nextWateringDate", formData.nextWateringDate);
    updatedPlantData.append("nextMistingDate", formData.nextMistingDate);
    if (formData.photo instanceof File) {
      updatedPlantData.append("photo", formData.photo);
    } else {
      updatedPlantData.append("photo", plant.photo); // Retain existing photo
    }

    try {
      const response = await axios.put(
        `http://localhost:4201/api/plants/${id}`,
        updatedPlantData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedPlant = response.data;
      const updatedPlants = plants.map((p) => (p.id === id ? updatedPlant : p));
      setPlants(updatedPlants);
      history.push(`/plants/${id}`);
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  if (!plant) {
    return <Typography>Plant not found</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Edit Plant
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Original Name"
              name="originalName"
              value={formData.originalName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Watering Repeat (days)"
              name="wateringRepeat"
              value={formData.wateringRepeat}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Misting Repeat (days)"
              name="mistingRepeat"
              value={formData.mistingRepeat}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Next Watering Date"
              name="nextWateringDate"
              type="date"
              value={formData.nextWateringDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Next Misting Date"
              name="nextMistingDate"
              type="date"
              value={formData.nextMistingDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              component="label"
              style={{ marginTop: "20px" }}
            >
              Upload Photo
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Save Changes
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditPlantForm;
