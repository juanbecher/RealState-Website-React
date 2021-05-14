import $ from "jquery";
import styled from "@emotion/styled";
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

const Contenedor = styled.div`
    .contenedor{
        /* display:flex; */
    }
    
    .imagenes{
        margin:1rem;
        padding:1rem;
        background-color:grey;
    }
`;

const SortableImage = ({ urlimagen_2, setURL }) => {
  // const [state, setState] = useState([
  //     { id: 1, name: "shrek" },
  //     { id: 2, name: "fiona" },
  //   ]);
    // const [state, setState] = useState(urlimagen_2);
    // console.log(state)
    // console.log(file);

  // function updateState(ordenados) {
  //   console.log(ordenados);
  //   console.log(ordenados.length);
  //   if (ordenados.length != 0) {
  //     setURL(ordenados);
  //   }else{
  //     setURL(urlimagen_2);
  //   }
  // }

  // console.log("file entrando");
  console.log(urlimagen_2);
  return (
    <Contenedor>
    <ReactSortable list={urlimagen_2} setList={setURL}>
      
        {urlimagen_2.map((item) => (
          // <div className="imagenes" key={item.nombre}>{item.name}{item.nombre}</div>
          <div>
          <p>imagen</p>
          <img src={item.url} key={item.url}></img>
          </div>
        ))}
      
    </ReactSortable>
    </Contenedor>
  );
};

export default SortableImage;
