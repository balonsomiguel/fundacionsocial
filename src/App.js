import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ingreso from "./pages/Ingreso";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Usuarios from "./pages/Usuarios";
import Tareas from "./pages/Tareas";
import Salir from "./pages/Salir";
import { AuthProvider } from "./contextos/ContextoUsuario";
import { TaskProvider } from "./contextos/ContextoTarea";
import RutasProtegidas from "./RutasProtegidas";
import { DataProvider } from "./contextos/ContextoData";

function App() {
  return (
    <div className="Container-App">
      <AuthProvider>
        <TaskProvider>
          <DataProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/*" element={<Ingreso />} />
                  <Route path="/ingreso" element={<Ingreso />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route element={<RutasProtegidas />}>
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/tareas" element={<Tareas />} />
                    <Route path="/salir" element={<Salir />} />
                  </Route>
                </Routes>
              </BrowserRouter>
          </DataProvider>
        </TaskProvider>
      </AuthProvider>
    </div>
  );
}

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>

export default App;
