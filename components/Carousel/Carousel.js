import React, { Component } from "react";
import Slider from "react-slick";
import styled from '@emotion/styled';
import Tarjeta from '../Propiedades/Tarjeta'

const ContenedorCarousel = styled.div`
  padding:4rem 0rem;
  padding-bottom:6rem;
  .slick-prev:before, .slick-next:before {
    font-size: 25px;
    color:black !important;
  }
  .slick-list {
    margin: 0 27px;
  }
  

  @media (min-width: 768px) {
    padding:4rem;
    padding-bottom:6rem;
  }
`
const ContenedorTarjeta = styled.div`
height: 370px;
max-width: 300px;
padding:1rem;
@media (min-width: 768px) {
  padding:0rem;
  }

`;
const Carousel = (props) => {
  const settings = {
    dots:true,
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 550,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ],
    afterChange: function(index) {
      // console.log(
      //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      // );
    }
  };
  const propiedades = props.propiedades;

  return (
    <ContenedorCarousel>
      <Slider {...settings}>
      
            {propiedades.map((propiedad) => (
            <ContenedorTarjeta key={propiedad.id}>
              <Tarjeta key={propiedad.id} propiedad={propiedad} />
            </ContenedorTarjeta>
            
          ))}
      
      
        
      </Slider>
    </ContenedorCarousel>
  );
}
 
export default Carousel;
