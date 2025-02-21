import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const AddPlantForm = ({ onAddPlant }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [wateringRepeat, setWateringRepeat] = useState("");
  const [mistingRepeat, setMistingRepeat] = useState("");
  const [nextWateringDate, setNextWateringDate] = useState("");
  const [nextMistingDate, setNextMistingDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);
    formData.append("wateringRepeat", wateringRepeat);
    formData.append("mistingRepeat", mistingRepeat);
    formData.append("nextWateringDate", nextWateringDate);
    formData.append("nextMistingDate", nextMistingDate);
    onAddPlant(formData);
    setName("");
    setPhoto(null);
    setWateringRepeat("");
    setMistingRepeat("");
    setNextWateringDate("");
    setNextMistingDate("");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          required
          style={{ margin: "20px 0" }}
        />
        <TextField
          label="Watering Repeat (days)"
          value={wateringRepeat}
          onChange={(e) => {
            setWateringRepeat(e.target.value);
            calculateNextDates(e.target.value, setNextWateringDate);
          }}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Misting Repeat (days)"
          value={mistingRepeat}
          onChange={(e) => {
            setMistingRepeat(e.target.value);
            calculateNextDates(e.target.value, setNextMistingDate);
          }}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Next Watering Date"
          value={nextWateringDate}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Next Misting Date"
          value={nextMistingDate}
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

export default AddPlantForm;
