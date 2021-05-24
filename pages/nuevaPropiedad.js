import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/Layout/Formulario";
import firebase, { FirebaseContext } from "../firebase";
import useValidacion from "../hooks/useValidacion";
import NuevaPropiedad from "../components/Admin/NuevaPropiedad";
import AdminLayout from "../components/Admin/AdminLayout";

const nuevoInmueble = () => {
  

  return (
    <AdminLayout>
      <NuevaPropiedad></NuevaPropiedad>
    </AdminLayout>
  );
};

export default nuevoInmueble;
