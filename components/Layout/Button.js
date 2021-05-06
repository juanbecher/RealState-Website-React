import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const ContenedorButton = styled.div`
  background-color: var(--rojo);
  padding: 1rem 4rem;
  border-radius: 5px;
  /* width: 100%;
    height: 65px; */
  img {
    transition-duration: 0.5s;
  }
  :hover {
    img {
      transform: scale(1.2);
    }
    cursor: pointer;
  }
`;

const Button = ({ filtro_home }) => {
  return (
    <Link href="/propiedades">
    <ContenedorButton>

        <img src="/loupe.png" alt="Buscar"></img>

    </ContenedorButton>
    </Link>
  );
};

export default Button;
