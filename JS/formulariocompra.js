// mostrar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.querySelector("#contenedor-carrito");
const totalElement = document.querySelector("#total");

// funciona para mostrar el carrito de la pagina index
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";

  // si el carrito de compras esta vacio mostrar
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<li>El carrito está vacío.</li>";
    totalElement.textContent = "0";
    return;
  }

  // Recorrer los productos, mostrarlos y caluclar con formula el total
  let total = 0;

  carrito.forEach((producto) => {
    let cantidad = producto.cantidad || 1;
    let subtotal = producto.precio * cantidad;
    total += subtotal;

    let item = document.createElement("div");
    item.innerHTML = `
      <p><strong>${producto.nombre}</strong></p>
      <p>Precio: $${producto.precio}</p>
      <p>Cantidad: ${cantidad}</p>
      <p>Subtotal: $${subtotal}</p>
      <hr>
    `;

    contenedorCarrito.appendChild(item);
  });

  // Mostramos el total
  totalElement.textContent = total.toLocaleString();
}

// cuadno recargo reitero func
mostrarCarrito();

const formCompra = document.querySelector("#form-compra");

formCompra.addEventListener("submit", (evento) => {
  evento.preventDefault();

  document.querySelector("main").innerHTML = `
    <h2 class="graciascompra">¡Gracias por tu pedido!</h2>
    <p class="graciascomprap">El equipo de atencion al cliente se comunicara contigo para coordinar el dia y horario de tu entrega</p>
  `;

  // Vaciar carrito
  localStorage.removeItem("carrito");
});
