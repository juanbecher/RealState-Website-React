import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
// import ListadoPropiedades from "./ListadoPropiedades";
import Mapa2 from "./Mapa2";
import $ from "jquery";
import Pagination from "./Pagination";
import Tarjeta from "./Tarjeta";

const ContenedorIzquierdo = styled.div`
  flex: 0 0 calc(55% - 0rem);
`;

const Seccion = styled.div`
  color: black;
  /* margin-top: 2rem; */
  h3 {
    margin-top: 5rem;
  }
`;

const ContenedorMapa = styled.div`
  /* max-width: 100%; */
  /* height: 500px; */
  /* margin: 10px 0; */
  /* position: static; */
  display: none;
  @media (min-width: 768px) {
    display: block;
    /* flex: 0 0 calc(45% - 1rem); */
    position: sticky;
    top: 143px;
  }
`;
const OrdenarLayout = styled.div`
  position: fixed;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  /* padding-top: 5rem; */
  transition: transform 0.3s ease-in-out;

  background-color: white;
  z-index: 3;

  /* display: none; */
  p {
    margin: 2rem;
    font-size: 1.17em;
    font-weight: bold;
  }
  .cerrar {
    h3 {
      padding: 2rem 2rem;
    }
    img {
      padding: 2rem;
    }
  }
  @media (min-width: 768px) {
    position: relative;
    display: flex;
    transform:none;
    width: auto;
    z-index:1;
    p {
      font-size: 1.5rem;
      margin: 0.5rem 1rem 0 0;
      font-weight: bold;
    }
    .cerrar{
      display:none;
    }
  }
`;
const Ordenar = styled.div`
  margin: 0rem 1.5rem 1rem 0;

  .collapsible_ord {
    display: none;
    background-color: white;
    /* color: var(--rojo);
  font-weight:bold; */
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    border-radius: 12px;
    /* box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%); */
  }
  .collapsible_ord:hover {
    background-color: #eee;
  }

  .content_ord {
    display: block;
    position: absolute;
    width: 100%;

    overflow: hidden;
    background-color: white;
    border: none;
    border-top: 1px solid #e2e2e2;

    margin-top: 1rem;
    z-index: 1;
  }
  .activa {
    background-color: #e1e1e1 !important;
    color: var(--gris2);
    border-left: 3px solid var(--rojo) !important;
  }
  @media (min-width: 768px) {
    .collapsible_ord {
      display: block;
    }
    .content_ord {
      border: 1px solid #b1b1b1;
      box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
      max-width: 300px;
      min-width: 200px;
      border-radius: 5px;
      display: none;
    }
  }
`;
const BoxButton = styled.div`
  .boton {
    text-align: start;
    width: 100%;
    padding: 2rem 1.5rem;
    border: none;
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    background-color: white;
    :hover {
      cursor: pointer;
      background-color: #e1e1e1;
    }
  }
  @media (min-width: 768px) {
    .boton {
      border: none;
      padding: 1rem 1.5rem;
    }
  }
`;

const Contenedor = styled.div`
  background-color: #fff;
  margin-top: 1rem;
`;
const ContenedorPropiedades = styled.div`
  display: grid;
  grid-template-columns: 1;
  column-gap: 2rem;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 4rem;
  }
`;

