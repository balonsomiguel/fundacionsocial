import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
  } from "mdb-react-ui-kit";

  import NavbarApp from "./NavbarApp";

  import { useData } from "../contextos/ContextoData.js";

function Inicio() {

    const { data, setData, cargarDataServidor } = useData();


    const cargarArchivo = (e) => {
        console.log(e.target.files);
        setData(e.target.files);
        //await borrarTarea(idTarea);
      };

    const subirData = async () =>{
        const formulario = new FormData();

         for(let i = 0;i<data.length;i++){
            formulario.append("archivo", data[i]);
         }

         await cargarDataServidor(formulario);
    }
    

    return (
    <div>
      <NavbarApp />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">Archivos</h4>
                  <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <MDBCol size="12">
                      <MDBInput
                        type="file"
                        name="archivo"
                        placeholder="Cargar Archivo"
                        multiple
                        onChange={(e) => cargarArchivo(e)}
                      />
                    </MDBCol>
                    <MDBCol size="12">
                      <MDBBtn type="button" onClick={()=>subirData()}>Subir</MDBBtn>
                    </MDBCol>
                  </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Inicio;
