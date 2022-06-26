import React, { useEffect, useContext } from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import firebase, { FirebaseContext } from "../../firebase";
import ActiveLink from "../Layout/ActiveLink";
import Link from 'next/link'
import Login from "./Login";
import Head from "next/head";


const Contenedor = styled.div`
font-size:14px;

.logo{
  background-color: #3f4144;
  max-height:50px;
  img {
    margin-left: 35%;
  }
}
#boton-home{
  left:76rem;
}
  
  .active {
    color: white;
    &:before {
      content: "";
      display: block;
      width: 5px;
      height:100%;
      background: #A63F5A;
      position: absolute;
      left: 0%;
      bottom: 0;
    }
  }
  .header {
    position: absolute;
    width: 100%;
    z-index: 3;
    height: 50px;
    background-color: #fff;
  }
  .side-nav {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #393c40;
    z-index: 1;
    display: none;
  }
  .side-nav ul {
    margin-top: 10px;
    padding: 0;
  }
  .side-nav ul li {
    padding: 16px 16px;
    border-bottom: 0.5px solid #393c40;
    position: relative;
  }
  .side-nav ul li.active:before {
    content: "";
    position: absolute;
    width: 4px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
  }
  .side-nav ul li a {
    color: #fff;
    display: block;
    text-decoration: none;
  }
  .side-nav ul li i {
    color: #0497df;
    min-width: 20px;
    text-align: center;
  }
  .side-nav ul li span:nth-of-type(2) {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  /* main content styles */
  .main-content {
    background-color:#e0e0e0;
    padding: 40px;
    margin-top: 0;
    padding: 0;
    padding-top: 44px;
    overflow: scroll;
  }
  /* set element styles to fit tablet and higher(desktop) */
  @media screen and (min-width: 600px) {
    .header {
      background-color: #393c40;
      z-index: 1;
    }
    .header .logo {
      display: none;
    }
    .nav-trigger {
      display: none;
    }
    .nav-trigger span,
    .nav-trigger span:before,
    span:after {
      background-color: #fff;
    }
    .side-nav {
      display: block;
      width: 70px;
      z-index: 2;
    }
    .side-nav ul li span:nth-of-type(2) {
      display: none;
    }
    .side-nav .logo i {
      padding-left: 12px;
    }
    .side-nav .logo span {
      display: none;
    }
    .side-nav ul li i {
      font-size: 26px;
    }
    .side-nav ul li a {
      text-align: center;
      margin-left:12px;
      padding-top:2px;
    }
    .main-content {
      margin-left: 70px;
    }
  }
  /* set element styles for desktop */
  @media screen and (min-width: 800px) {
    .side-nav {
      width: 200px;
    }
    .side-nav ul li span:nth-of-type(2) {
      display: inline-block;
    }
    .side-nav ul li i {
      font-size: 16px;
    }
    .side-nav ul li a {
      text-align: left;
    }
    .side-nav .logo i {
      padding-left: 0;
    }
    .side-nav .logo span {
      display: inline-block;
    }
    .main-content {
      margin-left: 200px;
    }

    .side-nav.visible {
      display: block;
    }
  }
`;

const Boton = styled.div`
    position: absolute;
    padding: 8px 8px;
    border-radius: 25px;
    text-align: center;
    color: white;
    top: 1px;
    left: 80rem;
`

const AdminLayout = (props) => {

  const { usuario, firebase } = useContext(FirebaseContext);
  
  return (
    <>
      <Head>
      <link rel="shortcut icon" type="image/jpg" href="/favicon-me.png" />
      <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=yourKey&libraries=places"
          type="text/javascript"
        ></script>
      </Head>
      {usuario ? (
        <Contenedor>
          <div className="header">
            <div className="logo">
              <i className="fa fa-tachometer"></i>
              <span>Brand</span>
            </div>
            <a href="#" className="nav-trigger">
              <span>asdasda</span>
            </a>
          </div>
          <div className="side-nav">
            <div className="logo">
              <i className="fa fa-tachometer"></i>
              <img src="/logo_me.png" alt="Logo"></img>
            </div>
            <nav>
              <ul>
                <li>
                  <ActiveLink href="/admin" activeClassName="active" className="link">
                    
                    <div className="flex link">
                    <img src="/list.png" alt="Agregar propiedad"></img>
                    <a>Listado propiedades</a>
                    </div>
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/nuevaPropiedad" activeClassName="active">
                    <div className="flex link">
                    <img src="/add.png" alt="Agregar propiedad"></img>
                    <a>Nueva propiedad</a>
                    </div>
                    
                  </ActiveLink>
                </li>
              </ul>
            </nav>
            <Boton onClick={() => firebase.cerrarSesion()} className="link"><img src="/log-out.png" alt="Cerrar sesion"></img></Boton>
            <Boton id="boton-home" className="link"><Link href="/"><a><img src="/home.png" alt="Pagina principal"></img></a></Link></Boton>
          </div>
          <div className="main-content">
            <main>{props.children}</main>
          </div>
        </Contenedor>
      ) : (
        <Login></Login>
      )}
    </>
  );
};

export default AdminLayout;
