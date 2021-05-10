import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import firebase, { FirebaseContext } from "../../firebase";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Error404 from "../../components/Layout/Error404";
import Mapa from "../../components/Propiedades/Mapa2";
import GaleriaFoto2 from "../../components/Propiedades/GaleriaFoto2";
import image from "react-firebase-file-uploader/lib/utils/image";
import FormContacto from "../../components/FormContacto";
import Footer from "../../components/Layout/Footer";
// import test from '../../components/getFirebase';

const ContenedorPropiedad = styled.div`
  margin: 1rem 0 5rem 0;
  span {
    /* font-weight:bold; */
  }
  p {
    color: #4e4e4e;
    /* margin-bottom: 5rem; */
  }
  .lista {
    /* margin:1rem 0; */
    padding: 1rem 0;
    list-style: none;
    margin-bottom: 3rem;
    display: flex;
    border-bottom: 1px solid #d0d0d0;
    /* justify-content: space-evenly; */
    li {
      margin: 1rem 6rem 1rem 0rem;
      display: flex;
      color: var(--bordo);
      height: 24px;
      span {
        margin-left: 5px;
      }
    }
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 4rem;
  }
`;
const ContenedorMapa = styled.div`
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  /* padding:1rem; */
  /* overflow:hidden; */
  height: 400px;
  /* margin: 10px 0; */
  /* position:static; */
  @media (min-width: 768px) {
    position: relative;
  }
`;

const ContenedorServicios = styled.div`
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  height: 200px;
  padding: 3rem 0;
  ul {
    display: grid;
    justify-content: flex-start;
    grid-auto-columns: 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 28px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    /* flex-wrap:wrap; */
    /* justify-content: space-evenly; */
    /* justify-items:stretch; */
  }

  div {
    margin-left: 45px;
    /* flex-basis: calc(33.3%); */
    /* flex-basis: calc(25% -2rem); */
  }
`;

const Aside = styled.div`
  /* padding: 1rem 2rem; */
  /* border:1px solid black; */
  /* box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%); */
  height: 440px;
  position: sticky;
  top: 100px;

  /* h4 {
    margin: 1rem 0;
  } */
`;

const Campo = styled.div`
  input {
    border: 1px solid black;
    margin: 1rem 0;
    border-radius: 5px;
    width: 100%;
    padding: 0.8rem;
  }
  textarea {
    flex: 1;
    height: 80px;
    width: 100%;
  }
`;

