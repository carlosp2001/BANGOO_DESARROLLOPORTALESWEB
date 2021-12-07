//VARIABLES GLOBALES
var vusuarioActivo = document.getElementById('nombreUsuarioActivo');

function cargarUsuarioActivo(){
    
    if(sessionStorage.getItem('usuarioActivo') != null){
        vusuarioActivo.innerHTML = sessionStorage.getItem('usuarioActivo');
    }
    
}