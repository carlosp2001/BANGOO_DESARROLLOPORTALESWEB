function Producto(nombre, cantidad, tipo, talla, color, categoria,  precio, img){
    this.nombre = nombre
    this.cantidad =  cantidad
    this.tipo = tipo
    this.talla = talla
    this.color = color
    this.categoria = categoria
    this.precio = precio
    this.img = img
}

function guardar_localstorage(){
    var reader = new FileReader();
    var img = document.getElementById("customFile").files[0];
    var input_nombre = document.getElementById("Nombre_Producto");
    var input_cantidad = document.getElementById("Cantidad_producto");
    var input_tipo = document.getElementById("tipopr_select");
    var input_color = document.getElementById("color_picker");
    var input_talla = document.getElementById("Talla_numero");
    var input_precio = document.getElementById("Precio_input");
    var input_categoria = document.getElementById("categoria-select");
    console.log(input_precio.value)
    reader.addEventListener('load', function (){
        if(this.result){
            producto = new Producto(nombre=input_nombre.value, cantidad=input_cantidad.value,
                tipo=input_tipo.value, talla=input_talla.value,color=input_color.value,
                categoria=input_categoria.value, precio=input_precio.value, img = this.result)
            localStorage.setItem(((localStorage.length+1).toString()), JSON.stringify(producto));
        }
    })
    reader.readAsDataURL(document.getElementById("customFile").files[0])
}




function actualizar_catalogo(div_add,tipo_ropa, genero){
    var div_inner = document.getElementById(div_add)
    Object.keys(localStorage).forEach(function(key){
        var producto =JSON.parse(localStorage.getItem(key));
        if (producto.tipo==tipo_ropa && producto.categoria==genero) {
            var div_card = document.createElement("div");
            div_card.className = "card";

            var article = document.createElement("article");

            var imgarticle = document.createElement("img")
            imgarticle.src = producto.img;
            imgarticle.className = "imgcatalogo";
            var precio_h4 = document.createElement("h4")
            precio_h4.textContent = "Precio: " + producto.precio+" $" ;
            console.log(producto.nombre);
            article.appendChild(imgarticle);
            article.appendChild(precio_h4)
            div_card.appendChild(article);
            div_inner.appendChild(div_card);
        }

    });

}

