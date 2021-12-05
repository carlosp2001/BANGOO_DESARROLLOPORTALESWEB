document.querySelector('#btnIngresar').addEventListener('click', validarCampos);

function obtenerListaUsuarios(){
    var listaUsuario = JSON.parse(localStorage.getItem('registerUsersList'));

    if(listaUsuario == null){
        listaUsuario = 
        [
            ['1','Jorge Ayala','jorge-am','jorge@ayala.com','0360','29-05-2000','2']
        ]
    }

    return listaUsuario;
}

function validarCredenciales(pUsuario, pContrasena){
    var listaUsuarios = obtenerListaUsuarios();
    var bAcceso = false;

    for(var i = 0; i < listaUsuarios.length; i++){
        if(pUsuario == listaUsuarios[i].usuario && pContrasena == listaUsuarios[i].contrasena){
            bAcceso = true;
            sessionStorage.setItem('usuarioActivo', listaUsuarios[i].nombre);
            sessionStorage.setItem('rolUsuarioActivo', listaUsuarios[i].rol);
        }
    }

    return bAcceso;
}

function validarCampos(){
    if(document.querySelector('#nombre').value == "" || document.querySelector('#contrasena').value == ""){
        document.getElementById("nombre").style.borderColor = "red";
        document.getElementById("contrasena").style.borderColor = "red";
        alert("¡Por favor complete todos los campos!");
    }
    else{
        iniciarSesion();
    }
}

function iniciarSesion(){
    var sCorreo = '';
    var sContrasena = '';
    var bAcceso = false;

    sCorreo = document.querySelector('#nombre').value;
    sContrasena = document.querySelector('#contrasena').value;

    bAcceso = validarCredenciales(sCorreo,sContrasena);
    
    if(bAcceso == true){
        ingresar();
    }
    else{
        alert("El usuario y contraseña no coinciden");
    }
}

function ingresar(){
    var rol = sessionStorage.getItem('rolUsuarioActivo');

    switch(rol){
        case '1':
            window.location.href = 'index.html';
            break;
        case '2':
            window.location.href = 'Contacto.html';
            break;
    }
}