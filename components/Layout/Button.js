import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const ContenedorButton = styled.div`
  background-color: var(--rojo);
  padding: 0.5rem 4rem;
  border-radius: 5px;
  img {
    transition-duration: 0.5s;
  }
  :hover {
    img {
      transform: scale(1.2);
    }
    cursor: pointer;
  }
  @media (min-width: 768px) {
    padding: 1rem 4rem;
    border-radius: 0px 5px 5px 0;
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
