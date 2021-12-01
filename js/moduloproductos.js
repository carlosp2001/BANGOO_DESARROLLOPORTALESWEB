

function guardar_localstorage(){
    var input_nombre = document.getElementById("Nombre_Producto");
    var input_cantidad = document.getElementById("Cantidad_producto");
    var input_tipo = document.getElementById("Tipo_Producto_Dropdown");
    var input_talla = document.getElementById("Talla_numero");
    console.log("txt");

    let producto = {
        nombre: input_nombre.value,
        cantidad:input_cantidad.value,
        tipo:input_tipo.value,
        talla:input_talla.value

    }
    localStorage.setItem("producto", JSON.stringify(producto));
}