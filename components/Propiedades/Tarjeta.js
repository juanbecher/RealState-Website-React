import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
// import Link from "../Layout/ActiveLink";
import Link from 'next/link';
import ImgCarousel from "../Carousel/ImgCarousel";

// ${props => props.bgColor ? 'var(--naranja)' : 'var(--blanco)'};
const Card = styled.div`
  
  /* flex-basis: calc(100% - 1rem); */
  background-color: #ffffff;
  height: 350px;
  margin: 0 auto;
  border-radius: 4px;
  transition: 0.2s, opacity 0.2s;
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  max-width: 300px;

  &:hover {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    transform: scale(1.03) translate(0, -2px);
  }
  @media (min-width: 550px) {
    /* flex-basis: calc(45% - 1rem); */
  }
  @media (min-width: 768px) {
    padding: 10px;
    /* flex-basis: calc(33% - 1.5rem); */
  }
`;

const Imagen = styled.div`
  height: 60%;
  /* padding: 10px; */
  img {
    /* border-top-left-radius:5px;
    border-top-right-radius:5px; */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

const Contenido = styled.div`
  padding: 5px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  p {
    color: var(--gris2);
    margin: 0;
    /* font-weight: bold; */
  }
  h3,
  h4 {
    margin: 0;

    /* color: var(--rojo); */
  }
  h4 {
    font-weight: 500;
  }
`;

const LI = styled.li``;
const Caracteristicas = styled.div`
  margin: 12px 0.5rem 0 0.5rem;
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #6d6d6d;
  }
  li {
    display: flex;
    color: var(--bordo);
    height: 24px;
    span {
      margin-left: 5px;
    }
  }
`;

const Tarjeta = (props) => {
  const {
    id,
    tipo,
    operacion,
    ambiente,
    banio,
    ubicacion,
    descripcion,
    urlimagen,
    creado_date,
    precio,
    m2,
    moneda,
  } = props.propiedad;
  const carousel_int = props.carousel_int;
  const detalle_ubicacion = ubicacion.split(",");
  // console.log(urlimagen)

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function getPrecio(precio, moneda) {
    if (precio) {
      if (moneda == "peso") {
        return(`$ ${numberWithCommas(precio)}`)
      }else if (moneda == "dolar") {
        return(`USD ${numberWithCommas(precio)}`)
      }else{
        return(`$ ${numberWithCommas(precio)}`)
      }
    }else{
      return("A consultar")
    }
  }
  function tipoPropiedad(x) {
    if (x == "Quinta") {
      return "Casa quinta";
    }
    if (x == "Local") {
      return "Local comercial";
    }
    return x;
  }
  return (
    <Card className="link">
      <Imagen>
        <Link href="/propiedad/[id]" as={`/propiedad/${id}`}>
          {/* {carousel_int ? (
            <ImgCarousel urlimagen={urlimagen} id={id}/>
          ) : ( */}
            <a target="_blank">
              <img src={urlimagen[0]} alt="Logo"></img>
            </a>
          {/* )} */}
        </Link>
      </Imagen>
      <Contenido>
        <div>
          <div>
            <h2>{getPrecio(precio,moneda)}</h2>
            {/* {precio ? (
              <h2>$ {numberWithCommas(precio)}</h2>
            ) : (
              <h2>A consultar</h2>
            )} */}

            <h4>
              {tipoPropiedad(tipo)} en {operacion}
            </h4>
            <p>{detalle_ubicacion[0]}</p>
          </div>
          {/* <span>{descripcion}</span> */}
          <Caracteristicas>
            <ul>
              <li>
                <img src="/blueprint3.png"></img>{" "}
                <span>
                  {" "}
                  {m2}m<sup>2</sup>
                </span>
              </li>
              {ambiente && (
                <li>
                  <img src="/bed2.png"></img> <span> {ambiente}</span>
                </li>
              )}
              {banio && (
                <li>
                  <img src="/bath.png"></img> <span> {banio}</span>
                </li>
              )}
            </ul>
          </Caracteristicas>
        </div>
      </Contenido>
    </Card>
  );
};

export default Tarjeta;
