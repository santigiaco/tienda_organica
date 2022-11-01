    const pintarCarrito = () => {

    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h3 class="modal-header-title">Carrito</h3>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h5");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener('click', () =>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$ ${producto.precio}</p>
        <span class="restar"> - </span>
        <p>Cantidad: ${producto.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${producto.cantidad * producto.precio}</p>
        <span class="delete-product"> ❌ </span>
    `;


        modalContainer.append(carritoContent);
        
        let restar = carritoContent.querySelector(".restar")
        
        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--;
            }
            pintarCarrito();
        })

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
            producto.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product")

        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        })

    // let eliminar = document.createElement('span');
    // eliminar.innerText = "❎";
    // eliminar.classList = "delete-product";
    // carritoContent.append(eliminar);

    // eliminar.addEventListener('click', eliminarProducto)
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar:$ ${total}`;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const founId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== founId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();

    Swal.fire('Has quitado este elemento de tu carrito')
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}