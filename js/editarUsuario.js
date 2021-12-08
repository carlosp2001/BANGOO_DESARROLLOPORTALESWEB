//Variables globales
const registerUsers = [];
const vnombre = document.getElementById('nombre');
const vusuario = document.getElementById('usuario');
const vcorreo = document.getElementById('correo');
const vcontrasena = document.getElementById('contrasena');
const vcontrasenaV = document.getElementById('contrasenaV');
const vfechaNacimiento = document.getElementById('fechaNacimiento');
const vbtnEditar = document.getElementById('btnEditar');
const vbtnGuardar = document.getElementById('btnGuardar');
const vbtnEliminar = document.getElementById('btnEliminar');

//Carga los datos del usuario activo
function cargarDatos(){
    if(sessionStorage.getItem('nombreUsuario') != null){
        var listaUsuarios = JSON.parse(localStorage.getItem('registerUsersList'));

        for(var i = 0; i < listaUsuarios.length; i++){
            if(sessionStorage.getItem('nombreUsuario') == listaUsuarios[i].usuario){
                vnombre.value = listaUsuarios[i].nombre;
                vusuario.value = listaUsuarios[i].usuario;
                vcorreo.value = listaUsuarios[i].correo;
                vcontrasena.value = listaUsuarios[i].contrasena;
                vfechaNacimiento.value = listaUsuarios[i].fechaNacimiento;
            }
        }
    }
}

//Habilita el modo edición
function habilitarEdicion(){

    if(sessionStorage.getItem('usuarioActivo') != null){
        vnombre.disabled = false;
        //vusuario.disabled = false;
        vcorreo.disabled = false;
        vcontrasena.disabled = false;
        vcontrasenaV.disabled = false;
        vfechaNacimiento.disabled = false;
        vbtnEditar.disabled = true;
        vbtnGuardar.disabled = false;
    }
    
}

//Guarda los cambios realizados
function guardarCambios(){
    var listaUsuarios = JSON.parse(localStorage.getItem('registerUsersList'));

    for(var i = 0; i < listaUsuarios.length; i++){
        if(vusuario.value == listaUsuarios[i].usuario){
            listaUsuarios[i].nombre = vnombre.value;
            listaUsuarios[i].correo = vcorreo.value;
            listaUsuarios[i].contrasena = vcontrasena.value;
            listaUsuarios[i].fechaNacimiento = vfechaNacimiento.value;
            sessionStorage.setItem('usuarioActivo', listaUsuarios[i].nombre);
        }
    }

    localStorage.setItem('registerUsersList', JSON.stringify(listaUsuarios));
    alert('¡Los datos fueron actualizados!');
}

//Pone inactivo el usuario
function deshabilitarUsuario(){

    if(sessionStorage.getItem('nombreUsuario') != null){
        var listaUsuarios = JSON.parse(localStorage.getItem('registerUsersList'));
        var opcion = confirm("¿Estas seguro/a que deseas eliminar esté usuario");

        if(opcion == true){
            for(var i = 0; i < listaUsuarios.length; i++){
                if(vusuario.value == listaUsuarios[i].usuario){
                    listaUsuarios[i].estado = 0;
                }
            }
        
            localStorage.setItem('registerUsersList', JSON.stringify(listaUsuarios));
            sessionStorage.clear();
            alert('¡El usuario ha sido eliminado!');
            window.location.href = 'index.html';
        }
    }

}

//Verifica si todos los campos son correctos
function validarCampos() {

    if (validarCamposVacios()) {
        if (validarEmail()) {

            if (validarContrasenas()) {
                guardarCambios();
            }
            else {
                alert('Las contraseñas no coinciden');
                vcontrasenaV.value = "";
                vcontrasenaV.focus();
            }

        }
        else {
            alert('¡El email no es valido!');
            vcorreo.value = "";
            vcorreo.focus();
        }
    }
    else {
        alert('Por favor complete todos los campos.');
    }
}

//Si encuentra un registro con el mismo usuario retorna un true
function validarUsuario() {
    var existe = false;

    if (localStorage.getItem('registerUsersList') != null) {
        registerUsers = JSON.parse(localStorage.getItem('registerUsersList'));
    }

    for (var i = 0; i < registerUsers.length; i++) {
        if (vusuario.value == registerUsers[i].usuario) {
            existe = true;
        }
    }

    return existe;
}

//Valida si las contraseñas ingresadas son iguales, si son iguales retorna un true
function validarContrasenas() {
    var validas = false;

    if (vcontrasena.value == vcontrasenaV.value) {
        validas = true;
    }

    return validas;
}

//Si todos los campos estan llenos retorna un true
function validarCamposVacios() {
    var llenos = false;

    if (vnombre.value != "" && vusuario.value != "" && vcorreo.value != "" &&
        vcontrasena.value != "" && vcontrasenaV != "" && vfechaNacimiento != "") {
        llenos = true;
    }

    return llenos;
}

//Valida si el correo ingresado es valido con expresiones regulares
function validarEmail() {
    var valido = false;

    if(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(vcorreo.value)){
        valido = true;
    }

    return valido;
}