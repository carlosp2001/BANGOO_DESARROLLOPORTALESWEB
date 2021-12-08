const carrito = document.getElementById("carrito");
const productosjean = document.getElementById("lista-productos-jeans");
const productoscamisa = document.getElementById("lista-productos-camisas");
const productoscalzado = document.getElementById("lista-productos-calzado");
const listaProductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
    productosjean.addEventListener("click", comprarProducto);
    productoscamisa.addEventListener("click", comprarProducto);
    productoscalzado.addEventListener("click", comprarProducto);
    carrito.addEventListener("click", eliminarProducto);

    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    document.addEventListener("DOMContentLoaded", leerLocalStorage);

}

function comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);

    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('p').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoProducto);
}

function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${producto.imagen}" width = 100>
    </td>
    <td>${producto.titulo} </td>
    <td>${producto.precio} </td>
    <td>
    <a href="#" class="borrar-producto" data-id="${producto.id}">x</a>
    </td>
    `;

    listaProductos.appendChild(row);
    guardarProductoLocalStorage(producto);
}

function eliminarProducto(e) {
    e.preventDefault();

    let producto,
        productoId;
    if (e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoId = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoId);

}

//elimina los productos del carrito
function vaciarCarrito() {
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

//Guardar Productos LocalStorage
function guardarProductoLocalStorage(producto) {
    let productos;

    productos = obtenerProductosLocalStorage();
    productos.push(producto);

    localStorage.setItem('productos', JSON.stringify(productos));

}

//comprueba si hay productos en el localStorage
function obtenerProductosLocalStorage() {
    let productosLS;

    if (localStorage.getItem('productos') === null) {
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLS;
}

function leerLocalStorage() {
    let productosLS;

    productosLS = obtenerProductosLocalStorage();

    productosLS.array.forEach(function (producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width = 100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
            <a href = "a" class="borrar-producto" data-id="${producto.id}">x</a>
            </td>
        `;
        listaProductos.appendChild(row);

    });
}


function eliminarProductoLocalStorage(producto){
    let productosLS;

    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach(function(productosLS,seccionhombres){
        if (productosLS.id === producto) {
            productosLS.splice(seccionhombres,1);
        }
    });
    localStorage.setItem('productos',JSON.stringify(productosLS));

}

function vaciarLocalStorage(){
    localStorage.clear();

}