const LayoutPropiedades = ({
  propiedadesFiltro,
  ordenar,
  guardarOrdenar,
  open_ordenar,
  setOpen_ordenar,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  useEffect(() => {
    setCurrentPage(1);
  }, [propiedadesFiltro]);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = propiedadesFiltro.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // setIndicesPagina([{indexOfLastPost},{indexOfFirstPost}])

  // console.log(propiedadesFiltro)

  // Change page
  const paginate = (pageNumber, totalPages) => {
    if (pageNumber == "previous") {
      const pag = currentPage - 1;
      if (pag < 1) {
        setCurrentPage(1);
      } else {
        setCurrentPage(pag);
      }
    } else if (pageNumber == "next") {
      const pag = currentPage + 1;
      if (pag > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(pag);
      }
    } else {
      setCurrentPage(pageNumber);
    }
    $("html, body").animate({ scrollTop: 0 }, "300");
  };

  // collapsible y demas
  useEffect(() => {
    var coll = document.getElementsByClassName("collapsible_ord");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        // this.classList.toggle("activa_filtro");
        $(".collapsible_ord").removeClass("activa_filtro");
        $(this).addClass("activa_filtro");
        var content = this.nextElementSibling;

        if (content.style.display === "block") {
          content.style.display = "none";
          $(this).removeClass("activa_filtro");
        } else {
          $(".content_ord").css("display", "none");
          content.style.display = "block";
        }
      });
    }
    // Agregaa clase activa a boton Ordenar
    $(document).ready(function () {
      $(".boton").on("click", function () {
        $(".boton").removeClass("activa");
        $(this).addClass("activa");
      });
    });

    // Define la altur del mapa en base al tamaño de pantalla
    const alt = window.innerHeight - 142;
    document.querySelector("#mapa").style.height = alt + "px";
  }, []);

  const guardaOrdenar = (e) => {
    guardarOrdenar(e.target.value);
  };
  return (
    <div>
      {propiedadesFiltro && (
        <div
          css={css`
            margin: 1rem 0 3rem 0;
            @media (min-width: 768px) {
              display: grid;
              /* justify-content: space-between; */
              grid-template-columns: 2fr 1fr;
              column-gap: 4rem;
            }
          `}
        >
          <ContenedorIzquierdo>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <Seccion>
                <h2>Propiedades</h2>
                <p>Se han encontrado {propiedadesFiltro.length} propiedades.</p>
              </Seccion>
              <OrdenarLayout open={open_ordenar}>
                <div className="cerrar">
                  <img
                    src="/right-arrow.png"
                    onClick={() => setOpen_ordenar(!open_ordenar)}
                  ></img>
                  {/* <h3>Ordernar por</h3> */}
                </div>
                <p>Ordernar por</p>
                <Ordenar>
                  <button type="button" className="collapsible_ord">
                    {ordenar}
                  </button>
                  <div className="content_ord">
                    <BoxButton className="input_ordenar">
                      {/* <label> */}
                      <input
                        className="boton activa"
                        type="button"
                        id="input_ordenar"
                        name="fecha_desc"
                        value="Más recientes"
                        onClick={guardaOrdenar}
                      ></input>
                      {/* <a id="Venta" name="Venta" value="Venta" onClick={guardaOperacion}>Venta</a> */}
                      {/* <span htmlFor="Venta">Venta</span>
                    </label> */}
                    </BoxButton>
                    <BoxButton className="input_ordenar">
                      {/* <label> */}
                      <input
                        className="boton"
                        type="button"
                        id="input_ordenar"
                        name="precio_asc"
                        value="Menor precio"
                        onClick={guardaOrdenar}
                      ></input>
                      {/* <a id="Venta" name="Venta" value="Venta" onClick={guardaOperacion}>Venta</a> */}
                      {/* <span htmlFor="Venta">Venta</span>
                    </label> */}
                    </BoxButton>
                    <BoxButton className="input_ordenar">
                      <input
                        className="boton"
                        type="button"
                        id="input_ordenar"
                        name="precio_desc"
                        value="Mayor precio"
                        onClick={guardaOrdenar}
                      ></input>
                    </BoxButton>
                  </div>
                </Ordenar>
              </OrdenarLayout>
            </div>

            <Contenedor>
              {propiedadesFiltro.length == 0 && (
                <div
                  css={css`
                    margin: 6rem auto;
                    text-align: center;
                    p {
                      margin-top: 1rem;
                      color: var(--gris2);
                    }
                  `}
                >
                  <img src="/not-found.png"></img>
                  <p>
                    Lo sentimos. No se encontraron propiedades con esas
                    caracteristicas.
                  </p>
                </div>
              )}
              <ContenedorPropiedades className="container">
                {currentPosts.map((propiedad) => (
                  <Tarjeta key={propiedad.id} propiedad={propiedad} carousel_int={true} />
                  // <div><p>Tarjeta</p></div>
                ))}
              </ContenedorPropiedades>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={propiedadesFiltro.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </Contenedor>
          </ContenedorIzquierdo>

          <ContenedorMapa id="mapa">
            <Mapa2 currentPosts={currentPosts} />
          </ContenedorMapa>
        </div>
      )}
    </div>
  );
};

export default LayoutPropiedades;
