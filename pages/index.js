import React, { useEffect, useState, useContext} from "react";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import PanelDestacado from "../components/PanelDestacado";
import Button from "../components/Layout/Button";
import { FirebaseContext } from "../firebase";

const ContenedorImagen = styled.div`
  background-image: url("./IMG_9305_compr.JPG");
  background-size: cover;
  background-position:center;
  min-height: 70rem;

  .me_img{
    display:flex;
    margin:0 auto;
    width: 150px;
  }
  
  @media (min-width: 768px) {
    min-height: 75rem;
    .me{
    width: 1800px;
  }

  .me_img{
    width: 180px;
  }
  }
`;

const ContenedorInputs = styled.div`
  text-align: center;
  padding-top: 14rem;
  max-width: 750px;
  width: 95%;
  margin: 0 auto;
  display: grid;
  row-gap: 0.5rem;

  select {
    padding: 0 1rem;
    border:none;
    height: 48px;
    text-align:center;
    border-radius:5px;
  }
  .primer-select{
    border-radius:5px;
  }
  @media (min-width: 768px) {
    grid-template-columns: 2fr 2fr 0.5fr;
    column-gap:0rem;
    padding-top: 20rem;
    width:55%;
    select{
      border-radius:0px;
      height: 58px;
    }
    .primer-select{
    border-radius:5px 0 0 5px;
  }
  }
  @media (min-width: 1500px) {
    padding-top: 23rem;
  }
`;

const Slogan = styled.h1`
  margin: 0 auto;
  color: white;
  font-family: "Courgette", cursive;
  font-size: 2.5rem;
  line-height: 40px;
  margin-top: 4rem;
  text-align: center;
  @media (min-width: 768px) {
    max-width: 40%;
    font-size: 3rem;
  }
`;


export default function Home() {
  const emprendimiento = true;
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
          <div>
          <img src="/ME.png" className="me_img"></img>
          
          </div>
          
          <ContenedorInputs>
            <select name="operacion" className="hijo primer-select" id="operacion"   defaultValue={'DEFAULT'} onChange={handleChange}>
            
            <option value="DEFAULT" disabled>Tipo de operación</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>

            <select name="tipo" className="hijo" id="tipo"  defaultValue={'DEFAULT'} onChange={handleChange}>
            
            <option value="DEFAULT" disabled>Tipo de propiedad</option>
              <option value="Casa">Casa</option>
              <option value="Quinta">Casa quinta</option>
              <option value="Campo">Campo</option>
              <option value="Departamento">Departamento</option>
              <option value="Local">Local comercial</option>
              <option value="Terreno">Terreno</option>

            </select>

            <Button className="hijo" filtro_home={filtros}></Button>
          </ContenedorInputs>
          <Slogan>
            Usted y nosotros, un seguro y sólido negocio inmobiliario.
          </Slogan>
        </ContenedorImagen>

        <PanelDestacado empren={!emprendimiento} propiedades={propiedades}/>
        <PanelDestacado empren={emprendimiento} propiedades={propiedades} />
      </Layout>
    </>
  );
}
