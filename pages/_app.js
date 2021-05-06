import "../styles/globals.css";
// import "../styles/bootstrap-theme.min.css";
// import "../styles/bootstrap.min.css";
import "slick-carousel/slick/_slick.css";
import "slick-carousel/slick/_slick-theme.css";
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from '../hooks/useAutenticacion'
import React,{useState} from 'react';

function MyApp({ Component, pageProps }) {
  // return 
  const usuario = useAutenticacion();
  // const [filtroHome, setfiltroHome] = useState({
  //   operacion:"",
  //   tipo:""
  // })
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
