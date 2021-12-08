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
            //Div card
            var div_card = document.createElement("div");
            div_card.className = "card";
            //Imagen
            var imgarticle = document.createElement("img")
            imgarticle.src = producto.img;
            imgarticle.className = "imgcatalogo";
            //Card title
            var card_title= document.createElement("h5");
            card_title.className="card-title";
            card_title.textContent = producto.nombre;

            //Precio P
            var precio_p = document.createElement("p")
            precio_p.textContent = "Precio: " + producto.precio+" $" ;
            precio_p.className="precio";

            //Boton Favorito
            var botonfav = document.createElement("a")
            botonfav.className = "btn btn-danger button agregar-favorito"
            botonfav.setAttribute("data-id", key);


            //Corazon icono
            var icono = document.createElement("svg")
            icono.setAttribute("xmlns", "http://www.w3.org/2000/svg")
            icono.setAttribute("width", "16")
            icono.setAttribute("height", "16")
            icono.setAttribute("fill","currentColor")
            icono.className="bi bi-heart-fill"
            icono.setAttribute("viewBox","0 0 16 16")

            //Path

            var path = document.createElement("path")
            path.setAttribute("fill-rule","evenodd")
            path.setAttribute("d","M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z")


            botonfav.appendChild(path)
            botonfav.appendChild(icono)

            //Boton de carrito
            var btncarrito = document.createElement("a");
            btncarrito.className = "btn btn-light agregar-carrito";
            btncarrito.setAttribute("href", "#");
            btncarrito.setAttribute("data-id", key);
            btncarrito.textContent = "Comprar"
            div_card.appendChild(imgarticle);
            //Div cardbody
            var div_cardbody = document.createElement("div")
            div_cardbody.className = "card-body"

            div_cardbody.appendChild(card_title)
            div_cardbody.appendChild(precio_p)

            div_cardbody.appendChild(btncarrito)
            div_cardbody.appendChild(botonfav)
            div_card.appendChild(div_cardbody)

            div_inner.appendChild(div_card);
        }

    });

}

