import axios from "axios";

const axiosI = axios.create({
  baseURL: "http://localhost:3000/api/tareas",
  withCredentials: true,
});

export const servicioCrearTarea = async (tarea) => axiosI.post(`/creartarea`,tarea);

export const servicioListarTarea = async (idUsuario) => axiosI.get(`/listartarea/${idUsuario}`);

export const servicioBorrarTarea = async (idTarea) => axiosI.delete(`/borrartarea/${idTarea}`);

export const servicioTerminarTarea = async (idTarea) => axiosI.post(`/terminartarea`, idTarea);

export const servicioTraerTarea = async () => axiosI.get(`/tarea`);
