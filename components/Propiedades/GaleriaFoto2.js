// import React from 'react';
import PhotoSwipeWrapper from './PhotoSwipeWrapper';
import React, { useState, Fragment, useEffect } from 'react';
import styled from '@emotion/styled'
import GaleriaFoto from '../GaleriaFoto';
import $ from 'jquery';

const Contenedor = styled.div`
/* display:grid;
grid-template-columns: 2fr 1fr; */

/* display:block; */
/* max-height: 500px; */
margin: 0 auto;

.imagen{
  box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);

    padding:0.5rem;
    visibility:hidden;
    img{
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    
    }
}
div:nth-child(-n+3){
    cursor: pointer;
    visibility: visible;
    color:red;
}
div:nth-child(1){
  position:relative;
  left:0;
}
div:nth-child(2){
  position:absolute;
  left:600px;
  visibility: hidden;
  color:green;
  width:400px;
  height: 250px;
  display:none;

}
div:nth-child(3){
  position:absolute;
  left:600px;
  top:250px;
  visibility: hidden;
  color:pink;
  width:400px;
  height: 250px;
  display:none;
}
.pswp__img {
    max-width: none;
    object-fit: contain !important;
}
@media (min-width: 768px){
  width:1000px;
  height: 500px;
  div:nth-child(1){
    position:absolute;
  width:600px;
  height: 500px;
  }
  div:nth-child(2), div:nth-child(3){
    visibility: visible;
    display:block;
  }
}
`


const GaleriaFoto2 = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // const items = [
  //   {
  //     src: '/dpto.jpg',
  //     w: 800,
  //     h: 600
  //   },
  //   {
  //     src: '/dpto1.jpg',
  //     w: 800,
  //     h: 600
  //   }
  //   ,
  //   {
  //     src: '/dpto2.jpg',
  //     w: 800,
  //     h: 600
  //   }
  //   ,
  //   {
  //     src: '/dpto3.jpg',
  //     w: 800,
  //     h: 600
  //   }
  //   ,
  //   {
  //     src: '/prueba.jpg',
  //     w: 800,
  //     h: 600
  //   }
  // ];

  const items = props.imagenes;
  
  // console.log(items);

  const handleOpen = index => {
    setIsOpen(true);
    setIndex(index);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Contenedor>
        {items.map((item, i) => (
            <div className="imagen"
            key={item.id}
            onClick={() => {
              handleOpen(i);
            }}
          >   
          {/* <span>{item.src}</span> */}
              <img src={item.src}></img>
          </div>
        ))}
      </Contenedor>
      <PhotoSwipeWrapper isOpen={isOpen} index={index} items={items} onClose={handleClose} />
    </Fragment>
  );
}
 
export default GaleriaFoto2;
