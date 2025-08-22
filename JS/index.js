const contenedor = document.querySelector("#contenedor-productos");
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const totalCarrito = document.querySelector("#total-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let catalogo = [];

// Guardar carrito en localStorage para que no se reinicie cada vez que actualiza.
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//mostrar el carrito actual al finla del index
const btnToggleCarrito = document.querySelector("#btn-toggle-carrito");

btnToggleCarrito?.addEventListener("click", () => {
  //funcion para que se desplace al carrito del ginal y vea detalla scrollintoview
  contenedorCarrito?.scrollIntoView({ behavior: "smooth", block: "start" });
});

// CARGAR CATALOGO POR FETCH
async function cargarCatalogo() {
  try {
    const res = await fetch("../data/productos.json");
    catalogo = await res.json();
    mostrarCatalogo();
  } catch (error) {
    contenedor.innerHTML =
      "<p>ERROR: No es posible cargar el catálogo en este momento.</p>";
  }
}

// Mostrar el catalogo con ingreso de cantidad
function mostrarCatalogo() {
  contenedor.innerHTML = "";
  catalogo.forEach((producto) => {
    const divProducto = document.createElement("div");
    //mantener estilo css
    divProducto.classList.add("card-producto");
    divProducto.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <input type="number" min="1" value="1" class="cantidad-input" data-id="${producto.id}">
      <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(divProducto);
  });
}

// Mostrar carrito con opción de modificar cantidad desde ahi o eliminar todo lo agregado
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";
  //el total del carrito para poder sumar el valor de lo que se agrega
  let total = 0;

  //primero condicion si carrito vacio entonces muestro "carrito vacio"
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<li>Carrito vacío</li>";
    totalCarrito.textContent = "0";
    return;
  }

  carrito.forEach((producto, index) => {
    //creamos nuevo elemento
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio} c/u
      <input type="number" min="1" value="${producto.cantidad}" class="cantidad-carrito" data-index="${index}">
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;
    //lo agregamos
    contenedorCarrito.appendChild(li);

    // actualizar el total
    total += producto.precio * producto.cantidad;
  });

  // Mostrar total actualizado
  totalCarrito.textContent = total;
}

// Mostrar catálogo y carrito al cargar
mostrarCatalogo();
mostrarCarrito();

// Eventos
document.addEventListener("click", (evento) => {
  // Agregar producto al carrito
  if (evento.target.classList.contains("btn-agregar")) {
    //cuando clickea que me de el id del producto a agregar
    const idProducto = parseInt(evento.target.getAttribute("data-id")); //convierte numero parseint
    const cantidadInput = document.querySelector(
      `.cantidad-input[data-id="${idProducto}"]`
    );
    const cantidad = parseInt(cantidadInput.value); //convierte numero parseint

    const productoSeleccionado = catalogo.find((p) => p.id === idProducto);
    if (!productoSeleccionado) return;

    // Si ya está en el carrito sumo lo que haya clickeado
    //primero busco el prodcuto en el catalogo
    const existe = carrito.find((p) => p.id === idProducto);
    if (existe) {
      existe.cantidad += cantidad;
    } else {
      //si no existe el mismo id lo sumo al carrito
      carrito.push({
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        imagen: productoSeleccionado.imagen,
        cantidad,
      });
    }

    guardarCarrito(); //actualiza localstorage
    mostrarCarrito(); //  Esto recalcula y actualiza el total

    cantidadInput.value = 1; // resetear el contador de item
  }

  // Eliminar producto
  if (evento.target.classList.contains("btn-eliminar")) {
    const index = parseInt(evento.target.getAttribute("data-index"));
    carrito = carrito.filter((producto, i) => i !== index);

    guardarCarrito(); //actualiza localstorage
    mostrarCarrito(); //  Esto recalcula y actualiza el total
  }
});

// Cambiar cantidad en el carrito y actualizar total en vivo
document.addEventListener("input", (evento) => {
  if (evento.target.classList.contains("cantidad-carrito")) {
    const index = parseInt(evento.target.getAttribute("data-index"));
    const nuevaCantidad = parseInt(evento.target.value);

    if (nuevaCantidad > 0) {
      carrito[index].cantidad = nuevaCantidad;
      guardarCarrito(); //actualiza localstorage
      mostrarCarrito(); //  Esto recalcula y actualiza el total
    }
  }
});
