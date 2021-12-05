//Variables globales
var registerUsers = [];
var vnombre = document.getElementById('nombre');
var vusuario = document.getElementById('usuario');
var vcorreo = document.getElementById('correo');
var vcontrasena = document.getElementById('contrasena');
var vcontrasenaV = document.getElementById('contrasenaV');
var vfechaNacimiento = document.getElementById('fechaNacimiento');

function addNewUser(){

    if(localStorage.getItem('registerUsersList') != null){
        registerUsers = JSON.parse(localStorage.getItem('registerUsersList'));
    }

    var newUser = {
        id: localStorage.length + 1,
        nombre: vnombre.value,
        usuario: vusuario.value,
        correo: vcorreo.value,
        contrasena: vcontrasena.value,
        fechaNacimiento: vfechaNacimiento.value,
        rol: 1
    };
    
    console.log(newUser);
    registerUsers.push(newUser);
    localStorage.setItem('registerUsersList', JSON.stringify(registerUsers));
}