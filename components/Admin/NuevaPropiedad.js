import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";

import Router, { useRouter } from "next/router";
import { Formulario, Error } from "../Layout/Formulario";
import firebase, { FirebaseContext } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import $ from "jquery";
import useValidacion from "../../hooks/useValidacion";
import validarNuevaPropiedad from "../../validacion/validarNuevaPropiedad";
import InputAdress from "../InputAdress";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import { css } from "@emotion/react";
import SortImage from '../SortImage';

const Contenedor = styled.div`
  max-width: 70%;
  padding: 1rem 2rem;
  margin: 0 auto;
  h2 {
    color: #a63f5a;
    text-transform: uppercase;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #d6d6d6;
  }
  .checkbox {
    label {
      font-size: 14px;
    }
    input {
      margin: 0;
      padding: 0;
    }
  }

  #descripcion {
    height: 150px;
    flex: 1;
    margin: 1rem 0;
    width: 100%;
  }

  #imagen {
    border-radius: 5px;
    width: 500px !important;
    padding: 0.8rem;
  }
  #imagen {
    margin: 2rem 0 0 0;
  }

  .custom-file-upload {
    text-align: center;
    border-radius: 5px;
    margin: auto auto;
    min-width: 350px;
    box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 10%);
    display: inline-block;
    padding: 17px 12px;
    cursor: pointer;
    background-color: white;
    color: black;
    transition-duration: 0.3s;
    :hover {
      transform: scale(1.05);
    }
  }
  fieldset {
    border-radius: 5px;
    border: 1px solid #c3c3c3;
    margin: 2rem 0;
  }
  legend {
    flex: 0 0 150px;
    font-size: 1rem;
    font-weight: 600;
  }
`;
const ContenedorServicios = styled.fieldset`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .cont-checkbox {
    margin: 1.5rem 0;
    flex-basis: calc(25% - 2rem);
  }
`;

const Campo = styled.div`
  flex-basis: calc(50% - 3rem);
  margin-bottom: 2rem;
  display: grid;
  align-items: center;
  label {
    flex: 0 0 150px;
    font-size: 1rem;
    margin: 5px 0;
    font-weight: 600;
  }
  input,
  textarea,
  select {
    border: none;
    border-radius: 5px;
    flex: 1;
    padding: 0.8rem;
  }
  textarea {
    height: 400px;
  }
`;

