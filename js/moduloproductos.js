function Producto(nombre, cantidad, tipo, talla, color, categoria, img){
    this.nombre = nombre
    this.cantidad =  cantidad
    this.tipo = tipo
    this.talla = talla
    this.color = color
    this.categoria = categoria
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
    var input_categoria = document.getElementById("categoria-select");

    reader.addEventListener('load', function (){
        if(this.result){
            producto = new Producto(input_nombre.value, input_cantidad.value, input_tipo.value, input_color.value,
                input_talla.value, input_categoria.value, img = this.result)
            localStorage.setItem(((localStorage.length+1).toString()), JSON.stringify(producto));
        }
    })
    reader.readAsDataURL(document.getElementById("customFile").files[0])
}

function agregar_imagen(){
    var imglocal = JSON.parse(localStorage.getItem("1"));
    console.log(imglocal);
    var divresult = document.getElementById("result")

    var img = document.createElement("img");
    img.src= imglocal.img;
    divresult.appendChild(img)

}

