import React, {createContext, useState} from 'react';

let FiltroContext = createContext(null);

export function cargaContext  (filtros) {
    console.log(filtros);
    // if(filtros)
    // FiltroContext = createContext(filtros);
}

export default FiltroContext;