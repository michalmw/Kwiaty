import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import PropTypes from "prop-types";

const PlantDetails = ({ plants, setPlants }) => {
  const { id } = useParams();
  const history = useHistory();
  const plant = plants.find((plant) => plant.id === id);
  const [completedDates, setCompletedDates] = useState(
    plant ? plant.completedDates || {} : {}
  );
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (plant) {
      setCompletedDates(plant.completedDates || {});
    }
  }, [plant]);

  if (!plant) {
    return <Typography>Plant not found</Typography>;
  }

  const calculateNextDates = (startDate, repeat, count) => {
    const dates = [];
    let currentDate = new Date(startDate);
    for (let i = 0; i < count; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + parseInt(repeat));
    }
    return dates;
  };

  const nextWateringDates = calculateNextDates(
    plant.nextWateringDate,
    plant.wateringRepeat,
    3
  );
  const nextMistingDates = calculateNextDates(
    plant.nextMistingDate,
    plant.mistingRepeat,
    3
  );

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4201/api/plants/${id}`);
      setPlants(plants.filter((plant) => plant.id !== id));
      history.push("/");
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const handleCheckboxChange = async (date, type) => {
    const dateString = date.toISOString().split("T")[0];
    const updatedCompletedDates = {
      ...completedDates,
      [dateString]: {
        ...completedDates[dateString],
        [type]: !completedDates[dateString]?.[type],
      },
    };
    setCompletedDates(updatedCompletedDates);

    try {
      await axios.put(`http://localhost:4201/api/plants/${id}/completed`, {
        date: dateString,
        type,
        completed: updatedCompletedDates[dateString][type],
      });

      // Update the plant in the state
      const updatedPlants = plants.map((p) =>
        p.id === id ? { ...p, completedDates: updatedCompletedDates } : p
      );
      setPlants(updatedPlants);
    } catch (error) {
      console.error("Error updating completed status:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4201/api/plants/${id}/history`
      );
      setHistoryData(response.data);
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching plant history:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  return (
    <Container>
      <Card style={{ margin: "30px 0" }}>
        <CardHeader
          title={plant.name}
          subheader={`Added on: ${new Date(
            parseInt(plant.id)
          ).toLocaleDateString()}`}
          action={
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:4201${plant.photo}`}
          alt={plant.name}
        />
        <CardContent>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={fetchHistory}>Show History</MenuItem>
            <MenuItem onClick={handleEdit}>Edit Plant</MenuItem>
            <MenuItem onClick={handleOpenDialog}>Delete Plant</MenuItem>
          </Menu>
          <Typography variant="h6" gutterBottom>
            Next Watering Dates:
          </Typography>
          <List>
            {nextWateringDates.map((date, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={date.toDateString()}
                  style={{ color: isToday(date) ? "red" : "inherit" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        completedDates[date.toISOString().split("T")[0]]
                          ?.watering || false
                      }
                      onChange={() => handleCheckboxChange(date, "watering")}
                      disabled={
                        index > 0 &&
                        !completedDates[
                          nextWateringDates[index - 1]
                            .toISOString()
                            .split("T")[0]
                        ]?.watering
                      }
                    />
                  }
                  label="Completed"
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" gutterBottom>
            Next Misting Dates:
          </Typography>
          <List>
            {nextMistingDates.map((date, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={date.toDateString()}
                  style={{ color: isToday(date) ? "red" : "inherit" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        completedDates[date.toISOString().split("T")[0]]
                          ?.misting || false
                      }
                      onChange={() => handleCheckboxChange(date, "misting")}
                      disabled={
                        index > 0 &&
                        !completedDates[
                          nextMistingDates[index - 1]
                            .toISOString()
                            .split("T")[0]
                        ]?.misting
                      }
                    />
                  }
                  label="Completed"
                />
              </ListItem>
            ))}
          </List>
          {showHistory && historyData && (
            <div>
              <Typography variant="h6" gutterBottom>
                History
              </Typography>
              {Object.keys(historyData)
                .slice(-3)
                .reverse()
                .map((date) => (
                  <div key={date}>
                    <Typography>Date: {date}</Typography>
                    <Typography>
                      Watering:{" "}
                      {historyData[date].watering
                        ? "Completed"
                        : "Not Completed"}
                    </Typography>
                    <Typography>
                      Misting:{" "}
                      {historyData[date].misting
                        ? "Completed"
                        : "Not Completed"}
                    </Typography>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Plant"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this plant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

PlantDetails.propTypes = {
  plants: PropTypes.array.isRequired,
  setPlants: PropTypes.func.isRequired,
};

export default PlantDetails;
