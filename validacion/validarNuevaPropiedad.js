export default function validarNuevaPropiedad(valores) {

    let errores = {};
    console.log(valores);
    if(!valores.propiedad) {
        errores.propiedad = "Seleccione propiedad";
    } 

    // validar el tipo
    if(valores.propiedad != "Emprendimiento"){
        if(!valores.tipo) {
            errores.tipo = "Seleccione un tipo de propiedad";
        }
    }
    

    // validar el dormitorio
    if (valores.tipo != "Local" & valores.tipo != "Terreno" & valores.tipo != "Campo" 
    & valores.propiedad != "Emprendimiento") {
        if(!valores.ambiente) {
            errores.ambiente = "Seleccione cantidad de dormitorios";
        }
    }
    
    if (valores.tipo != "Local" & valores.tipo != "Terreno" & valores.tipo != "Campo"
    & valores.propiedad != "Emprendimiento") {
        if(!valores.banio) {
            errores.banio = "Seleccione cantidad de baños";
        }
    }

    if(!valores.operacion) {
        errores.operacion = "Seleccione tipo de operacion";
    }

    // if(!valores.ubicacion) {
    //     errores.ubicacion = "Ingrese ubicacion";
    // }

    if(!valores.descripcion) {
        errores.descripcion = "Ingrese descripcion";
    }

    return errores;
}