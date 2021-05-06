import React,{useEffect, useState} from 'react';
import Link from './Layout/ActiveLink';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import Carousel from './Carousel/Carousel'

const Contenedor = styled.div`
  /* background-color: var(--gr) */
  /* background-color: #F5F5F5; */
  background-color: ${props => props.empren ? 'var(--rojo)' : '#F5F5F5'};
  background-color: #FFF;

`
const Panel = styled.div`
  text-align:center;
`
const Titulo = styled.div`
  padding:2rem;
  padding-bottom:0;
  h2{
    margin:0;
  }
  span{
    color: var(--rojo);
  }
`;

const PanelDestacado = (props) => {

  const [propiedades, setPropiedades] = useState([])
  const emprendimiento = props.empren;
  const todasPropiedades = props.propiedades;

  useEffect(() => {
    if (emprendimiento) {
      setPropiedades(todasPropiedades.filter(prop => prop.propiedad == "Emprendimiento" 
      && prop.destacado == "si" && prop.visible =="si"))
    }else{
      setPropiedades(todasPropiedades.filter(prop => prop.propiedad == "Inmueble" 
      && prop.destacado == "si" && prop.visible =="si"))
    }
  }, [todasPropiedades])
  
  return (
    <>
      
      <Contenedor>
        <Panel className="contenedor">
          {(emprendimiento)
            ? (<Titulo><h2>Emprendimientos <span>Destacados</span></h2></Titulo>)
            : (<Titulo><h2>Propiedades <span>Destacadas</span></h2></Titulo>)
          }
          
          <Carousel propiedades={propiedades} >

          </Carousel>
        </Panel>
      
      </Contenedor>
   
    </>
  );
};

export default PanelDestacado;