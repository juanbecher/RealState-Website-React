import React, {createContext, useState} from 'react';

let FiltroContext = createContext(null);

export function cargaContext  (filtros) {
    console.log(filtros);
}

export default FiltroContext;