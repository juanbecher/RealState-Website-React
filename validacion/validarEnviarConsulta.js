export default function validarEnviarConsulta(valores) {

    let errores = {};

    if(!valores.nombre) {
        errores.nombre = "Ingresar nombre y apellido";
    } 

    // validar el tipo
    if(!valores.email) {
        errores.email = "Ingresar email";
    } 

    // validar el dormitorio
    if(!valores.telefono) {
        errores.telefono = "Ingresar teléfono";
    }

    if(!valores.descripcion) {
        errores.descripcion = "Ingresar comentario";
    }

    return errores;
}