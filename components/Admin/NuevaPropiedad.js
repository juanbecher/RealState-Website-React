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
// import SortableImage from "../SortableImages";
// import { ReactSortable } from "react-sortablejs";
import SortImage from '../SortImage';

const Contenedor = styled.div`
  max-width: 70%;
  padding: 1rem 2rem;
  margin: 0 auto;
  h2 {
    color: #a63f5a;
    text-transform: uppercase;
    /* text-align: center; */
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

  input[type="file"] {
    /* display: none; */
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
  #ubicacion {
    /* max-width: calc(50% - 3rem); */
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
  // console.log(file);
  // console.log(file.indexOf);

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
  // console.log(valores);

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
    // .then(() =>
    // NotificationManager.success('Propiedad creada'));
    return router
      .push("/admin")
      .then(() => NotificationManager.success("Propiedad creada"));
  }

  // const handleUploadStart = () => {
  //   guardarProgreso(0);
  //   guardarSubiendo(true);

  // };

  // const handleProgress = (progreso) => guardarProgreso({ progreso });

  // const handleUploadError = (error) => {
  //   guardarSubiendo(error);
  //   console.error(error);
  // };

  // function handleUploadSuccess(){
  //   guardarProgreso(100);
  //   guardarSubiendo(false);
  //   // guardarNombre([...nombreimagen, nombre]);
  //   // console.log("Nombre a buscar");
  //   // console.log(nombre);
  //   // const downURL = await firebase.storage
  //   //   .ref("propiedades")
  //   //   .child(nombre)
  //   //   .getDownloadURL();

  //   //   console.log({downURL});
  //   // guardarUrlImagen([...urlimagen, {downURL}]);
  //   // cargaURL(downURL);

  //     // .then((url) => {
  //     //     console.log({url});
  //     //   guardarUrlImagen([...urlimagen, {url}]);
  //     //   // console.log(urlimagen)
  //     // });
  //     // e.preventDefault();
  //   const fotosURL = [];
  //   for (let i = 0; i < file.length; i++) {
  //     const uploadTask = firebase.storage.ref(`/propiedades/${file[i].name}`).put(file[i]);
  //     uploadTask.on("state_changed", console.log, console.error, () => {

  //         firebase.storage
  //         .ref("propiedades")
  //         .child(file[i].name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           fotosURL.push(url)
  //           // setURL(url);
  //         });

  //     });
  //   }
  //   // console.log(fotosURL)
  //   setURL(fotosURL)
  //   setFile(null);
  //   return(fotosURL)
  //   console.log("Imagen cargads")
  // };
  ////

  // console.log(file);

  // console.log(urlimagen);
  function handleChange2(e) {
    // console.log(e.target.files)
    // setFile(e.target.files[0]);
    const fotos = [];
    const preview = [];
    for (let i = 0; i < e.target.files.length; i++) {
      var nombre = `${Math.floor(Math.random() * 1000000)}_${
        e.target.files[i].name
      }`;
      e.target.files[i].nombre = nombre;
      // console.log(e.target.files[i]);
      fotos.push(e.target.files[i]);
      preview.push({nombre: nombre,preview: URL.createObjectURL(e.target.files[i])})
    }
    setFile(fotos);
    setPreview_fotos(preview);
    // setFileBack(fotos);
  }

  const sorter = (a, b) => {
    // myArray.map(function(e) { return e.hello; }).indexOf('stevie');
    return (
      preview_fotos.map((e) => e.nombre).indexOf(a.nombre) -
      preview_fotos.map((e) => e.nombre).indexOf(b.nombre)
    );
  };

  function handleUpload(e) {
    e.preventDefault();
    // console.log(file)
    // console.log(file[1].name)
    if (file.length == 0) {
      return NotificationManager.error("Debe seleccionar una imagen.");
    }else{
      const fotosURL = [];
      const fotosNombre = [];
      for (let i = 0; i < file.length; i++) {
        // console.log(file[i].nombre);
  
        // const file_subir = file_backup.filter(
        //   (imagen) => imagen.nombre == file[i].nombre
        // );
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
              // fotosURL.push(url);
              fotosNombre.push(file[i].nombre);
              // setURL(url);
            }).then();
        });
      }
      // console.log(fotosURL);
      setURL(fotosURL);
      // console.log(fotosURL);
      setNombreImagen(fotosNombre);
      guardarImagenCargada(true);
    }
    
    
    
    // setFile(null);
    

    // const uploadTask = firebase.storage.ref(`/propiedades/${file[i].name}`).put(file[i]);
    // uploadTask.on("state_changed", console.log, console.error, () => {

    //     firebase.storage
    //     .ref("propiedades")
    //     .child(file.name)
    //     .getDownloadURL()
    //     .then((url) => {
    //       setFile(null);
    //       setURL(url);
    //     });

    // });
  }

  useEffect(() => {
    // const tipos = new Array("casa","casa-quinta","departamento")
    if (tipo == "Casa" || tipo == "Quinta" || tipo == "Departamento") {
      // console.log("entro");
      $("#ambiente").prop("disabled", false);
      $("#banio").prop("disabled", false);
    } else {
      // console.log("no entro");
      $("#ambiente").prop("disabled", true);
      $("#banio").prop("disabled", true);
    }
    if (propiedad == "Emprendimiento") {
      $("#tipo").prop("disabled", true);
    } else {
      $("#tipo").prop("disabled", false);
    }
  }, [valores]);
  /////
  // console.log(urlimagen_2);
  // console.log(file);
  // console.log(nombreimagen);
  // const preView = () => {
  //   console.log("preview");
  //   console.log(URL.createObjectURL(file[0]))
    
  // }

  return (
    <Contenedor>
      <h2>Crear nueva propiedad</h2>
      {/* Imagenes */}
      <div
        css={css`
          margin: 2rem 0;
          label {
            /* flex: 0 0 150px; */
            font-size: 1rem;
            /* margin: 5px 0; */
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
        {/* {imagenCargada && <SortImage url={urlimagen_2} seturl={setURL}/>} */}

        {imagenCargada && <p>Imagenes cargadas con exito.</p>}
        <SortImage url={preview_fotos} seturl={setPreview_fotos}/>
        {/* {preview_fotos.map(e => (
      <img key={e} src={e}></img>
    ))} */}
        

        
        {/* <img src={url} alt="" /> */}
      </div>

      <form onSubmit={handleSubmit} noValidate>
         {/* URL video*/}
         <Campo>
         <label htmlFor="video">Dirección URL video</label>
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
              // value={propiedad}
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
              // value={tipo}
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              {/* <option hidden selected>
                Tipo de propiedad
              </option> */}
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
            <label htmlFor="banio">Tipo de operación</label>
            <select
              name="operacion"
              id="operacion"
              // value={operacion}
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              {/* <option hidden selected>
                Tipo de operación
              </option> */}
              <option value="DEFAULT" disabled>
                Tipo de operación
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
            <label htmlFor="banio">Baños</label>
            <input
              type="text"
              id="banio"
              placeholder="Cantidad de baños"
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
            {/* {errores.precio && <Error>{errores.precio}</Error>} */}
          </Campo>
          {/* UBICACION */}
          <Campo>
            <label htmlFor="banio">Ubicación</label>

            {/* <input
              type="text"
              id="ubicacion"
              placeholder="Ubicación"
              name="ubicacion"
              value={ubicacion}
              onChange={handleChange}
            /> */}
            <InputAdress
              setCoordinates={setCoordinates}
              setUbicacion={setUbicacion}
            />
            {/* {errores.ubicacion && <Error>{errores.ubicacion}</Error>} */}
          </Campo>

          <Campo>
            <label htmlFor="banio">Destacada</label>
            <select
              name="destacado"
              id="destacado"
              // value={destacado}
              onChange={handleChange}
              className="hijo"
              defaultValue={"DEFAULT"}
            >
              {/* <option hidden selected>
                Propiedad destacada
              </option> */}
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

        {/* </fieldset> */}
        {/* {errores.email && <Error>{errores.password}</Error> } */}

        {/* IMGENES */}
        {/* <Campo> */}
        {/* <div
            css={css`
              border-radius: 5px;
              display: flex;
              border: 1px solid #c3c3c3;
              width: 60%;
              height: 150px;
              margin: 1rem auto;
              input{
                display:none;
              }
            `}
          >
        
          </div> */}
        {/* </Campo> */}

        {error && <Error>{error} </Error>}

        {/* CREAR PROPIEDAD */}
        <div
          css={css`
            display: flex;
            flex-direction: row-reverse;
            /* margin-top:3rem; */
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