const BotonEnviar = styled.input`
  display: block;
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
  border: none;
  background-color: var(--rojo);
  color: white;
  border-radius: 10px;
  text-align: center;
  width: 100px;
  margin: 10px auto;
  /* margin-left: 92px; */
  padding: 10px;
  transition-duration: 0.5s;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Propiedad = (props) => {
  // const [propiedad, guardarPropiedad] = useState({});
  const [error, guardarError] = useState(false);
  // const [imagenes, guardarImagenes] = useState([]);
  var imagenes;
  const [mensaje, setMensaje] = useState({
    nombre: "",
    email: "",
    telefono: "",
    descripcion: "",
  });

  //Routing para obtener el id actual de la ruta
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase } = useContext(FirebaseContext);

  if (router.isFallback) return <div className="preloader"></div>;

  // console.log({ ...props });
  // console.log(id);
  const {
    tipo,
    operacion,
    ambiente,
    banio,
    ubicacion,
    descripcion,
    urlimagen,
    creado,
    precio,
    m2,
    visible,
    moneda,
    coordinates
  } = { ...props };
  const propiedad = {...props}
  // console.log(propiedad);

  if (urlimagen) {
      const img = urlimagen;
      const fotos = [];
      for (let i = 0; i < img.length; i++) {
        // console.log("recorriendo imagenes" + i)
        // console.log(img[i]);
        fotos.push({
          src: img[i],
          w: 800,
          h: 600,
          id: i,
        });
        // guardarImagenes([...imagenes, {src: img[i],
        //   w: 800,
        //   h: 600}]);
      }
      imagenes=fotos
      // guardarImagenes(fotos);
  }
  // console.log(testfotos)
  
  // const {
  //   tipo,
  //   operacion,
  //   ambiente,
  //   banio,
  //   ubicacion,
  //   descripcion,
  //   urlimagen,
  //   creado,
  //   precio,
  //   m2,
  //   visible,
  //   moneda
  // } = propiedad;

  if (ubicacion) {
    const detalle_ubicacion = ubicacion.split(",");
  }

  const enviarComentario = (e) => {
    e.preventDefault();

    Email.send({
      // Host : "smtp.mailtrap.io",
      // Username : "<Mailtrap username>",
      // Password : "<Mailtrap password>",
      SecureToken: "9614001f-601e-48e8-a34d-973c79399942",
      To: "juanbecher1895@gmail.com",
      From: "joshblue731@gmail.com",
      Subject: `Consulta ${tipo} en ${operacion} (${ubicacion.split(",")[0]})`,
      Body: `
      <h3>${tipo} en ${operacion}, ${
        ubicacion.split(",")[0]
      } , a recibido una nueva consulta.</h3><br/><br/>
      
      <strong>Link: </strong> http://localhost:3000/propiedad/${id} <br/>

      <strong>Nombre y apellido:  </strong>${mensaje.nombre} <br/>
      <strong>Email: </strong> ${mensaje.email} <br/>
      <strong>Teléfono: </strong> ${mensaje.telefono} <br/>
      <strong>Comentario: </strong> ${mensaje.descripcion} <br/>
      `,
      // Body : `<html>
      //   <div><p>Nombe y apellido: </p><strong>${mensaje.nombre}</strong></div>
      //   <div><p>Email: </p><strong>${mensaje.email}</strong></div>
      //   <div><p>Teléfono: </p><strong>${mensaje.telefono}</strong></div>
      //   <div><p>Comentario: </p><strong>${mensaje.descripcion}</strong></div>
      // </html>`
    }).then((message) => alert(message));
  };

  // useEffect(() => {
  //

  //   if (id) {
  //     const obtenerPropiedad = async () => {
  //       const propiedadQuery = await firebase.db
  //         .collection("propiedades")
  //         .doc(id);
  //       const propiedad = await propiedadQuery.get();
  //       if (propiedad.exists) {
  //         guardarPropiedad(propiedad.data());
  //         arregloImagenes(propiedad.data());
  //       } else {
  //         guardarError(true);
  //       }
  //     };
  //     obtenerPropiedad();
  //   }
  // }, [id]);

  function numberWithCommas(x) {
    if (!x) {
      return "";
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function getPrecio(precio, moneda) {
    if (precio) {
      if (moneda == "peso") {
        return `$ ${numberWithCommas(precio)}`;
      } else if (moneda == "dolar") {
        return `USD ${numberWithCommas(precio)}`;
      } else {
        return `$ ${numberWithCommas(precio)}`;
      }
    } else {
      return "Precio a consultar";
    }
  }

  const handleChange = (e) => {
    setMensaje({
      ...mensaje,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="classPadding">
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor-1000">
            {/* <div
              css={css`
                position: relative;
                min-height:100px;
                img {
                  margin: 0 auto;
                  max-width: 100%;
                  max-height: 300px;
                }
              `}
            >
              {urlimagen ? <img src={urlimagen[0].url} /> 
              : <div className="preloader"></div> 
              }
              
            </div> */}
            <div
              css={css`
                position: relative;
                margin-bottom: 2rem;
              `}
            >
              <GaleriaFoto2 key={imagenes.id} imagenes={imagenes} />
            </div>

            <ContenedorPropiedad>
              <div>
                {visible == "no" && (
                  <div>
                    <h2
                      css={css`
                        color: red;
                      `}
                    >
                      Propiedad no disponible
                    </h2>
                  </div>
                )}

                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <h3>
                    {tipo} en {operacion}
                  </h3>
                  <h2>{getPrecio(precio, moneda)}</h2>
                  {/* {precio ? <h2>${numberWithCommas(precio)}</h2>
                  :<h2>Precio a consultar</h2>} */}
                </div>
                <div>
                  <p>{ubicacion}</p>
                </div>
                <ul className="lista">
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

                <h3>Descripción</h3>
                <p>{descripcion}</p>
                <div
                  css={css`
                    margin: 7rem 0;
                    h4 {
                      margin: 0;
                    }
                  `}
                >
                  <h3>Ubicación</h3>
                  <ContenedorMapa>
                    {creado && <Mapa propiedad={propiedad} />}
                  </ContenedorMapa>
                </div>
              </div>
              <Aside>
                <FormContacto
                  id={id}
                  tipo={tipo}
                  operacion={operacion}
                ></FormContacto>
              </Aside>
            </ContenedorPropiedad>
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "KF5FTG0VOvAE01hnRb3a" } }],
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firebase.db
    .collection("propiedades")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;

      const props = {
        ...data,
        id,
      };
      return { props };
    })
    .catch(() => {
      return { props: {} };
    });
}

export default Propiedad;
// export async function getStaticPaths(){
//   // const propiedades = firebase.getPropiedad()
//   // let paths = propiedades.map(prop => {
//   //   return `/propiedad/${prop.id}`
//   // })
//   let paths = ["/propiedad/KF5FTG0VOvAE01hnRb3a"]
//   return{
//     paths,
//     fallback:false
//   }

// }
