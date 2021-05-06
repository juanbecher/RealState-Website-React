import React from 'react';
import styled from '@emotion/styled';
import Link from './ActiveLink';


const Nav = styled.nav`
    /* display:none; */
    z-index:2;
    /* background-color: var(--rosa); */
    background-color: white;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    width: 100%;
    padding-top: 5rem;
    transition: transform 0.3s ease-in-out;
    box-shadow: inset 0px 2px 15px 0 #00000047;
    
    img{
        width:5rem;
    }
    a{
        margin: 0 auto;
        width:110px;
        display: block;
        padding: 0 10px;
        /* color: var(--negro); */
        color: black;
        /* font-size: 2.2rem; */
        text-align: center;
        line-height: 4;
        position: relative;
        :hover{
            color: var(--rojo);
        }
        &:before{
            content: "";
            display:block;
            width:0;
            height: 3px;
            background: var(--rojo);
            position:absolute;
            left:50%;
            bottom:0;
            transition: all .5s;
        }
        &:hover:before{
            left:0;
            width:100%;
        }
    }
    .active{
            color:var(--rojo);
            /* border-bottom: 3px solid var(--rojo) */
            &:before{
            content: "";
            display:block;
            width:100%;
            height: 3px;
            background: var(--rojo);
            position:absolute;
            left:0%;
            bottom:0;
            }
    }
    @media(min-width: 768px){
      box-shadow:none;
        align-items:center;
        display:flex;
        background-color: transparent;
        position: static;
        width: auto;
        margin-top:0;
        padding-top: 0;
        transform:none;
        a{
          color:white;
        }
    }
`

const Navegacion = ({open}) => {
    return (
        <>
        <Nav open={open}>
            <Link href="/" activeClassName="active">
              <a>Home</a>
            </Link>
            <Link href="/propiedades" activeClassName="active">
              <a>Propiedades</a>
            </Link>
            <Link href="/nosotros" activeClassName="active">
              <a>Nosotros</a>
            </Link>
            {/* <Link href="/tasaciones" activeClassName="active">
              <a>Tasaciones</a>
            </Link> */}
            <Link href="/sucursales" activeClassName="active">
              <a>Sucursales</a>
            </Link>
        </Nav>
        </>
     );
}
 
export default Navegacion;