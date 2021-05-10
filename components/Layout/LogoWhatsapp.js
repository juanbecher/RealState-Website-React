import React from "react";
import styled from "@emotion/styled";

const Contenedor = styled.div`
  top: 70%;
  left: 85%;
  position: fixed;
  transition-duration: 0.5s;
  z-index:99;
  img{
      max-width:40px;
  }
  :hover{
      transform: scale(1.2)
  }
  @media (min-width: 768px){
    left: 93%;
    img{
      max-width:55px;
  }
  }
`;

const LogoWhatsapp = () => {
  return (
    <Contenedor>
      <a
        href="https://api.whatsapp.com/send/?phone=+5492954596067&text&app_absent=0"
        target="_blank"
      >
        <img src="/whatsapp.png" alt="Contactar Whatsapp"></img>
      </a>
    </Contenedor>
  );
};

export default LogoWhatsapp;