const InputSubmit = styled.input`
  margin: 2rem auto;
  background-color: #a63f5a;
  width: 350px;
  padding: 1rem;
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  text-transform: uppercase;
  border: none;
  border-radius: 10px;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  &:hover {
    background-color: #a22445;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const STATE_INICIAL = {
  propiedad: "",
  tipo: "",
  ambiente: "",
  banio: "",
  operacion: "",
  ubicacion: "",
  descripcion: "",
  urlimagen: "",
  m2: "",
  precio: "",
  destacado: "",
  moneda: "",
  video: ""
};

const NuevaPropiedad = () => {
  const [error, guardarError] = useState(false);
  const [imagenCargada, guardarImagenCargada] = useState(false);
  const [file, setFile] = useState([]);
  const [file_backup, setFileBack] = useState([]);
  const [preview_fotos, setPreview_fotos] = useState([]);
  console.log(preview_fotos);
  const [urlimagen_2, setURL] = useState([]);
  const [nombreimagen, setNombreImagen] = useState([]);
  const [ubicacion, setUbicacion] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarNuevaPropiedad,
    crearPropiedad
  );

  const {
    propiedad,
    tipo,
    ambiente,
    banio,
    operacion,
    descripcion,
    imagen,
    m2,
    precio,
    destacado,
    moneda,
    video
  } = valores;

  // Context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  // hook de routing para redireccionar
  const router = useRouter();

  async function crearPropiedad() {
    if (!imagenCargada) {
      return NotificationManager.error("Debe subir alguna imagen.");
    }
    console.log("Creando propiedad");
    // valida si hay usuario pero en este caso no es necesrio
    const visible = "si";
    // crea el objeto de nueva propiedad
    urlimagen_2.sort(sorter);

    const urlimagen = urlimagen_2.map((e) => e.url);

    const detallePropiedad = {
      propiedad,
      tipo,
      ambiente,
      banio,
      operacion,
      ubicacion,
      coordinates,
      descripcion,
      urlimagen,
      nombreimagen,
      m2,
      precio,
      destacado,
      visible,
      moneda,
      video,
      creado: Date.now(),
    };

    // insertando en DB
    console.log(detallePropiedad);
    firebase.db.collection("propiedades").add(detallePropiedad);
    return router
      .push("/admin")
      .then(() => NotificationManager.success("Propiedad creada"));
  }
  function handleChange2(e) {
    const fotos = [];
    const preview = [];
    for (let i = 0; i < e.target.files.length; i++) {
      var nombre = `${Math.floor(Math.random() * 1000000)}_${
        e.target.files[i].name
      }`;
      e.target.files[i].nombre = nombre;
      fotos.push(e.target.files[i]);
      preview.push({nombre: nombre,preview: URL.createObjectURL(e.target.files[i])})
    }
    setFile(fotos);
    setPreview_fotos(preview);
  }

  const sorter = (a, b) => {
    return (
      preview_fotos.map((e) => e.nombre).indexOf(a.nombre) -
      preview_fotos.map((e) => e.nombre).indexOf(b.nombre)
    );
  };

  function handleUpload(e) {
    e.preventDefault();
    if (file.length == 0) {
      return NotificationManager.error("Debe seleccionar una imagen.");
    }else{
      const fotosURL = [];
      const fotosNombre = [];
      for (let i = 0; i < file.length; i++) {
        const uploadTask = firebase.storage
          .ref(`/propiedades/${file[i].nombre}`)
          .put(file[i]);
        uploadTask.on("state_changed", console.log, console.error, () => {
          firebase.storage
            .ref("propiedades")
            .child(file[i].nombre)
            .getDownloadURL()
            .then((url) => {
              console.log(file[i].nombre);
              fotosURL.push({ nombre: file[i].nombre, url: url  });
              fotosNombre.push(file[i].nombre);
            }).then();
        });
      }
      setURL(fotosURL);
      setNombreImagen(fotosNombre);
      guardarImagenCargada(true);
    }
    
    
    
  }

  useEffect(() => {
    if (tipo == "Casa" || tipo == "Quinta" || tipo == "Departamento") {
      $("#ambiente").prop("disabled", false);
      $("#banio").prop("disabled", false);
    } else {
      $("#ambiente").prop("disabled", true);
      $("#banio").prop("disabled", true);
    }
    if (propiedad == "Emprendimiento") {
      $("#tipo").prop("disabled", true);
    } else {
      $("#tipo").prop("disabled", false);
    }
  }, [valores]);

  return (
    <Contenedor>
      <h2>Crear nueva propiedad</h2>
      {/* Imagenes */}
      <div
        css={css`
          margin: 2rem 0;
          label {
            font-size: 1rem;
            font-weight: 600;
          }
          input {
            margin: 1rem 1rem 0 0;
            padding: 5px;
          }
          p {
            color: green;
          }
        `}
      >
        <label>Imagenes</label>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange2} multiple />
          <input type="submit" value="Subir"></input>
        </form>

        {imagenCargada && <p>Imagenes cargadas con exito.</p>}
        <SortImage url={preview_fotos} seturl={setPreview_fotos}/>
      </div>

      <form onSubmit={handleSubmit} noValidate>
         {/* URL video*/}
         <Campo>
         <label htmlFor="video">Direcci??n URL video</label>
            <input
              type="text"
              id="video"
              placeholder="URL"
              name="video"
              value={video}
              onChange={handleChange}
            />
          </Campo>
        {/* CARCTERISTICAS */}
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          `}
        >
          {/* TIPO Inmueble o empren */}
          <Campo>
            <label htmlFor="propiedad">Propiedad</label>
            <select
              name="propiedad"
              id="propiedad"
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Propiedad
              </option>
              <option value="Inmueble">Inmueble</option>

              <option value="Emprendimiento">Emprendimiento</option>
            </select>
            {errores.propiedad && <Error>{errores.propiedad}</Error>}
          </Campo>
          {/* TIPO PROPIEDADA */}
          <Campo>
            <label htmlFor="tipo">Tipo de propiedad</label>
            <select
              name="tipo"
              id="tipo"
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Tipo de propiedad
              </option>
              <option value="Casa">Casa</option>
              <option value="Quinta">Casa quinta</option>
              <option value="Campo">Campo</option>
              <option value="Departamento">Departamento</option>
              <option value="Local">Local comercial</option>
              <option value="Terreno">Terreno</option>
            </select>
            {errores.tipo && <Error>{errores.tipo}</Error>}
          </Campo>
          {/* TIPO DE OPERACION */}
          <Campo>
            <label htmlFor="banio">Tipo de operaci??n</label>
            <select
              name="operacion"
              id="operacion"
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Tipo de operaci??n
              </option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
            {errores.operacion && <Error>{errores.operacion}</Error>}
          </Campo>
          {/* AMBIENTES */}
          <Campo>
            <label htmlFor="banio">Ambientes</label>
            <input
              type="text"
              id="ambiente"
              placeholder="Cantidad de ambientes"
              name="ambiente"
              value={ambiente}
              onChange={handleChange}
            />
            {errores.ambiente && <Error>{errores.ambiente}</Error>}
          </Campo>
          {/* BANIOS */}
          <Campo>
            <label htmlFor="banio">Ba??os</label>
            <input
              type="text"
              id="banio"
              placeholder="Cantidad de ba??os"
              name="banio"
              value={banio}
              onChange={handleChange}
            />
            {errores.banio && <Error>{errores.banio}</Error>}
          </Campo>
          {/* M2 */}
          <Campo>
            <label htmlFor="m2">M2</label>
            <input
              type="text"
              id="m2"
              placeholder="Metros cuadrados"
              name="m2"
              value={m2}
              onChange={handleChange}
            />
            {errores.m2 && <Error>{errores.m2}</Error>}
          </Campo>
          {/* Moneda */}
          <Campo>
            <label htmlFor="moneda">Moneda</label>
            <select
              name="moneda"
              id="moneda"
              // value={operacion}
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Moneda
              </option>
              <option value="peso">Pesos ($)</option>
              <option value="dolar">Dolares (USD)</option>
            </select>
            {errores.moneda && <Error>{errores.moneda}</Error>}
          </Campo>
          {/* PRECIO */}
          <Campo>
            <label htmlFor="banio">Precio</label>
            <input
              type="text"
              id="precio"
              placeholder="Precio"
              name="precio"
              value={precio}
              onChange={handleChange}
            />
          </Campo>
          {/* UBICACION */}
          <Campo>
            <label htmlFor="banio">Ubicaci??n</label>

            <InputAdress
              setCoordinates={setCoordinates}
              setUbicacion={setUbicacion}
            />
          </Campo>

          <Campo>
            <label htmlFor="banio">Destacada</label>
            <select
              name="destacado"
              id="destacado"
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Propiedad destacada
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            {errores.destacado && <Error>{errores.destacado}</Error>}
          </Campo>
        </div>

        {/* DESCRIPCION */}

        {/* <fieldset> */}
        <legend>Descripcion</legend>
        {/* <label htmlFor="password">Descripcion</label> */}
        <textarea
          id="descripcion"
          name="descripcion"
          value={descripcion}
          onChange={handleChange}
        />
        {errores.descripcion && <Error>{errores.descripcion}</Error>}


        {error && <Error>{error} </Error>}

        {/* CREAR PROPIEDAD */}
        <div
          css={css`
            display: flex;
            flex-direction: row-reverse;
          `}
        >
          <InputSubmit type="submit" value="Crear Propiedad" />
        </div>
      </form>
      <NotificationContainer />
    </Contenedor>
  );
};

export default NuevaPropiedad;
