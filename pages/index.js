import React, { Fragment , useEffect, useState, useContext} from "react";
import { jsx } from "@emotion/react";
// import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import PanelDestacado from "../components/PanelDestacado";
import Button from "../components/Layout/Button";
import { FirebaseContext } from "../firebase";
import "slick-carousel/slick/_slick.css";
import "slick-carousel/slick/_slick-theme.css";
// import {cargaContext} from '../components/FiltroContext'

const ContenedorImagen = styled.div`
  /* padding-top:10rem; */
  /* border: solid transparent; */
  background-image: url("./header2.jpg");
  /* background-image: url("https://www.zillowstatic.com/s3/homepage/static/_Desktop_Overlay_ReadyChange_HC.jpg"); */
  /* background-position: center center; */
  background-size: cover;
  /* z-index:-1; */
  min-height: 70rem;
  /* width:100%; */
  @media (min-width: 768px) {
    min-height: 75rem;
  }
`;

const ContenedorInputs = styled.div`
  text-align: center;
  padding-top: 14rem;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  display: grid;
  row-gap: 0.5rem;

  @media (min-width: 768px) {
    /* justify-content: space-between; */
    /* flex-wrap: wrap; */
    grid-template-columns: 2fr 2fr 0.5fr;
    column-gap:1rem;
    padding-top: 10rem;
    width:70%;
  }
  select {
    padding: 0 1rem;
    border:none;
    height: 58px;
    text-align:center;
    /* width: 35rem; */
    /* padding: 2rem; */
    /* margin:1rem; */
    border-radius:5px;
  }
  *[class = "hijo"]{
    /* flex-basis: calc(45% - 0rem); */
  }

  
`;

const Slogan = styled.h1`
  margin: 0 auto;
  color: white;
  /* font-family: "Ivar Headline","Ivar Headline Subset","Times New Roman",serif; */
  font-family: "Courgette", cursive;
  font-size: 2.5rem;
  line-height: 40px;
  /* font-weight: 600; */
  margin-top: 5rem;
  text-align: center;
  @media (min-width: 768px) {
    max-width: 40%;
    font-size: 3.5rem;
  }
`;


// export const fil = filtros;

export default function Home() {
  const emprendimiento = true;
  // const [filtros, guardarFiltros ] = useState({
  //   operacion:"",
  //   tipo:""
  // });
  const [propiedades, GuardarPropiedades] = useState([]);

  const { firebase,filtroOperacion,
    guardarFiltroOperacion,
    filtros,
    guardarfiltros } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPropiedades = () => {
      firebase.db
        .collection("propiedades")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };

    obtenerPropiedades();
  }, []);

  // useEffect(() => {
  //   cargaContext(filtros);
  // }, [filtros])

  function manejarSnapshot(snapshot) {
    const propiedades = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    for (var i = 0; i < propiedades.length; i++) {
      let fecha = new Date(propiedades[i].creado);
      let day = fecha.getDate();
      let month = fecha.getMonth() + 1;
      let year = fecha.getFullYear();

      if (month < 10) {
        propiedades[i].creado = `${day}-0${month}-${year}`;
      } else {
        propiedades[i].creado = `${day}-${month}-${year}`;
      }
    }
    GuardarPropiedades(propiedades);
  }

  const handleChange = e => {
    // setfiltroHome({
    //     ...filtroHome,
    //     [e.target.name] : e.target.value
    // })
    if (e.target.name == "operacion") {
      guardarFiltroOperacion(e.target.value);
    }
    if (e.target.name == "tipo") {
      guardarfiltros([e.target.value]);
    }
}

  return (
    <>
      <Layout>
        <ContenedorImagen className="classPadding">
          <Slogan>
            Usted y nosotros, un seguro y sólido negocio inmobiliario.
          </Slogan>
          <ContenedorInputs>
            <select name="operacion" className="hijo" id="operacion"   defaultValue={'DEFAULT'} onChange={handleChange}>
            {/* <option hidden selected value="NA">Tipo de operación</option> */}
            <option value="DEFAULT" disabled>Tipo de operación</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>

            <select name="tipo" className="hijo" id="tipo"  defaultValue={'DEFAULT'} onChange={handleChange}>
            {/* <option hidden selected value="NA">Tipo de propiedad</option> */}
            <option value="DEFAULT" disabled>Tipo de propiedad</option>
              <option value="Casa">Casa</option>
              <option value="Quinta">Casa quinta</option>
              <option value="Campo">Campo</option>
              <option value="Departamento">Departamento</option>
              <option value="Local">Local comercial</option>
              <option value="Terreno">Terreno</option>

            </select>

            {/* <select name="tipo" className="hijo" id="tipo"   onChange={handleChange}>
            <option hidden selected value="NA">Tipo de inmueble</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
            </select> */}

            <Button className="hijo" filtro_home={filtros}></Button>
          </ContenedorInputs>
        </ContenedorImagen>

        {/* Inmuebles dest */}
        <PanelDestacado empren={!emprendimiento} propiedades={propiedades}/>
        {/* Emprendimiento dest */}
        <PanelDestacado empren={emprendimiento} propiedades={propiedades} />
      </Layout>
    </>
  );
}
