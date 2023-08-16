import { createContext, useState, useContext, useEffect } from "react";
import {
  servicioRegistro,
  servicioIngreso,
  servicioToken,
  servicioListarUsuario,
  servicioBuscarUsuario,
  servicioBorrarUsuario,
} from "../services/autenticacion.js";
import Cookies from "universal-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("No hay contexto de usuario");
  }
  return contexto;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const registrarUsuario = async (usuario) => {
    try {
      const respuesta = await servicioRegistro(usuario);
      if (respuesta.status === 200) {
        setUser(respuesta.data);
        setEstaAutenticado(true);
      }
    } catch (error) {
      setErrores(error.response.data);
    }
  };

  const ingresarUsuario = async (usuario) => {
    try {
      const respuesta = await servicioIngreso(usuario);
      if (respuesta.status === 200) {
        setUser(respuesta.data);
        setEstaAutenticado(true);
      }
    } catch (error) {
      setErrores(error.response.data);
    }
  };

  const listarUsuarios = async () => {
    try {
      const respuesta = await servicioListarUsuario();
      if (respuesta.status === 200) {
        setUsuarios(respuesta.data);
      }
    } catch (error) {
      setErrores(error.response.data);
    }
  };

  const buscarUsuario = async (nombreUsuario) => {
    try {
      const { nombre } = nombreUsuario;
      const respuesta = await servicioBuscarUsuario(nombre);
      if (respuesta.status === 200) {
        setUsuarios(respuesta.data);
      }
    } catch (error) {
      setErrores(error.response.data);
    }
  };

  const borrarUsuario = async (idUsuario) => {
    try {
      const respuesta = await servicioBorrarUsuario(idUsuario);
      if (respuesta.status === 204) {
        listarUsuarios();
      }
    } catch (error) {
      setErrores(error.response.data);
    }
  };

  const borrarCookie = async () => {
    try {
      const cookies = new Cookies();
      if (cookies.get("token")) {
        cookies.remove("token");
        setCargando(false);
      }
    } catch (error) {
      setErrores(error.response.data);
    }
  };


  useEffect(() => {
    const cookies = new Cookies();
    async function isAutenticado() {
      console.log(cookies.get("token"));
      if (cookies.get("token")) {
        try {
          const respuesta = await servicioToken({
            tokenAcceso: cookies.get("token"),
          });
          if (respuesta.status === 200) {
            console.log(respuesta);
            setUser(respuesta.data);
            setEstaAutenticado(true);
            setCargando(false);
          }
        } catch (error) {
          setErrores(error.response.data);
          setEstaAutenticado(false);
          setCargando(false);
        }
      } else {
        setEstaAutenticado(false);
        setCargando(false);
      }
    }
    isAutenticado();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registrarUsuario,
        ingresarUsuario,
        listarUsuarios,
        buscarUsuario,
        borrarUsuario,
        setEstaAutenticado,
        borrarCookie,
        user,
        estaAutenticado,
        errores,
        cargando,
        usuarios,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
