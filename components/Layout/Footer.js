import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ContenedorFooter = styled.div`
  color: white;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  

  ul {
    display: flex;
    flex-direction:column;
    margin-bottom:8px;
    margin-left:1rem;
    list-style:none;
  }
  li {
    font-weight: bold;
    margin: 5px 0;
  }
  p {
    font-size: 1.3rem;
    margin-bottom: 0;
  }
  .socialMedia {
    display: flex;
    img {
      width: 40px;
      margin: 1rem 1rem;
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
    width: 95%;
    ul{
      list-style:disc;
      flex-direction:row;
    }
    li{
      margin: 0.5rem 1.5rem;
    }
  }
`;
const Logo = styled.div`
  img{
      margin: 15px 0 15px 0rem ;
        max-width: 100%; 
        /* height: 50px;  */
        display: block; 
        text-indent: -9999px;    
    }
    :hover {
      cursor: pointer;
    }

`;

const Contacto = styled.div`
  background-color: black;
  text-align: center;
  color: white;
  div{
    max-width: 1400px;
    margin: 0 auto;
  }
  p{
    font-size:1.3rem;
    margin-bottom:0;
  }
  
  span {
    font-weight: bold;
  }
  @media (min-width: 768px){
    p{
      margin-left:10%;
    }
  }
`;

const Footer = () => {
  return (
    <footer
      css={css`
        background-color: black;
        font-size: 14px;
      `}
    >
      <ContenedorFooter>
        <Logo>
          <Link href="/">
            <img src="/logo_blanco.png" alt="Logo"></img>
          </Link>
        </Logo>
        {/* Contenido central */}
        <div>
          
          <ul>
            <li css={css`list-style:none;`}>
              <Link href="/" activeClassName="active">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/nosotros" activeClassName="active">
                <a>Nosotros</a>
              </Link>
            </li>
            <li>
              <Link href="/propiedades" activeClassName="active">
                <a>Propiedades</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/tasaciones" activeClassName="active">
                <a>Tasaciones</a>
              </Link>
            </li> */}
            <li>
              <Link href="/sucursales" activeClassName="active">
                <a>Sucursales</a>
              </Link>
            </li>
          </ul>
          <p>© 2021 Todos los derechos reservados - All rigths reserved </p>
        </div>
        <div className="socialMedia">
          <a
            href="https://www.facebook.com/monicaemilio.bienesraices"
            target="_blank"
          >
            <img src="/facex64.png" alt="Facebook"></img>
          </a>
          <a href="https://www.instagram.com/memiliobr/" target="_blank">
            <img src="/instax642.png" alt="Instragram"></img>
          </a>
        </div>
      </ContenedorFooter>
      <Contacto>
        <div>
        <a href="https://www.linkedin.com/in/juanbecher/" target="_blank">
          <p>
            Desarrollado por: <span>Juan Maria Becher</span>
          </p>
        </a>
        </div>
        
      </Contacto>
    </footer>
  );
};

export default Footer;
