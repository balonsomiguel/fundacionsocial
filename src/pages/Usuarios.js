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
import { useAuth, useTask } from "../contextos/ContextoUsuario.js";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarApp from "./NavbarApp";

function Usuarios() {
  const { register, handleSubmit } = useForm();

  const { estaAutenticado, listarUsuarios, buscarUsuario, borrarUsuario, usuarios } = useAuth();

  useEffect(() => {
    if (estaAutenticado) {
      listarUsuarios();
    }
  }, [estaAutenticado]);

  const eventoSubmit = async (nombre) => {

    console.log(nombre);
    await buscarUsuario(nombre);
  };

  const clkBtnBorrar = async (idUsuario) => {
    await borrarUsuario(idUsuario);
  };

  return (
    <div>
      <NavbarApp />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="auto">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">Usuarios</h4>
                <form onSubmit={handleSubmit(eventoSubmit)}>
                  <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <MDBCol size="12">
                      <MDBInput
                        type="text"
                        placeholder="Nombre Usuario"
                        {...register("nombre", { required: true })}
                      />
                    </MDBCol>
                    <MDBCol size="12">
                      <MDBBtn type="submit">Buscar</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                  <MDBTable className="mb-4">
                    <MDBTableHead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Roles</th>
                        <th scope="col">Acción</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {usuarios.map((usuario, index) => (
                        <tr key={usuario._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.correo}</td>
                          <td>{usuario.roles}</td>
                          <td>
                            <MDBBtn
                              type="button"
                              onClick={() => clkBtnBorrar(usuario._id)}
                              color="danger"
                            >
                              Borrar
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

export default Usuarios;
