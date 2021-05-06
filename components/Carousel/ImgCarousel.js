import React, { Component } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import Link from "../Layout/ActiveLink";
const Arrows = styled.div`
  .slick-prev {
    left: 30px;
    z-index: 10;
  }
  .slick-next {
    right: 30px;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
    opacity: 0.95;
    color: rgb(255 255 255);
  }
  .slick-dots li button:before {
    opacity: 0.65;
    color: #fbfbfb;
  }
  .slick-dots li.slick-active button:before {
    opacity: 1.75;
    color: white;
  }
  .slick-dots {
    bottom: 20px;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
    opacity: 0;
    transition: 0.5s all;
  }
  &:hover {
    .slick-prev,
    .slick-next {
      opacity: 1;
    }
  }
`;
const ContenedorImagen = styled.div`
  height: 198px;
  max-width: 280px;
`;
// import { baseUrl } from "./config";
const ImgCarousel = ({ urlimagen, id }) => {
  const settings = {
    dots: true,
    fade: true,
    swipeToSlide: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Arrows>
      {/* <h2>Fade</h2> */}
      <Slider {...settings}>
        {/* <div>
        <img src="/images.png" alt="Logo"></img>
        </div>
        <div>
        <img src="/images.png" alt="Logo"></img>
        </div>
        <div>
        <img src="/images.png" alt="Logo"></img>
        </div> */}
        {urlimagen.map((imagen) => (
          
            <ContenedorImagen>
              <Link href="/propiedad/[id]" as={`/propiedad/${id}`}>
              <a target="_blank">
                <img src={imagen} alt="Imagen"></img>
              </a>
              </Link>
            </ContenedorImagen>
          

          //   <a target="_blank">
          //   <img src={imagen} alt="Imagen"></img>
          // </a>
        ))}
      </Slider>
    </Arrows>
  );
};

export default ImgCarousel;

// export default class Fade extends Component {
//   render() {

//   }
// }
