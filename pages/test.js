import $ from "jquery";
import styled from "@emotion/styled";
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

// interface ItemType {
//   id: number;
//   name: string;
// }


const test = () => {
  
    const [state, setState] = useState([
        { id: 1, name: "shrek", url:"2", nombre:"dale" },
        { id: 2, name: "fiona",url:"222", nombre:"dale2" },
      ]);
      console.log(state)
  return (
    <ReactSortable list={state} setList={setState}>
    {state.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </ReactSortable>
);
    }

export default test;
