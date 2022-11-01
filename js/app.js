const contenedor = document.getElementById('producto-contenedor');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container');
const cantidadCarrito = document.getElementById('cantidadCarrito');

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("./stock.json")
.then((Response) => Response.json())
.then((data) => {

data.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML += `
                    <div class="card">
                    <div class="card-image">
                    <img src="${producto.img}">
                    <span class="card-title">${producto.nombre}</span>
                    <button class="btn btn-primary" id=boton${producto.id}>Comprar</button>
                    </div>
                    <div class="card-content">
                        <p>${producto.desc}</p>
                        <p>$ ${producto.precio}</p>
                        
                    </div>
            </div>
                    `;
    contenedor.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);

    boton.addEventListener('click' , ()=>{

    const repeat = carrito.some((repeatProducto) => repeatProducto.id === producto.id);
    
    if (repeat){
        carrito.map((prod) => {
            if(prod.id === producto.id){
                prod.cantidad++;
            }
        })
    } else{
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,

        });
        carritoCounter();
        saveLocal();

        Swal.fire(
            'Bien hecho!',
            'Agregaste este item a tu carrito',
            'success'
          )
    }
        
    })

})
});

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};