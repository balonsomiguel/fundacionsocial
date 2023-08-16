import { useForm } from "react-hook-form";
import "../App.css";
import { useNavigate, Link} from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contextos/ContextoUsuario.js"

function Registro() {
  const { register, handleSubmit, formState:{ errors }} = useForm();
  const { registrarUsuario , user, estaAutenticado, errores} = useAuth();
  const navegador = useNavigate();

  console.log(user)

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
    await registrarUsuario(values);
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
                  <h3 className="">Registrarse</h3>
                  <form className="requires-validation" onSubmit={handleSubmit(eventoSubmit)}>
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nombre Usuario"
                        {...register("nombre", { required: true })}
                      />
                      {
                        errors.nombre && (<p className="text-warning">Usuario requerido</p>)
                      }
                    </div>
                    <br />
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="correo"
                        {...register("correo", { required: true })}
                        placeholder="E-mail Address"
                      />
                      {
                        errors.correo && (<p className="text-warning">Correo requerido</p>)
                      }
                    </div>
                    <br />
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="password"
                        {...register("clave", { required: true })}
                        placeholder="Password"
                      />
                      {
                        errors.clave && (<p className="text-warning">Clave requerida</p>)
                      }
                    </div>
                    <div className="form-button mt-3">
                      <button type="submit" className="btn btn-primary">
                        Registrar
                      </button>
                      {
                        errores.map((error,i)=> (
                          <div className="text-warning" key={i}>
                            {error}
                          </div>
                        ))
                      }

                      <p className="flex gap-x-2 justify-between">
                        Ya tengo una cuenta <Link to="/ingreso" className="text-sky-500">Ingresar</Link>
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
export default Registro;

{
  /* <form
                    onSubmit={handleSubmit((values) => {
                      console.log(values.correo);
                    })}
                  ></form> */
}

{
  /* <input type="text" {...register("nombreusuario", { required: true })} />
            <input type="email" {...register("correo", { required: true })} />
            <input type="password" {...register("clave", { required: true })} />
            <button type="submit" className="btn btn-primary">Registrar</button> */
}
