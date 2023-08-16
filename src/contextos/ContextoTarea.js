import { createContext, useContext, useState } from "react";
import {
  servicioCrearTarea,
  servicioListarTarea,
  servicioTraerTarea,
  servicioBorrarTarea,
  servicioTerminarTarea,
} from "../services/tareas.js";

export const TaskContext = createContext();

export const useTask = () => {
  const contexto = useContext(TaskContext);

  if (!contexto) {
    throw new Error("No hay contexto de tarea");
  }
  return contexto;
};

export const TaskProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);

  const crearTarea = async (tarea, usuario) => {
    try {
      const objTarea = { tarea, usuario };
      const respuesta = await servicioCrearTarea(objTarea);
      if (respuesta.status === 200) {
        listarTareas(usuario.id);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const listarTareas = async (idUsuario) => {
    try {
      const listaTareas = await servicioListarTarea(idUsuario);
      if (listaTareas.status === 200) {
        setTareas(listaTareas.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const borrarTarea = async (idTarea) => {
    try {
      const listaTareas = await servicioBorrarTarea(idTarea);
      if (listaTareas.status === 200) {
        setTareas(listaTareas.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const terminarTarea = async (idTarea) => {
    try {
      const listaTareas = await servicioTerminarTarea({tareaId: idTarea});
      if (listaTareas.status === 200) {
        console.log(listaTareas.data)
        setTareas(listaTareas.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tareas,
        crearTarea,
        listarTareas,
        borrarTarea,
        terminarTarea,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
