import React,{createContext} from 'react';

const FiltroContext = createContext({
    operacion: "",
    tipo: ""
});

export default FiltroContext;