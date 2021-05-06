import React, { useEffect } from "react";
import styled from "@emotion/styled";
import $ from "jquery";
const Contenedor = styled.div`
  text-align: center;
  margin: 2rem 0 0 0;
  ul {
    display: inline-block;
    padding: 0;
    margin: 20px 0;
    /* border-radius: 12px; */
    /* :first-child{
        background-color: red;
    } */
  }
  li {
    display: inline;
    cursor: pointer;
    /* :first-child a {
      background-color: #eaeaea;
    } */
  }
  a {
    margin: 0 7px;
    border-radius: 20px;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: black;
    text-decoration: none;
    /* background-color: #fff; */
    border: 1px solid #ddd;
    :hover {
      background-color: #eaeaea;
    }
  }
  .activa {
    background-color: #eaeaea;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, currentPage,paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    
    // Agregaa clase activa
    $(document).ready(function () {
    
    // console.log(`#${currentPage}`)
    var paginas = $(".pagina")[currentPage - 1];
    $(".pagina").removeClass("activa");
    $(paginas).addClass("activa");
    
    
    });
  }, [currentPage]);

  return (
    <Contenedor>
      <nav>
        <ul>
          <li>
            <a aria-label="Previous" onClick={() => paginate("previous", pageNumbers.length)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li key="1">
              <a className="pagina" onClick={() => paginate("1",pageNumbers.length)}>
                1
              </a>
            </li>
          {pageNumbers.slice(1,pageNumbers.length).map((number) => (
            <li key={number}>
              <a className="pagina" onClick={() => paginate(number,pageNumbers.length)}>
                {number}
              </a>
            </li>
          ))}
          <li>
            <a aria-label="Next" onClick={() => paginate("next",pageNumbers.length)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </Contenedor>
  );
};

export default Pagination;
