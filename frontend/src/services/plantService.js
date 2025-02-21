import axios from "axios";

const API_URL = "http://localhost:4201/api/plants";

export const getPlants = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPlant = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deletePlant = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateCompletedStatus = async (id, date, type, completed) => {
  await axios.put(`${API_URL}/${id}/completed`, {
    date,
    type,
    completed,
  });
};

export const getPlantHistory = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/history`);
  return response.data;
};

export const updatePlant = async (id, formData) => {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
