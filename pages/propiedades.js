import React, { Fragment, useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Layout from "../components/Layout/Layout";
import { FirebaseContext } from "../firebase";
import $ from "jquery";
import LayoutPropiedades from "../components/Propiedades/LayoutPropiedades";

const ContenedorFiltros = styled.div`
  position: fixed;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;

  background-color: white;
  z-index: 3;
  .selectorFiltro {
    display: block;
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
    position: sticky;
    transform: none;
    transition: none;
    top: 82px;
    .cerrar {
      display: none;
    }
    .selectorFiltro {
      display: flex;
    }
  }
`;

const Filtro = styled.div`
  margin: 1rem 1.5rem 1rem 0;

  .collapsible,
  .collapsible_precio {
    background-color: white;
    color: #444;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: none;
    border-top: 1px solid #e2e2e2;
    text-align: left;
    outline: none;
    font-size: 15px;
  }

  .content {
    display: block;
    position: relative;
    width: 100%;
    padding: 0 15px;
    display: none;
    overflow: hidden;
    background-color: white;
    border: none;
    margin-top: 1rem;
    z-index: 10;
  }

  @media (min-width: 768px) {
    .collapsible,
    .collapsible_precio {
      background-color: white;
      color: #444;
      cursor: pointer;
      padding: 10px;
      width: 100%;
      border: 1px solid #b1b1b1;
      text-align: left;
      outline: none;
      font-size: 15px;
      border-radius: 12px;
      /* box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%); */
    }
    .activa_filtro,
    .collapsible:hover,
    .collapsible_precio:hover {
      background-color: #eaeaea;
    }

    .content {
      display: block;
      position: absolute;
      max-width: 300px;
      min-width: 200px;
      padding: 0 15px;
      display: none;
      overflow: hidden;
      background-color: white;
      border: 1px solid #b1b1b1;
      border-radius: 5px;
      box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
      margin-top: 1rem;
      z-index: 10;
    }
  }
`;

const Box = styled.div`
  padding: 1rem 0.5rem;

  label:hover {
    cursor: pointer;
  }
  span {
    margin: 0 1rem;
  }
  .boton {
    border: none;
    background-color: white;
    :hover {
      cursor: pointer;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
    border-radius: 12px;
    padding: 10px;
    border: 1px solid #e1e1e1;
    max-width: 100px;
  }
`;
const Filtroplicado = styled.div`
  label {
    display: inline-flex;
    margin: 1rem 0;
    margin-right: 1rem;
    border-radius: 3px;
    padding: 5px 10px;
    background-color: #eaeaea;
    :hover {
      cursor: pointer;
    }
  }
  .cancel {
    height: 12px;
    margin: auto 5px;
    margin-right: 3px;
  }
`;

const FiltroMobile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: sticky;
  top: 82px;
  text-align: center;
  background-color: white;
  z-index: 1;
  border-top: 1px solid #e2e2e2;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 2px -2px;
  img {
    margin: 5px 0;
  }
  .ordenar {
  }
  .filtrar {
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Propiedades() {
  const [filtroAmbiente, guardarFiltroAmbiente] = useState([]);
  const [filtroPrecio, guardarFiltroPrecio] = useState({ Desde: 0, Hasta: 0 });
  const [filtroMoneda, guardarFiltroMoneda] = useState("");
  const [ordenar, guardarOrdenar] = useState("Más recientes");
  const {
    firebase,
    filtroOperacion,
    guardarFiltroOperacion,
    filtros,
    guardarfiltros,
  } = useContext(FirebaseContext);
  const [open, setopen] = useState(false);
  const [open_ordenar, setOpen_ordenar] = useState(false);

  console.log(filtroMoneda);
  const [propiedades, GuardarPropiedades] = useState([]);
  const [propiedadesFiltro, GuardarPropiedadesFiltro] = useState([]);

  //Check Filters
  const verificaFiltros = (prop) => {
    if (typeof filtroOperacion !== "undefined") {

      if (!(prop.operacion == filtroOperacion)) {
        return false;
      }
    }
    if (filtros.length !== 0) {
      if (!filtros.includes(prop.tipo)) {
        return false;
      }
    }
    if (filtroAmbiente.length !== 0) {
      if (!filtroAmbiente.includes(prop.ambiente)) {
        return false;
      }
    }

    if (prop.precio !== "Consultar") {
      if (parseInt(prop.precio, 10) < filtroPrecio.Desde) {
        return false;
      }
      if (filtroPrecio.Hasta !== 0) {
        if (parseInt(prop.precio, 10) > filtroPrecio.Hasta) {
          return false;
        }
      }
      if (filtroMoneda) {
        if (prop.moneda != filtroMoneda) {
          return false;
        }
      }
    }

    return true;
  };

  // effect get properties
  useEffect(() => {
    const obtenerPropiedades = () => {
      firebase.db
        .collection("propiedades")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };

    obtenerPropiedades();
  }, []);

  function manejarSnapshot(snapshot) {
    var propiedades = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    for (var i = 0; i < propiedades.length; i++) {
      let fecha = new Date(propiedades[i].creado);
      let day = fecha.getDate();
      let month = fecha.getMonth() + 1;
      let year = fecha.getFullYear();

      if (month < 10) {
        propiedades[i].creado_date = `${day}-0${month}-${year}`;
      } else {
        propiedades[i].creado_date = `${day}-${month}-${year}`;
      }
    }
    propiedades = propiedades.filter((propiedad) => propiedad.visible == "si");
    GuardarPropiedades(propiedades);
    var propConFiltro = propiedades.filter(verificaFiltros);
    if (filtros) {
      $(`#${filtros[0]}`).prop("checked", true);
    }

    GuardarPropiedadesFiltro(propConFiltro);
  }

  //EFFECT COLLAPSIBLE
  useEffect(() => {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        $(".collapsible").removeClass("activa_filtro");
        $(this).addClass("activa_filtro");
        var content = this.nextElementSibling;

        if (content.style.display === "block") {
          content.style.display = "none";
          $(this).removeClass("activa_filtro");
        } else {
          $(".content").css("display", "none");
          content.style.display = "block";
        }
      });
    }
    // collapsible para precio

    $(document).click(function (e) {
      if (
        !$(e.target).is(".content") &&
        !$(e.target).is(".collapsible") &&
        !$(e.target).is(".abierto")
      ) {
        $(".content").hide();
        $(".collapsible").removeClass("activa_filtro");
      }
    });


    const agregaSahdow = () => {
      if (window.pageYOffset > 0) {
        document.querySelector("#filtro").style.boxShadow =
          "0 4px 2px -2px rgb(0 0 0 / 10%)";
      } else {
        document.querySelector("#filtro").style.boxShadow = "none";
      }
    };
    // Asigna boxshadow a filtros cuando se scrollea
    window.addEventListener("scroll", agregaSahdow);
    return () => {
      window.removeEventListener("scroll", agregaSahdow);
    };
  }, []);

  // EFFECT FILTROS
  useEffect(() => {
    var propConFiltro = propiedades.filter(verificaFiltros);
    if (ordenar == "Más recientes") {
      propConFiltro = propConFiltro.sort(
        (a, b) => a.creado_date - b.creado_date
      );
    }
    if (ordenar == "Mayor precio") {
      propConFiltro = propConFiltro.sort(function (a, b) {
        a = parseInt(a.precio);
        b = parseInt(b.precio);
        if (isNaN(b)) {
          return -1;
        } else {
          return b - a;
        }
      });
    }
    if (ordenar == "Menor precio") {
      propConFiltro = propConFiltro.sort(function (a, b) {
        a = parseInt(a.precio);
        b = parseInt(b.precio);
        if (isNaN(b)) {
          return -1;
        } else {
          return a - b;
        }
      });
    }

    GuardarPropiedadesFiltro(propConFiltro);
  }, [
    filtroOperacion,
    filtros,
    filtroAmbiente,
    filtroPrecio,
    ordenar,
    filtroMoneda,
  ]);

  // handle para checkbox
  const handleChange = (e) => {
    const id = e.target.id;
    const name = e.target.name;
    var checkboxValue = "";

    document.getElementById(id).addEventListener("change", (e) => {
      checkboxValue = e.target.checked ? "on" : "off";

      if (checkboxValue == "on") {
        if (name == "tipo") {
          guardarfiltros([...filtros, id]);
        } else if (name == "ambiente") {
          guardarFiltroAmbiente([...filtroAmbiente, id]);
        }
      } else if (checkboxValue == "off") {
        if (name == "tipo") {
          guardarfiltros(filtros.filter((filtro) => filtro !== id));
        } else if (name == "ambiente") {
          guardarFiltroAmbiente(
            filtroAmbiente.filter((filtro) => filtro !== id)
          );
        }
      }
    });
  };
  // handle para tipo operacion
  const guardaOperacion = (e) => {
    guardarFiltroOperacion(e.target.id);
    var w = window.innerWidth;
    if (w >= 768) {
      $(".content").hide();
    }
  };

  // handle para precio
  const guardaPrecio = (e) => {
    const nombre = e.target.name;
    let valor = parseInt(e.target.value, 10);
    if (isNaN(valor)) {
      valor = 0;
    }
    guardarFiltroPrecio({
      ...filtroPrecio,
      [e.target.name]: valor,
    });
  };

  const guardaMoneda = (e) => {
    guardarFiltroMoneda(e.target.value);
  };

  // Remueve filtros
  const remueveFiltro = (e) => {
    const id = e.target.id;
    const name = e.target.getAttribute("name");

    if (name == "tipo") {
      guardarfiltros(filtros.filter((filtro) => filtro !== id));
      $(`#${id}`).prop("checked", false);
    }
    if (name == "operacion") {
      guardarFiltroOperacion(undefined);
    }
    if (name == "ambiente") {
      guardarFiltroAmbiente(filtroAmbiente.filter((filtro) => filtro !== id));
      $(`#${id}`).prop("checked", false);
    }
    if (name == "moneda") {
      guardarFiltroMoneda("");
    }

    if (name == "precio") {
      guardarFiltroPrecio({ Desde: 0, Hasta: 0 });
      $(`.moneda`).prop("checked", false);
      $(`#precio_D`).val("");
      $(`#precio_H`).val("");
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <>
      <Layout>
        <FiltroMobile>
          <div
            className="ordernar"
            open={open_ordenar}
            onClick={() => setOpen_ordenar(!open_ordenar)}
          >
            <img src="/sort-ascending_claro.png"></img>
          </div>
          <div className="filtrar" open={open} onClick={() => setopen(!open)}>
            <img src="/filter_claro.png"></img>
          </div>
        </FiltroMobile>
        <ContenedorFiltros id="filtro" open={open}>
          <div className="cerrar">
            <img src="/right-arrow.png" onClick={() => setopen(!open)}></img>
            <h3>Filtrar por</h3>
          </div>
          <div className="contenedor selectorFiltro">
            {/* Operacion */}
            <Filtro>
              <button type="button" className="collapsible">
                Operación
              </button>
              <div className="content">
                <Box>
                  {/* <label> */}
                  <input
                    className="boton"
                    type="button"
                    id="Venta"
                    name="Venta"
                    value="Venta"
                    onClick={guardaOperacion}
                  ></input>
                </Box>
                <Box>
                  <input
                    className="boton"
                    type="button"
                    id="Alquiler"
                    name="Alquiler"
                    value="Alquiler"
                    onClick={guardaOperacion}
                  ></input>
                </Box>
              </div>
            </Filtro>
            {/* Tipo */}
            <Filtro>
              <button type="button" className="collapsible">
                Tipo de propiedad
              </button>
              <div className="content">
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="Casa"
                      name="tipo"
                      value="Casa"
                      onChange={handleChange}
                    ></input>
                    <span htmlFor="Casa">Casa</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="Quinta"
                      name="tipo"
                      value="Quinta"
                      onChange={handleChange}
                    ></input>
                    <span>Casa quinta</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="Campo"
                      name="tipo"
                      value="Campo"
                      onChange={handleChange}
                    ></input>
                    <span>Campo</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="Departamento"
                      name="tipo"
                      value="Departamento"
                      onChange={handleChange}
                    ></input>
                    <span>Departamento</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="Local"
                      name="tipo"
                      value="Local comercial"
                      onChange={handleChange}
                    ></input>
                    <span>Local comercial</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="Terreno"
                      name="tipo"
                      value="Terreno"
                      onChange={handleChange}
                    ></input>
                    <span>Terreno</span>
                  </label>
                </Box>
              </div>
            </Filtro>
            {/* Ambientes */}
            <Filtro>
              <button type="button" className="collapsible">
                Ambientes
              </button>
              <div className="content">
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="1"
                      name="ambiente"
                      value="1"
                      onChange={handleChange}
                    ></input>
                    <span htmlFor="1">1 Ambiente</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="2"
                      name="ambiente"
                      value="2"
                      onChange={handleChange}
                    ></input>
                    <span htmlFor="2">2 Ambiente</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="3"
                      name="ambiente"
                      value="3"
                      onChange={handleChange}
                    ></input>
                    <span htmlFor="3">3 Ambiente</span>
                  </label>
                </Box>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      id="4"
                      name="ambiente"
                      value="4"
                      onChange={handleChange}
                    ></input>
                    <span htmlFor="4">4 Ambiente</span>
                  </label>
                </Box>
              </div>
            </Filtro>
            {/* Precio */}
            <Filtro>
              <button type="button" className="collapsible">
                Precio
              </button>
              <div className="content">
                <div
                  css={css`
                    padding: 1rem;
                    label {
                      padding: 0 1rem;
                    }
                  `}
                >
                  <label className="abierto">
                    <input
                      className="moneda abierto"
                      type="radio"
                      name="moneda"
                      value="peso"
                      onChange={guardaMoneda}
                    />{" "}
                    Peso ($)
                  </label>
                  <label className="abierto">
                    <input
                      className="moneda abierto"
                      type="radio"
                      name="moneda"
                      value="dolar"
                      onChange={guardaMoneda}
                    />{" "}
                    Dolar (USD)
                  </label>
                </div>

                <div
                  css={css`
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    max-width: 100%;
                  `}
                >
                  <Box>
                    {/* Abierto es solo para mantener el collapsible abierto en la pestaña precio */}
                    <label className="abierto">
                      <input
                        className="abierto"
                        id="precio_D"
                        type="number"
                        name="Desde"
                        placeholder="Desde:"
                        onChange={guardaPrecio}
                      ></input>
                    </label>
                  </Box>
                  <Box>
                    <label className="abierto">
                      <input
                        className="abierto"
                        id="precio_H"
                        type="number"
                        name="Hasta"
                        placeholder="Hasta:"
                        onChange={guardaPrecio}
                      ></input>
                    </label>
                  </Box>
                </div>
              </div>
            </Filtro>
          </div>
          <Filtroplicado className="contenedor">
            {filtroOperacion && (
              <label
                id={filtroOperacion}
                name="operacion"
                onClick={remueveFiltro}
              >
                {filtroOperacion}
                <img
                  className="cancel"
                  src="/cancel.svg"
                  id={filtroOperacion}
                  name="operacion"
                  onClick={remueveFiltro}
                />
              </label>
            )}

            {filtros.length !== 0 &&
              filtros.map((filtro) => (
                <label id={filtro} name="tipo" onClick={remueveFiltro}>
                  {filtro}
                  <img
                    src="/cancel.svg"
                    id={filtro}
                    name="tipo"
                    onClick={remueveFiltro}
                    className="cancel"
                  />
                </label>
              ))}

            {filtroAmbiente.length !== 0 &&
              filtroAmbiente.map((ambiente) => (
                <label id={ambiente} name="ambiente" onClick={remueveFiltro}>
                  {ambiente} Ambiente
                  <img
                    src="/cancel.svg"
                    id={ambiente}
                    name="ambiente"
                    onClick={remueveFiltro}
                    className="cancel"
                  />
                </label>
              ))}
            {filtroMoneda && (
              <label
                id={filtroMoneda}
                name="moneda"
                onClick={remueveFiltro}
              >
                {filtroMoneda.charAt(0).toUpperCase() + filtroMoneda.slice(1)}
                <img
                  className="cancel"
                  src="/cancel.svg"
                  id={filtroMoneda}
                  name="moneda"
                  onClick={remueveFiltro}
                />
              </label>
            )}
            {(filtroPrecio.Desde !== 0 || filtroPrecio.Hasta !== 0) && (
              <label id="precio" name="precio" onClick={remueveFiltro}>
                ${numberWithCommas(filtroPrecio.Desde)} a $
                {numberWithCommas(filtroPrecio.Hasta)}
                <img
                  src="/cancel.svg"
                  id="precio"
                  name="precio"
                  onClick={remueveFiltro}
                  className="cancel"
                />
              </label>
            )}
          </Filtroplicado>
        </ContenedorFiltros>

        <div className="classPadding contenedor">
          <LayoutPropiedades
            propiedadesFiltro={propiedadesFiltro}
            ordenar={ordenar}
            guardarOrdenar={guardarOrdenar}
            open_ordenar={open_ordenar}
            setOpen_ordenar={setOpen_ordenar}
          />

        </div>
      </Layout>
    </>
  );
}
