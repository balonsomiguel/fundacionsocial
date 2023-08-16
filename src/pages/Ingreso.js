import { useForm } from "react-hook-form";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contextos/ContextoUsuario.js";

function Ingreso() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ingresarUsuario, user, estaAutenticado, errores } = useAuth();
  const navegador = useNavigate();

  //console.log(user)

  useEffect(() => {
    if (estaAutenticado) {
      navegador("/inicio");
    }
  }, [estaAutenticado]);

  const eventoSubmit = async (values) => {
    // const res = await servicioRegistro(values);
    // if (res.codigo === "0") {
    //   estaAutenticado = true;

    // }
    await ingresarUsuario(values);
  };

  return (
    <div className="'targeta-registro-ingreso">
      <div className="imagen-registro-ingreso">
        <img
          src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
          alt="IMG"
        />
      </div>
      <div className="form-registro-ingreso validate-form">
        <div className="form-body">
          <div className="row">
            <div className="form-holder">
              <div className="form-content">
                <div className="form-items">
                  <div className="d-flex justify-content-center">
                    <h3 className="align">Ingresar</h3>
                  </div>
                  <form
                    className="requires-validation"
                    onSubmit={handleSubmit(eventoSubmit)}
                  >
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="correo"
                        {...register("correo", { required: true })}
                        placeholder="Correo Electrónico"
                      />
                      {errors.correo && (
                        <p className="text-warning">Correo requerido</p>
                      )}
                    </div>
                    <br />
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="password"
                        {...register("clave", { required: true })}
                        placeholder="Clave"
                      />
                      {errors.clave && (
                        <p className="text-warning">Clave requerida</p>
                      )}
                    </div>
                    <div className="form-button mt-3">
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                      </div>
                      {errores.map((error, i) => (
                        <div className="text-warning" key={i}>
                          {error}
                        </div>
                      ))}

                      <p className="flex gap-x-2 justify-between">
                        ¿No posee una cuenta?{" "}
                        <Link to="/registro" className="text-white">
                          Registrarse
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Ingreso;
