import React from 'react';
import styled from "@emotion/styled";

const Contenedor = styled.div`
color:red;
    width: 40%;
    margin: 5rem auto;
    box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
    h2{
        text-align: center;
        padding: 4rem 2rem;
    }
`

const Error404 = () => {
    return (
        <Contenedor>
            <h2>Propiedad no existente</h2>
        </Contenedor>
     );
}
 
export default Error404;