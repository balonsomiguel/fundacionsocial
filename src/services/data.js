import axios from "axios";

const axiosI = axios.create({
  baseURL: "http://localhost:3000/api/data",
  withCredentials: true,
});

export const servicioAlmacenarData = async (data) => axiosI.post(`/almacenardata`,data);
