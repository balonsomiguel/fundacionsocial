import React from "react";
import { useAuth } from "../contextos/ContextoUsuario.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Salir() {

    const { estaAutenticado, setEstaAutenticado, borrarCookie } = useAuth();
    const navegador = useNavigate();

    useEffect(() => {
        if (estaAutenticado) {
          borrarCookie();
          setEstaAutenticado(false);
          navegador("/ingreso");
        }
      }, [estaAutenticado]);
    
  return (
    <div></div>
  );
}


export default Salir;
