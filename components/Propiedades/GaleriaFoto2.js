// import React from 'react';
import PhotoSwipeWrapper from "./PhotoSwipeWrapper";
import React, { useState, Fragment, useEffect } from "react";
import styled from "@emotion/styled";
import GaleriaFoto from "../GaleriaFoto";
import $ from "jquery";
import ReactPlayer from "react-player"

const Contenedor = styled.div`
  /* margin: 0 auto; */
`;
const ContenedorImagen = styled.div`
  /* display:grid;
grid-template-columns: 2fr 1fr; */

  /* display: none; */
  /* max-height: 500px; */
  margin: 0 auto;

  .imagen {
    box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);

    padding: 0.5rem;
    visibility: hidden;
    display:none;
    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
  }
  div:nth-of-type(-n + 3) {
    cursor: pointer;
    visibility: visible;
    color: red;
  }
  div:nth-of-type(1) {
    display:block;
    position: relative;
    left: 0;
  }
  div:nth-of-type(2) {
    position: absolute;
    left: 600px;
    visibility: hidden;
    color: green;
    width: 400px;
    height: 250px;
    display: none;
  }
  div:nth-of-type(3) {
    position: absolute;
    left: 600px;
    top: 303px;
    visibility: hidden;
    color: pink;
    width: 400px;
    height: 250px;
    display: none;
  }
  .pswp__img {
    max-width: none;
    object-fit: contain !important;
  }
  @media (min-width: 768px) {
    width: 1000px;
    height: 500px;
    div:nth-of-type(1) {
      position: absolute;
      width: 600px;
      height: 500px;
    }
    div:nth-of-type(2),
    div:nth-of-type(3) {
      visibility: visible;
      display: block;
    }
  }
`;

const ContenedorVideo = styled.div`
  /* display: flex;
  iframe {
    margin: 0 auto;
    height: 500px;
    width: 100%; */
    /* width:100%; */
  /* } */

  /* width:100%;
  height: 500px;
  max-height:100%; */
  display:none;
  .video {
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:500px;
    iframe {
    left:0;
    top:0;
    height: 80%;
    width: 80%;
    position:absolute;
  } 
  }

  .player-wrapper {
  position: relative;
  height: auto;
  max-height: 500px;
  min-height:500px;
  display:flex
  /* padding-top: 56.25% Player ratio: 100 / (1280 / 720) */
}

.react-player {
  max-width: 100%;
  margin: auto;
  position: relative;
  top: 0;
  left: 0;
}
`;

const ContenedorTabs = styled.div`
  display: flex;
  justify-content:center;
  .tab {
    
    text-align: center;
    width: 110px;
    padding: 1.5rem 2.5rem;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  .selected {
    color: gray;
    border-top: 2px solid var(--bordo);
    /* box-shadow: inset 0px 2px 15px 0 #00000047; */
  }
  .desactivar{
    color: lightgray;
    &:hover {
      cursor: default !important;
    }
  }

  @media (min-width: 768px){
    justify-content:normal;
  }
`;

const GaleriaFoto2 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  // const [urlVideo, seturlVideo] = useState();
  // const [cambia, setcambia] = useState(initialState)
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
  //
  //   }
  //   ,
  //   {
  //     src: '/prueba.jpg',
  //     w: 800,
  //     h: 600
  //   }
  // ];
  // const video = {src: "https://www.facebook.com/plugins/video.php?height=317&href=https%3A%2F%2Fwww.facebook.com%2Fmonicaemilio.bienesraices%2Fvideos%2F2795157947367132%2F&show_text=false&width=560",
  //     w: 800,
  //     h: 600};
  var items = props.imagenes;
  var video = props.video;
  console.log(video);
  // items.push(video);
  // console.log(items);
  // const url_video = `<iframe src="https://www.facebook.com/plugins/video.php?height=317&href=https%3A%2F%2Fwww.facebook.com%2Fmonicaemilio.bienesraices%2Fvideos%2F2795157947367132%2F&show_text=false&width=560" width="560" height="317" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`;
  // const url_video = `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fmonicaemilio.bienesraices%2Fvideos%2F1161278917571516%2F&show_text=false&width=476" width="476" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`
  // function getUrlVideo() {

  // // console.log(vide);
  // // console.log(vide.indexOf("src="));

  // // console.log(vide.substring(vide.indexOf("src=")+5, vide.indexOf(`"`,vide.indexOf("src=")+5)))
  //   const src = url_video.substring(url_video.indexOf("src=")+5, url_video.indexOf(`"`,url_video.indexOf("src=")+5))
  //   return src

  // }
  const handleOpen = (index) => {
    setIsOpen(true);
    setIndex(index);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!video) {
      $('#video').addClass("desactivar");
    }else{
      console.log("remover class");
      $('#video').removeClass("desactivar");
    }
  }, [video]);
  return (
    <Fragment>
      <ContenedorTabs>
        <div
          // open={open_ordenar}
          id="imagen"
          className="tab selected"
          onClick={() => {
            $(".video-tab").hide();
            $("#video").removeClass("selected");
            $(".imagen-tab").show();
            $("#imagen").addClass("selected");
          }}
        >
          Imagenes
        </div>
        <div
          id="video"
          className="tab"
          // open={open}
          onClick={() => {
            if (video) {
              $(".imagen-tab").hide();
            $("#imagen").removeClass("selected");
            $(".video-tab").show();
            $("#video").addClass("selected");
            }
            
          }}
        >
          Video
        </div>
      </ContenedorTabs>
      <Contenedor>
        <ContenedorVideo className="video-tab">
          {video && (
            // <div className="video">
            //   <iframe
            //   // src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fmonicaemilio.bienesraices%2Fvideos%2F2796707273878866%2F&show_text=false&width=476"
            //   src={urlVideo}
            //   width="560"
            //   height="500"
            //   scrolling="no"
            //   frameborder="0"
            //   allowfullscreen="true"
            //   allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            // ></iframe>
            // </div>
    //         <div>
    //   <ReactPlayer
    //     url="https://www.facebook.com/1555964491286490/videos/1161278917571516"
    //     controls
    //     height="auto"
    //     width="500px"
    //     // width="700px"
    //   />
    // </div>
    <div className='player-wrapper'>
    <ReactPlayer
      className='react-player'
      // url='https://www.facebook.com/1555964491286490/videos/2795157947367132'
      url ={video}
      width='auto'
      height='auto'
    />
  </div>
        
          )}
        </ContenedorVideo>

        <ContenedorImagen className="imagen-tab">
          {items.map((item, i) => (
            <div
              className="imagen"
              key={item.id}
              onClick={() => {
                handleOpen(i);
              }}
            >
              {/* <span>{item.src}</span> */}
              <img src={item.src}></img>
            </div>
          ))}
        </ContenedorImagen>
      </Contenedor>
      <PhotoSwipeWrapper
        isOpen={isOpen}
        index={index}
        items={items}
        onClose={handleClose}
      />
    </Fragment>
  );
};

export default GaleriaFoto2;
