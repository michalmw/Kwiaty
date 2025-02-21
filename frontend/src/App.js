import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import AddPlantForm from "./components/AddPlantForm";
import PlantList from "./components/PlantList";
import PlantDetails from "./components/PlantDetails";
import EditPlantForm from "./components/EditPlantForm";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("http://localhost:4201/api/plants");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const addPlant = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:4201/api/plants",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPlants([...plants, response.data]);
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Houseplant Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/plants">
            Plant List
          </Button>
          <Button color="inherit" component={Link} to="/new">
            New
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route exact path="/">
            <Dashboard plants={plants} />
          </Route>
          <Route exact path="/plants">
            <PlantList plants={plants} />
          </Route>
          <Route path="/new">
            <AddPlantForm onAddPlant={addPlant} />
          </Route>
          <Route path="/plants/:id">
            <PlantDetails plants={plants} setPlants={setPlants} />
          </Route>
          <Route path="/edit/:id">
            <EditPlantForm plants={plants} setPlants={setPlants} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
