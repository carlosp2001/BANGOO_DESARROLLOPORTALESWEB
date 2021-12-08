const favorito = document.getElementById("favorito");
const favoritos = document.getElementById("lista-favorito");
const listafavoritos = document.querySelector("#lista-favoritos tbody");

cargarEventListeners();

function cargarEventListeners() {
    favoritos.addEventListener("click", seleccionarFavorito);

    favorito.addEventListener("click", eliminarfavorito);

    document.addEventListener("DOMContentLoaded", leerLocalStorage);

}

function seleccionarFavorito(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-favorito')) {
        const favorito = e.target.parentElement.parentElement;
        leerDatosfavorito(favorito);

    }
}

function leerDatosfavorito(favorito) {
    const infofavorito = {
        imagen: favorito.querySelector('img').src,
        titulo: favorito.querySelector('h5').textContent,//
        //precio: favorito.querySelector('p').textContent,
        id: favorito.querySelector('a').getAttribute('data-id')
    }

    insertarfavorito(infofavorito);
}

function insertarfavorito(favorito) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${favorito.imagen}" width = 100>
    </td>
    <td>${favorito.titulo} </td>
    
    `;

    listafavoritos.appendChild(row);
    guardarfavoritoLocalStorage(favorito);
}

function eliminarfavorito(e) {
    e.preventDefault();

    let favorito,
        favoritoId;
    if (e.target.classList.contains('borrar-favorito')) {
        e.target.parentElement.parentElement.remove();
        favorito = e.target.parentElement.parentElement;
        favoritoId = favorito.querySelector('a').getAttribute('data-id');
    }
    eliminarfavoritoLocalStorage(favoritoId);

}

//elimina los favoritos del favorito
function vaciarfavorito() {
    while (listafavoritos.firstChild) {
        listafavoritos.removeChild(listafavoritos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

//Guardar favoritos LocalStorage
function guardarfavoritoLocalStorage(favorito) {
    let favoritos;

    favoritos = obtenerfavoritosLocalStorage();
    favoritos.push(favorito);

    localStorage.setItem('favoritos', JSON.stringify(favoritos));

}

//comprueba si hay favoritos en el localStorage
function obtenerfavoritosLocalStorage() {
    let favoritosLS;

    if (localStorage.getItem('favoritos') === null) {
        favoritosLS = [];
    } else {
        favoritosLS = JSON.parse(localStorage.getItem('favoritos'));
    }
    return favoritosLS;
}

function leerLocalStorage() {
    let favoritosLS;

    favoritosLS = obtenerfavoritosLocalStorage();

    favoritosLS.array.forEach(function (favorito) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${favorito.imagen}" width = 100>
            </td>
            <td>${favorito.titulo} </td>
            <td>
            <a href = "a" class="borrar-favorito" data-id="${favorito.id}">x</a>
            </td>
        `;
        listafavoritos.appendChild(row);

    });
}


function eliminarfavoritoLocalStorage(favorito){
    let favoritosLS;

    favoritosLS = obtenerfavoritosLocalStorage();

    favoritosLS.forEach(function(favoritosLS,seccionhombres){
        if (favoritosLS.id === favorito) {
            favoritosLS.splice(seccionhombres,1);
        }
    });
    localStorage.setItem('favoritos',JSON.stringify(favoritosLS));

}

function vaciarLocalStorage(){
    localStorage.clear();

}