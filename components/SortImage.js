import React, {Component,useState} from 'react';
import {render} from 'react-dom';
import styled from "@emotion/styled";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { css } from "@emotion/react";

const Contenedor = styled.div`
    ul{
        display:flex;
        flex-wrap:wrap;
        list-style:none;
        margin:0;
        padding:0;
    }
    .imagen{
        background-color:white;
        padding:1rem;
    }
    img{
        margin: 1rem 0;
        margin-right:1rem;
        /* width: 150px;
        height: 150px; */
        object-fit:cover;
        object-position:center;
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    }
`

const SortableItem = SortableElement(({value}) =><li><img src={value} width="125px" height="125px"></img></li> );

const SortableList = SortableContainer((url) => {
    console.log("sortable container");
    const url_show = url.items;
    console.log(url_show);
    // console.log(url_show[0].value);

  return (
    <ul css={css`list-style:none;`}>
      {url_show.map((value, index) => (
        <SortableItem key={`item-${value.preview}`} index={index} value={value.preview} />
      ))}
    </ul>
  );
});

const SortImage = ({url,seturl}) => {
    // const [items, setitems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])
    const onSortEnd = ({oldIndex, newIndex}) => {
        seturl(arrayMove(url,oldIndex,newIndex))
        // setitems(({items}) => ({
        //   items: arrayMove(items, oldIndex, newIndex),
        // }));
      };
      console.log(url)
    return ( 
        <Contenedor>
            <SortableList items={url} onSortEnd={onSortEnd} axis={"xy"} />
        </Contenedor>
        
     );
}
 
export default SortImage;