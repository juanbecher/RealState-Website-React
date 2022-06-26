import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import { css } from "@emotion/react";

const Contenedor = styled.div`
  text-align: center;
  font-family:'Inter', sans-serif;
`;
const Presentacion = styled.div`
  .principal{
  color:black;
  max-width: 95%;
  margin: 0rem auto;
  padding:2rem 0;
  display:flex;
  flex-direction:column;
  }
  
  img {
    margin: auto;
    object-position: center;
    border-radius: 166px;
    object-fit: cover;
    width: 280px;
    height: 280px;
}
h2{
  margin-bottom: 1rem;
}
div{
  margin: auto 0;
}
@media (min-width: 768px){
  .principal{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
  
  max-width: 800px;
  }
}
`;

const Valor = styled.div`
  padding: 7rem 0;
  transition-duration: .1s;
  h2{
    margin-bottom: 1rem;
  }
  .fila{
    margin: 0 auto;
    max-width: 95%;
    display: flex;
    flex-direction:column;
    text-align: center;
  }
  .reverse{
    flex-direction:column-reverse;
  }

  img {
    margin: 0 auto;
    max-width: 100px;
  }
  p {
    margin: auto 0;
  }

  :hover{
    transform: scale(1.02)
  }

  @media (min-width: 768px){
    .fila{
    max-width: 800px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5rem;
  }
  }
`;

export default function Nosotros() {
  return (
    <Layout>
      <div className="classPadding">
        <Contenedor>
          <Presentacion>
            <div className="principal">
            <img src="/me_entrada2.jpg"></img>
            <div>
              <h2>¿Quiénes somos ?</h2>
              <p>
                Somos una empresa que brinda servicios y asesoramiento en la
                venta, alquiler, tasaciones de inmuebles y administración
                de propiedades. Años de
                trayectoria avalan nuestra calidad de desempeño y
                responsabilidad en cada solución inmobiliaria.
              </p>
            </div>
            </div>
            
          </Presentacion>
          <Valor
            css={css`
              background-color: #e4e4e4;
              
            `}
          >
            <div className="fila reverse">
              <div>
                <h2>Mas de 30 años de experiencia</h2>
                <p>
                  Desde hace 30 años, nos dedicamos a la gestión del mercado
                  inmobiliario gracias a la confianza que depositan nuestros
                  clientes día a día.
                </p>
              </div>

              <img src="./future.png"></img>
            </div>
          </Valor>
          <Valor>
            <div className="fila">
              <img src="./target.png"></img>
              <div>
                <h2>Atención personalizada</h2>
                <p>
                  Nos orientamos a ofrecer un servicio de atención personalizada
                  adecuado a las necesidades de cada cliente, escuchando sus
                  inquietudes y otorgando la mejor solución ante sus
                  solicitudes.
                </p>
              </div>
            </div>
          </Valor>
          <Valor
            css={css`
              background-color: #e4e4e4;
            `}
          >
            <div className="fila reverse">
              <div>
                <h2>Mejora continua</h2>
                <p>
                  Con idoneidad, honestidad, seguridad y compromiso (valores con
                  los que se identifican), nos esforzamos por mejorar
                  diariamente frente a los desafíos que plantea el mercado
                  inmobiliario en beneficio de nuestros clientes.
                </p>
              </div>

              <img src="./improve.png"></img>
            </div>
          </Valor>
        </Contenedor>
      </div>
    </Layout>
  );
}
