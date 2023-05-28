
//##########################################################
//              CONFIGURACION DEL FRONT-END
//##########################################################
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import "bootswatch/dist/darkly/bootstrap.min.css"; // Added this :boom:

import Swal from "sweetalert2";


function App() {

  //##########################################################
  //                      USE STATE
  //##########################################################
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleadosList] = useState([]);

  //##########################################################
  //                    USE EFFECT
  //##########################################################
  // Se ejecuta una sola vez despues de haberse renderizado la pagina y activa la lista de datos.
  useEffect(() => {
    read();              //Ejecutamos la funcion read() que va a listar los usuarios
    limpiarCampos();     // limpiamos los campos para borrar esos molestos ceros
  }, [])

  //##########################################################
  //                  CRUD DEL FRONT-END
  //##########################################################

  //##########################################################
  //                       READ
  //##########################################################

  const read = () => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setEmpleadosList(response.data);
    });
  };

  //##########################################################
  //                        CREATE
  //##########################################################
  const create = () => {
    Axios.post("http://localhost:3001/create", {
      nombre,
      edad,
      pais,
      cargo,
      anios,
    }).then(() => {

      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue registrado con exito</i>`,
        icon: 'success',
        timer: 5000
      })

      limpiarCampos();
      read();
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró Crear el elmpleado!',
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Problemas de conexión, por favor Intente más tarde" : JSON.parse(JSON.stringify(error)).message,

      })
    })

  };

  //##########################################################
  //                        UPDATE 
  //##########################################################
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id,
      nombre,
      edad,
      pais,
      cargo,
      anios,
    }).then(() => {
      read();
      limpiarCampos();

      Swal.fire({
        title: "<strong>Actualización exitoso!!!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue actualizado con exito!!</i>`,
        icon: 'success',
        timer: 5000
      })

    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró actualizar el elmpleado!',
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Problemas de conexión, por favor Intente más tarde" : JSON.parse(JSON.stringify(error)).message,

      })
    })

  };



  const editarEmpleado = (val) => {
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);

    setEditar(true);

  };

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");

    setEditar(false);
  }


  //##########################################################
  //                  DELETE
  //##########################################################

  const borrarEmpleado = (id, nombre) => {

    Swal.fire({
      title: `Confirma la Eliminación de datos`,
      html: `<i>Realmente deseas eliminar a  <strong>${nombre}</strong> ?</i>`,
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/delete/${id}`, {
          data: { nombre } // Pass the parameters in the request body

        }).then(() => {


          Swal.fire({
            title: "<strong>Registro Borrado!</strong>",
            html: `<i><strong>${nombre}</strong> fué borrado con éxito!!</i>`,
            icon: 'success',
            timer: 5000
          })

          read();
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el elmpleado!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Problemas de conexión, por favor Intente más tarde" : JSON.parse(JSON.stringify(error)).message,

          })
        })

      }
    })


  };


  //##########################################################
  //            AQUI COMIENZA EL FRONT-END
  //##########################################################
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE EMPLEADOS</div>

        <div className="card-body">
          <div className="datos">
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Nombre:
              </span>
              <input
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Ingresa un nombre"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={nombre}
              />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Edad:
              </span>
              <input
                onChange={(event) => {
                  setEdad(event.target.value);
                }}
                type="number"
                className="form-control"
                placeholder="Ingresa la edad"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={edad}
              />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Pais:
              </span>
              <input
                onChange={(event) => {
                  setPais(event.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Ingresa el pais"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={pais}
              />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Cargo:
              </span>
              <input
                onChange={(event) => {
                  setCargo(event.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Ingresa el Cargo"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={cargo}
              />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Años:
              </span>
              <input
                onChange={(event) => {
                  setAnios(event.target.value);
                }}
                type="number"
                className="form-control"
                placeholder="Ingresa los años de experiencia"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={anios}
              />
            </div>
            {
              editar == true ?
                <div className="grupo">
                  <button onClick={update} className="btn btn-warning">Actualizar</button>
                  <button onClick={limpiarCampos} className="btn btn-info">Cancelar</button>
                </div>
                : <button onClick={create} className="btn btn-success">Registrar</button>
            }

          </div>
        </div>
        <div className="card-footer text-body-primary">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>
                <th scope="col">Cargo</th>
                <th scope="col">Experiencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* where is the error? */}
              {empleadosList.map((val) => {
                return (
                  <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.anios}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <button
                          onClick={() => {
                            editarEmpleado(val);
                          }}
                          type="button"
                          className="btn btn-success btn-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            borrarEmpleado(val.id, val.nombre);
                          }}
                          type="button" className="btn btn-danger btn-sm">
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
