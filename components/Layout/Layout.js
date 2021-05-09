import { jsx } from "@emotion/react";
import Head from "next/head";
import {Html} from 'next/document';
import React, { Children, Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Global, css } from "@emotion/react";
import LogoWhatsapp from "./LogoWhatsapp";

const Layout = (props) => {
  return (
    <Fragment>
      <Global
        styles={css`
          :root {
            --gris_anterior: #3d3d3d; /*   */
            --gris2: #6f6f6f;
            --gris3: #e1e1e1;
            --gris_borde: #e0e1e1;
            --negro: #2a2a33; /* Letra  */
            --blanco: #e1ecf2;
            --gris_head: #313333;
            --bordo: #8c3e4c;
            --rosa: #f2b3bf;
            --rojo: #a63f5a;
            --gris: #bfbfbf;
          }

          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            font-size: 1.5rem !important;
            /* font-size: 1.6rem !important; */
            font-family: "Inter", sans-serif !important;
            /* font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial,sans-serif; */
            line-height: 1.5 !important;
          }
          h1,
          h2,
          h3 {
            /* margin: 0 0 2rem 0; */
            line-height: 1.5;
            margin: 0;
            font-weight: 600;
          }
          p {
            margin: 0;
          }
          ul {
            /* list-style: none; */
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: none !important;
          }
        `}
      />
      <Head>
        <title>ME - Inmobiliaria</title>
        <link rel="shortcut icon" type="image/jpg" href="/favicon-me.png" />
        <html lang="es"/>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Courgette&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0-rU3vYLOIiSgtfbfVC_m4SqRigS9vyk&libraries=places"
          type="text/javascript"
        ></script> */}

        <script src="https://smtpjs.com/v3/smtp.js"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* <link rel="stylesheet" href="slick-carousel/slick/_slick.css"></link>
        <link rel="stylesheet" href="slick-carousel/slick/_slick-theme.css"></link> */}


        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0-rU3vYLOIiSgtfbfVC_m4SqRigS9vyk&libraries=places"></script> */}
      </Head>
      <Header />
      <LogoWhatsapp />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
