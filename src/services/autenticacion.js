import axios from "axios";

const axiosI = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const servicioRegistro = async (usuario) => axiosI.post(`/registrar`,usuario);

export const servicioIngreso = async (usuario) => axiosI.post(`/ingresar`,usuario);

export const servicioToken = async (token) => axiosI.post(`/verificarsesion`,token);

export const servicioListarUsuario = async () => axiosI.get(`/usuarios/listar`);

export const servicioBuscarUsuario = async (nombre) => axiosI.get(`/usuarios/buscar/${nombre}`);

export const servicioBorrarUsuario= async (idUsuario) => axiosI.delete(`/usuarios/eliminar/${idUsuario}`);