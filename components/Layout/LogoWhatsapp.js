import React,{useEffect} from "react";
import styled from "@emotion/styled";
import $ from "jquery";

const Contenedor = styled.div`
  top: 80%;
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
      max-width:45px;
  }
  }
`;

const LogoWhatsapp = () => {
  useEffect(() => {
    var path = window.location.pathname;
  if (path == '/propiedades') {
    $(".wp").hide();
  }
    
  }, [])
  
  
  return (
    <Contenedor className="wp">
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
