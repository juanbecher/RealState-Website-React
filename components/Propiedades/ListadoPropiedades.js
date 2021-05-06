import React, { useState } from "react";
import styled from "@emotion/styled";
import Tarjeta from "./Tarjeta";
import { css } from "@emotion/react";
import Pagination from "./Pagination";

// const Contenedor = styled.div`
//     background-color: #fff;
//     margin-top: 1rem;
// `;
// const ContenedorPropiedades = styled.div`
  
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   column-gap: 2rem;
//   row-gap: 4rem;
// `;

const ListadoPropiedades = ({ propiedadesFiltro}) => {
  // console.log(propiedadesOrdenadas)
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(5);

  // // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = propiedadesFiltro.slice(
  //   indexOfFirstPost,
  //   indexOfLastPost
  // );
  // // setIndicesPagina([{indexOfLastPost},{indexOfFirstPost}])
  // // Change page
  // const paginate = (pageNumber, totalPages) => {
  //   if (pageNumber == "previous") {
  //       const pag = currentPage - 1
  //       if (pag < 1) {
  //           setCurrentPage(1)
  //       }else{
  //           setCurrentPage(pag)
  //       }
  //   }else if (pageNumber == "next") {
  //       const pag = currentPage + 1;
  //       if (pag > totalPages) {
  //           setCurrentPage(totalPages)
  //       }else{
  //           setCurrentPage(pag)
  //       }
  //   }else{
  //       setCurrentPage(pageNumber)
  //   }
    
  // };
  return (
    <p></p>
    // <Contenedor>
    //     {propiedadesFiltro.length == 0 && (
    //       <div
    //         css={css`
    //           margin: 6rem auto;
    //           text-align: center;
    //           p {
    //             margin-top: 1rem;
    //             color: var(--gris2);
    //           }
    //         `}
    //       >
    //         <img src="/not-found.png"></img>
    //         <p>
    //           Lo sentimos. No se encontraron propiedades con esas
    //           caracteristicas.
    //         </p>
    //       </div>
    //     )}
    //   <ContenedorPropiedades className="container">
    //     {currentPosts.map((propiedad) => (
    //       <Tarjeta key={propiedad.id} propiedad={propiedad} />
    //       // <div><p>Tarjeta</p></div>
    //     ))}
    //   </ContenedorPropiedades>
    //   <Pagination
    //       postsPerPage={postsPerPage}
    //       totalPosts={propiedadesFiltro.length}
    //       currentPage={currentPage}
    //       paginate={paginate}
    //     />
    // </Contenedor>
  );
};

export default ListadoPropiedades;
