
import '../public/static/globals.css'
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from '../hooks/useAutenticacion'
import React,{useState} from 'react';

function MyApp({ Component, pageProps }) {

  const usuario = useAutenticacion();
  const [filtroOperacion, guardarFiltroOperacion] = useState();
  const [filtros, guardarfiltros] = useState([]);
  
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
        filtroOperacion,
        guardarFiltroOperacion,
        filtros,
        guardarfiltros
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
