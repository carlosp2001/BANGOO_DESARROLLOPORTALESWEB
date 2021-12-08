//Variables globales
var registerUsers = [];
var vnombre = document.getElementById('nombre');
var vusuario = document.getElementById('usuario');
var vcorreo = document.getElementById('correo');
var vcontrasena = document.getElementById('contrasena');
var vcontrasenaV = document.getElementById('contrasenaV');
var vfechaNacimiento = document.getElementById('fechaNacimiento');

//Agrega un nuevo usuario al registro
function addNewUser() {

    if (localStorage.getItem('registerUsersList') != null) {
        registerUsers = JSON.parse(localStorage.getItem('registerUsersList'));
    }

    var newUser = {
        id: registerUsers.length + 1,
        nombre: vnombre.value,
        usuario: vusuario.value,
        correo: vcorreo.value,
        contrasena: vcontrasena.value,
        fechaNacimiento: vfechaNacimiento.value,
        rol: 1,
        estado: 1
    };

    console.log(newUser);
    registerUsers.push(newUser);
    localStorage.setItem('registerUsersList', JSON.stringify(registerUsers));
    alert('¡Usuario registrado con exito!');
}

//Verifica si todos los campos son correctos
function validarCampos() {

    if (validarCamposVacios()) {
        if (validarUsuario()) {
            alert('El usuario que ingreso no esta disponible');
            vusuario.value = "";
            vusuario.focus();
        }
        else {
            if (validarEmail()) {
                if (validarContrasenas()) {
                    addNewUser();
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