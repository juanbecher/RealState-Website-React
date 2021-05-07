import { jsx } from "@emotion/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Mapa from "../components/Propiedades/Mapa2";
import validarEnviarConsulta from "../validacion/validarEnviarConsulta";
import useValidacion from "../hooks/useValidacion";
import $ from "jquery";

const RowUno = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;
const Contenedor = styled.div`
  
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  display: block;
  flex-wrap: wrap;
  .contenido {
    padding: 1rem;
    flex-basis: calc(50%);
  }
  h2 {
    margin: 2rem 0;
    color: var(--rojo);
  }
  h3 {
    margin: 0;
    margin-bottom: 4rem;
  }
  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
  ul {
    margin: 1.5rem 1.5rem;
  }
  li {
    ::marker {
      color: var(--rojo);
    }
    margin: 3rem 0;
  }

  @media (min-width: 768px) {
    display:flex;
    height: 441px;
  }
`;

const Contacto = styled.div`
  /* margin: 0 2rem; */
  padding: 1rem 2rem;
  /* border:1px solid black; */
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  height: 440px;
  /* position: relative; */

  h4 {
    margin: 1rem 0;
  }
`;

const Campo = styled.div`
  input {
    border: 1px solid black;
    margin: 1rem 0;
    border-radius: 5px;
    width: 100%;
    padding: 0.8rem;
  }
  textarea {
    flex: 1;
    height: 80px;
    width: 100%;
  }
`;

const BotonEnviar = styled.input`
  display: block;
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  border: none;
  background-color: var(--rojo);
  color: white;
  border-radius: 10px;
  text-align: center;
  width: 100px;
  margin: 10px auto;
  /* margin-left: 92px; */
  padding: 10px;
  transition-duration: 0.5s;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const ContenedorMapa = styled.div`
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  height: 400px;
  margin: 2rem 0;
  @media (min-width: 768px) {
    position: relative;
  }
`;
const STATE_INICIAL = {
  nombre: "",
  email: "",
  telefono: "",
  descripcion: "",
};
export default function Sucursales() {
  // const [mensaje, setMensaje] = useState({
  //   nombre: "",
  //   email: "",
  //   telefono: "",
  //   descripcion: "",
  // });
  const [sucursal, setSucursal] = useState({
    coordinates: { lat: -36.62201474998877, lng: -64.29388345839136 },
    tipo: "Casa central",
    text: "Casa central",
  });

  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarEnviarConsulta,
    enviarComentario
  );

  const { nombre, email, telefono, descripcion } = valores;

  // cambia border de input al haber error
  useEffect(() => {
    if (errores.nombre) {
      $("#nombre").css("border", "1px solid red");
    } else {
      $("#nombre").css("border", "1px solid black");
    }
    if (errores.email) {
      $("#email").css("border", "1px solid red");
    } else {
      $("#email").css("border", "1px solid black");
    }
    if (errores.telefono) {
      $("#telefono").css("border", "1px solid red");
    } else {
      $("#telefono").css("border", "1px solid black");
    }
    if (errores.descripcion) {
      $("#descripcion").css("border", "1px solid red");
    } else {
      $("#descripcion").css("border", "1px solid black");
    }
  }, [errores]);

  function enviarComentario(e) {
    e.preventDefault();

    Email.send({
      // Host : "smtp.mailtrap.io",
      // Username : "<Mailtrap username>",
      // Password : "<Mailtrap password>",
      SecureToken: "9614001f-601e-48e8-a34d-973c79399942",
      To: "juanbecher1895@gmail.com",
      From: "joshblue731@gmail.com",
      Subject: `Consulta general`,
      Body: `
      <h3>Ha recibido una nueva consulta.</h3><br/><br/>

      <strong>Nombre y apellido:  </strong>${nombre} <br/>
      <strong>Email: </strong> ${email} <br/>
      <strong>Teléfono: </strong> ${telefono} <br/>
      <strong>Comentario: </strong> ${descripcion} <br/>
      `,
      // Body : `<html>
      //   <div><p>Nombe y apellido: </p><strong>${mensaje.nombre}</strong></div>
      //   <div><p>Email: </p><strong>${mensaje.email}</strong></div>
      //   <div><p>Teléfono: </p><strong>${mensaje.telefono}</strong></div>
      //   <div><p>Comentario: </p><strong>${mensaje.descripcion}</strong></div>
      // </html>`
    }).then((message) => alert(message));
  }

  // const handleChange = (e) => {
  //   setMensaje({
  //     ...mensaje,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  return (
    <div>
      <Layout>
        <div className="classPadding">
          <div
            css={css`
              max-width: 1000px;
              margin: auto auto;
            `}
          >
            <RowUno className="altura">
              <Contenedor>
                <div className="contenido">
                  <img src="/me_entrada2.jpg"></img>
                </div>
                <div className="contenido">
                  <h2>Casa Central</h2>
                  <h3>Santa Rosa</h3>
                  <ul>
                    <li>Ubicación: Gral. Pico 502(Esquina Juan B. Justo)</li>
                    <li>Teléfono: 02954 59-6067</li>
                    <li>Email: memiliobr@speedy.com.ar</li>
                    <li>Horarios: Lunes a Viernes de 09:00hs a 15:00hs</li>
                  </ul>
                </div>
              </Contenedor>
              <Contacto>
                <h4>Contacto</h4>
                <div
                  css={css`
                    display: flex;
                    span {
                      margin: 0 1rem;
                    }
                  `}
                >
                  <img src="/call.png"></img>
                  <span>(02954) - 596057</span>
                </div>
                <h4>Consultas</h4>
                <form onSubmit={handleSubmit} noValidate>
                  <Campo>
                    <input
                      type="text"
                      id="nombre"
                      placeholder="Nombre y apellido"
                      name="nombre"
                      // value={ubicacion}
                      onChange={handleChange}
                    />
                  </Campo>

                  <Campo>
                    <input
                      type="email"
                      id="email"
                      placeholder="E-mail"
                      name="email"
                      // value={ubicacion}
                      onChange={handleChange}
                    />
                  </Campo>

                  <Campo>
                    <input
                      type="text"
                      id="telefono"
                      placeholder="Teléfono"
                      name="telefono"
                      // value={ubicacion}
                      onChange={handleChange}
                    />
                  </Campo>

                  <Campo>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      placeholder="Comentario"
                      onChange={handleChange}
                    />
                  </Campo>
                  {/* <BotonEnviar type="button" value="Send Email" onclick={enviarComentario} /> */}
                  <BotonEnviar type="submit" value="Enviar" />
                  {/* <BotonEnviar type="submit" value="Enviar" /> */}
                  {/* </BotonEnviar> */}
                </form>
              </Contacto>
            </RowUno>
            <ContenedorMapa>
              <Mapa propiedad={sucursal} />
            </ContenedorMapa>
          </div>
        </div>
      </Layout>
    </div>
  );
}
