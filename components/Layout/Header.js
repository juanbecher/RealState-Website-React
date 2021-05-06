import React, { useEffect, useState } from "react";
import Link from "./ActiveLink";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Navegacion from "./Navegacion";
import Burger from "../Burger";
import $ from "jquery";
// import CambiaFondo from '../CambiaFondo'

const ContenedorHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    flex-direction: row;
    width: 95%;
  }
`;
const Logo = styled.div`
  
  img{
    max-width: 70%;
    margin: 15px 0;
    margin-left:10px;
    /* height: 50px;  */
    display: block;
    text-indent: -9999px;
  }
  :hover {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    img {
      /* margin-left: 2rem; */
      max-width:100%;
      margin-left:0;
    }
  }
  @media (min-width: 320px) {
    img {
      max-width: 100%;
    }
  }
`;

const Header = () => {
  const [url_logo, setUrl_logo] = useState("/logo0605_blanco.png");

  // Agrega fondo blanco a header cuando scrolleamos 
  useEffect(() => {
    const pageHeader = document.querySelector(".page-header");
    //   const animatedUl = pageHeader.querySelector(".secondary-menu");
    const fondoHeader = "fondoHeader";
    let targetScroll = window.innerHeight - pageHeader.offsetHeight;
    window.addEventListener("scroll", () => {
      const scrollY = window.pageYOffset;
      // console.log("scroll:" +scrollY);
      // console.log("window.inner:" +window.innerHeight);
      // console.log("pageheader:" +pageHeader.offsetHeight);
      // console.log("target:" + targetScroll);
        

      if (scrollY > targetScroll || window.location.pathname != '/') {
        pageHeader.classList.add(fondoHeader);
        setUrl_logo("/logo0605_negro2.png");
      } else {
        pageHeader.classList.remove(fondoHeader);
        setUrl_logo("/logo0605_blanco.png");
      }
    });

    window.addEventListener("resize", () => {
      targetScroll = window.innerHeight - pageHeader.offsetHeight;
    });
  }, []);

  // Agrega fondo blanco a header en paginas que no sean raiz /
  useEffect(() => {
    const pageHeader = document.querySelector(".page-header");
    const fondoHeader = "fondoHeader";
    if(window.location.pathname != '/'){
      // setUrl_logo("/logo2504_negro2.png");
      setUrl_logo("/logo0605_negro2.png");
      pageHeader.classList.add(fondoHeader);
    }
    if(window.location.pathname == '/propiedades'){
      $(".page-header").css("box-shadow","none");
    }
  }, [])

  return (
    <header
      className="page-header"
      css={css`
        position: fixed;
        width: 100%;
        /* border-bottom: 1px solid rgb(216, 216, 216); */
        background-color: #ffffff00;
        box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
        z-index: 2;
      `}
    >
      <ContenedorHeader>
        <Logo>
          <Link href="/">
            <img src={url_logo} alt="Logo"></img>
          </Link>
        </Logo>
        {/* <Navegacion /> */}
        <Burger />
      </ContenedorHeader>
    </header>
  );
};

export default Header;
