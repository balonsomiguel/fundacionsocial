import { useAuth } from "./contextos/ContextoUsuario";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function RutasProtegidas(){
    const { estaAutenticado, cargando } = useAuth();

    if(cargando){
        // return <Navigate to="/cargando" replace />
        return <h1>Cargando...</h1>;
    }
    if(!estaAutenticado){
        return <Navigate to="/ingreso" replace />;
    }
    
    return <Outlet />;
}
export default RutasProtegidas;