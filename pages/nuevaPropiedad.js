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
  
  // useEffect(() => {
  //   const script = document.createElement('script');
  
  //   script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA0-rU3vYLOIiSgtfbfVC_m4SqRigS9vyk&libraries=places";
  //   script.async = true;
  
  //   document.body.appendChild(script);
  
  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);

  return (
    <AdminLayout>
      <NuevaPropiedad></NuevaPropiedad>
    </AdminLayout>
  );
};

export default nuevoInmueble;
