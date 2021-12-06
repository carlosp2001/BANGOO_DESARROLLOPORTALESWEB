document.querySelector('#btnIngresar').addEventListener('click', validarCampos);

//Obtiene el registro de los usarios existentes
function obtenerListaUsuarios(){
    var listaUsuario = JSON.parse(localStorage.getItem('registerUsersList'));

    if(listaUsuario == null){
        listaUsuario = 
        [
            ['0','Administrador','admin','admin@gmail.com','admin123','29-05-2000','2']
        ]
    }

    return listaUsuario;
}

//Valida que las credenciales corresponda a dicho usuario
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

//Valida que los campos esten llenos
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

//Si las credenciales son correctas procede a iniciar sesión
function iniciarSesion(){
    var sCorreo = '';
    var sContrasena = '';
    var bAcceso = false;

    sCorreo = document.querySelector('#nombre').value;
    sContrasena = document.querySelector('#contrasena').value;

    bAcceso = validarCredenciales(sCorreo,sContrasena);
    
    if(bAcceso == true){
        alert('¡Bienvenido '+sessionStorage.getItem('usuarioActivo')+'!')
        ingresar();
    }
    else{
        alert("El usuario y contraseña no coinciden");
        document.getElementById("contrasena").value = "";
        document.getElementById("contrasena").focus();
    }
}

//Redirige a la pagina correspondiente de cada tipo de usuario
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