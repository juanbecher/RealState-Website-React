// import React from 'react';
import PhotoSwipeWrapper from '../components/PhotoSwipeWrapper';
import React, { useState, Fragment } from 'react';
import styled from '@emotion/styled'

const Contenedor = styled.div`
/* display:grid;
grid-template-columns: 2fr 1fr; */
width:1000px;
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
    visibility: visible;
    color:red;
}
div:nth-child(1){
  position:absolute;
  top:0;
  left:0;
  width:600px;
  height: 500px;
}
div:nth-child(2){
  position:absolute;
  left:600px;
  visibility: visible;
  color:green;
  width:400px;
  height: 250px;

}
div:nth-child(3){
  position:absolute;
  left:600px;
  top:250px;
  visibility: visible;
  color:pink;
  width:400px;
  height: 250px;


}
`


const test2 = () => {
    const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const items = [
    {
      src: '/dpto1.jpg',
      w: 1200,
      h: 900
    },
    {
      src: 'dpto.jpg',
      w: 1200,
      h: 900
    }
    ,
    {
      src: 'dpto.jpg',
      w: 1200,
      h: 900
    }
  ];

  const muestraFotos = () => {

    for (let i = 0; i < 2; i++) {
      const element = array[i];
      
    }
  }

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
          <>
          {/* {({i} < 2) ? <div className="imagen"
            key={i}
            onClick={() => {
              handleOpen(i);
            }}
          >
              <img src={item.src}></img>
          </div> 
          :
          <div className="imagen"
            key={i}
            onClick={() => {
              handleOpen(i);
            }}
          >
              <span>imagencargada {i}</span>
          </div>

          } */}

            <div className="imagen"
            key={i}
            onClick={() => {
              handleOpen(i);
            }}
          >   
          {/* <span>{i}</span> */}
              <img src={item.src}></img>
          </div>
            
            
          </>
        ))}
      </Contenedor>
      <PhotoSwipeWrapper isOpen={isOpen} index={index} items={items} onClose={handleClose} />
    </Fragment>
  );
}
 
export default test2;
