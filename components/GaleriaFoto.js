import React, {useRef} from "react";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import styled from '@emotion/styled';
import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery'

const Contenedor = styled.div`
display:flex;
  width:1000px; 
  justify-content:space-between;
  .imagen{
    flex-basis: calc(50%)
  }
`

const GaleriaFoto = () => {

    const layoutRef = useRef()
    const options = {
        bgOpacity: 0.001
    }
  return (
    
    <>
    <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault} options={options}>
        <Item
        original="/dpto.jpg"
        //   thumbnail="https://placekitten.com/80/60?image=1"
        width="1024"
        height="768"
      >
        {({ ref, open }) => <img ref={ref} onClick={open} src="/dpto.jpg" />}
        </Item>
      <Item
        original="/dpto1.jpg"
        //   thumbnail="https://placekitten.com/80/60?image=2"
        width="1024"
        height="768"
      >
        {({ ref, open }) => <img ref={ref} onClick={open} src="/dpto1.jpg" />}
      </Item>
      <Item
        original="/dpto1.jpg"
        //   thumbnail="https://placekitten.com/80/60?image=2"
        width="1024"
        height="768"
      >
        {({ ref, open }) => <img ref={ref} onClick={open} src="/dpto1.jpg" />}
      </Item>
      <Item
        // original="/dpto1.jpg"
        //   thumbnail="https://placekitten.com/80/60?image=2"
        width="1024"
        height="768"
      >
        {({ ref, open }) => <img ref={ref} onClick={open} src="/dpto1.jpg" />}
      </Item>
    </CustomGallery>

    <DefaultLayout
    shareButton={false}
    fullscreenButton={false}
    zoomButton={false}
    ref={layoutRef}
  />
  </>
  );
};

export default GaleriaFoto;
