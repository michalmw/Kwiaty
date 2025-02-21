import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const AddPlantForm = ({ onAddPlant }) => {
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    wateringRepeat: "",
    mistingRepeat: "",
    nextWateringDate: "",
    nextMistingDate: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    onAddPlant(data);
    setFormData({
      name: "",
      photo: null,
      wateringRepeat: "",
      mistingRepeat: "",
      nextWateringDate: "",
      nextMistingDate: "",
    });
  };

  const calculateNextDates = (repeat, setDate) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt(repeat));
    setDate(currentDate.toISOString().split("T")[0]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Plant
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Plant Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
          style={{ margin: "20px 0" }}
        />
        <TextField
          label="Watering Repeat (days)"
          name="wateringRepeat"
          value={formData.wateringRepeat}
          onChange={(e) => {
            handleChange(e);
            calculateNextDates(e.target.value, (date) =>
              setFormData((prevData) => ({
                ...prevData,
                nextWateringDate: date,
              }))
            );
          }}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Misting Repeat (days)"
          name="mistingRepeat"
          value={formData.mistingRepeat}
          onChange={(e) => {
            handleChange(e);
            calculateNextDates(e.target.value, (date) =>
              setFormData((prevData) => ({
                ...prevData,
                nextMistingDate: date,
              }))
            );
          }}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Next Watering Date"
          name="nextWateringDate"
          value={formData.nextWateringDate}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Next Misting Date"
          name="nextMistingDate"
          value={formData.nextMistingDate}
          disabled
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Plant
        </Button>
      </form>
    </Container>
  );
};

AddPlantForm.propTypes = {
  onAddPlant: PropTypes.func.isRequired,
};

export default AddPlantForm;
