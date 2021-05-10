import React from 'react';
import validarEnviarConsulta from "../validacion/validarEnviarConsulta";
import useValidacion from "../hooks/useValidacion";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
 

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

  .notification-container {
  position: fixed;
  top: 100px !important;
  right: 0;
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
const STATE_INICIAL = {
    nombre: "",
    email: "",
    telefono: "",
    descripcion: "",
  };
const FormContacto = ({id,tipo,operacion}) => {
    
  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarEnviarConsulta,
    enviarComentario
  );
    const click = (e) =>{
        e.preventDefault();
        NotificationManager.success('Consulta enviada.')
    }
  function enviarComentario(e) {
    // e.preventDefault();

    Email.send({
      // Host : "smtp.mailtrap.io",
      // Username : "<Mailtrap username>",
      // Password : "<Mailtrap password>",
      SecureToken: "9614001f-601e-48e8-a34d-973c79399942",
      To: "juanbecher1895@gmail.com",
      From: "joshblue731@gmail.com",
      Subject: `${nombre} consulta por ${tipo} en ${operacion}`,
      Body: `
      <h3>Ha recibido una nueva consulta en: </h3><br/>
      http://localhost:3000/propiedad/${id} <br/>
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
    }).then((message) => NotificationManager.success('Consulta enviada.')
        
    );
  }

  const { nombre, email, telefono, descripcion } = valores;
    return ( 
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
                <NotificationContainer/>
              </Contacto>
    );
}
 
export default FormContacto;