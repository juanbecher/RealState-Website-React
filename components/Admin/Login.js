import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../Layout/Formulario";
import firebase, { FirebaseContext } from "../../firebase";

import useValidacion from "../../hooks/useValidacion";
import validarIniciarSesion from "../../validacion/validarIniciarSesion";

const Contenedor = styled.div``;

const STATE_INICIAL = {
  nombre: "",
  password: "",
};

const Login = () => {
    const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarIniciarSesion,
    iniciarSesion
  );

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario ", error.message);
      guardarError(error.message);
    }
  }
    return ( 
        <Formulario onSubmit={handleSubmit} noValidate>
          <h2>Iniciar sesión</h2>
          <Campo>
            <label htmlFor="email">Usuario</label>
            <input
              type="email"
              id="email"
              placeholder="Email usuario"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Campo>


          <Campo>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Campo>


          {error && <Error>{error} </Error>}
          <InputSubmit type="submit" value="Iniciar Sesión" />
        </Formulario>
     );
}
 
export default Login;