import { useForm } from "react-hook-form";
import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useTask } from "../contextos/ContextoTarea";
import { useAuth } from "../contextos/ContextoUsuario.js";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarApp from "./NavbarApp";

function Tareas() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const { tareas, crearTarea, listarTareas, borrarTarea, terminarTarea } = useTask();
  const { user, estaAutenticado } = useAuth();
  const navegador = useNavigate();

  useEffect(() => {
    if (estaAutenticado) {
      listarTareas(user.id);
    }
  }, [estaAutenticado]);

  const eventoSubmit = async (values) => {
    console.log(values);
    await crearTarea(values, user);
    console.log(tareas);
  };

  const clkBtnBorrar = async (idTarea) => {
    await borrarTarea(idTarea);
  };

  const clkBtnTerminado = async (idTarea) => {
    console.log(idTarea);
    await terminarTarea(idTarea);
  };

  return (
    <div>
      <NavbarApp />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="auto">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">Tareas</h4>
                <form onSubmit={handleSubmit(eventoSubmit)}>
                  <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <MDBCol size="12">
                      <MDBInput
                        type="text"
                        placeholder="Descripción Tarea"
                        {...register("tarea", { required: true })}
                      />
                    </MDBCol>
                    <MDBCol size="12">
                      <MDBBtn type="submit">Guardar</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                  <MDBTable className="mb-4">
                    <MDBTableHead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acción</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {tareas.map((tarea, index) => (
                        <tr
                          key={tarea._id}
                        >
                          <th scope="row">{index+1}</th>
                          <td>{tarea.nombre}</td>
                          <td>{tarea.estado}</td>
                          <td>
                            <MDBBtn type="button" onClick={()=>clkBtnBorrar(tarea._id)} color="danger">
                              Borrar
                            </MDBBtn>
                            <MDBBtn
                              type="button"
                              onClick={()=>clkBtnTerminado(tarea._id)}
                              color="success"
                              className="ms-1"
                            >
                              Completar
                            </MDBBtn>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Tareas;
