
import styled from "@emotion/styled";
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

const Contenedor = styled.div`
    .imagenes{
        margin:1rem;
        padding:1rem;
        background-color:grey;
    }
`;

const SortableImage = ({ urlimagen_2, setURL }) => {
  console.log(urlimagen_2);
  return (
    <Contenedor>
    <ReactSortable list={urlimagen_2} setList={setURL}>
      
        {urlimagen_2.map((item) => (
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
