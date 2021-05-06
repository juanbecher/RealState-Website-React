import React from 'react';

const DetallePropiedad = (propiedad) => {

    const {tipo, operacion, dormitorio, banios, ubicacion, creado, urlimagen, descripcion} = propiedad

    return ( 
        <div>
            <h2>
                Detalle propiedad
            </h2>
        </div>
     );
}
 
export default DetallePropiedad;