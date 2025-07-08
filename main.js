/* variables, constantes y arrays */

const catalogo = [
  {
    nombre: "Bolsa de cemento 50kg",
    imagen: "medios/bolsa_cemento",
    precio: 12863,
  },
  {
    nombre: "Metro cúbico de arena",
    imagen: "medios/metro_cubico_arena",
    precio: 39732,
  },
  { nombre: "Bolsa de cal 30kg", imagen: "medios/bolsa_de_cal", precio: 24566 },
  { nombre: "Ladrillo común", imagen: "medios/ladrillo_comun", precio: 23 },
  {
    nombre: "Varilla de Hierro 8 mm x 12 m",
    imagen: "medios/varilla_de_hierro",
    precio: 17500,
  },
  {
    nombre: "Chapa Acanalada C27 1.10X4.50Mt",
    imagen: "medios/chapa_acanalada",
    precio: 54650,
  },
  { nombre: "Lata de pintura 20L", imagen: "medios/lata_20ml", precio: 78900 },
];

let carrito = [];
let total = 0;

// funcion para mostrar los materiales del catalogo.
function mostrarCatalogo() {
  /*declaro funcion para mostrar el catalogo*/
  let mensaje =
    "Catálogo de materiales del corralón:\n\n"; /*declarar variable de mensaje inicial del prompt*/
  for (let i = 0; i < catalogo.length; i++) {
    let item = catalogo[i];
    mensaje +=
      i + 1 + ". " + item.nombre + " - $" + item.precio + " x unidad\n";
  }
  mensaje += "\nIngresa el número del material que deseas cotizar:";
  return mensaje;
}

// funcion para agregar material a la cotizacion
function agregarMaterial() {
  let opcion = parseInt(prompt(mostrarCatalogo())); //parseInt para convertir el texto en numero entero

  if (isNaN(opcion) || opcion < 1 || opcion > catalogo.length) {
    //is Nan (para que detecte si es un numero)
    alert(
      "La opción elegida es inválida. Por favor coloca un número presente en el catalogo de materiales."
    );
    return;
  }

  let material = catalogo[opcion - 1]; //para que el 0 de catalogo me redirija a 1 y asi sucesivamente.
  //si coloco una opcion valida, continua el proceso de cotizacion.
  let cantidad = parseInt(
    prompt(`¿Cuántas unidades de "${material.nombre}" deseas agregar?`)
  ); //parseInt para convertir el texto en numero entero

  //para verificar una vez que se ingrese el producto que tiene si la cantidad no es valida: es numero o es menor igual a 0
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("La cantidad ingresada no es válida.");
    return;
  }

  //si unidades ingresadas son validas, le muestro al cliente mensaje con material y precio
  let subtotal = material.precio * cantidad;
  carrito.push({
    nombre: material.nombre,
    precio: material.precio,
    cantidad,
    subtotal,
  });
  total += subtotal;

  alert(`Agregaste ${cantidad} x ${material.nombre}.\nSubtotal: $${subtotal}`);
}

// funcion para mostrar cotización completa
function mostrarCotizacion() {
  if (carrito.length === 0) {
    alert("No has agregado materiales.");
    return;
  }
  //calcular el precio de la cotizacion del cliente segun cantidades elegidas
  let detalle = "Cotización del corralón:\n\n";
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    detalle += `${i + 1}. ${item.nombre} - $${item.precio} x ${
      item.cantidad
    } = $${item.subtotal}\n`;
  }
  detalle += `\nTotal a pagar: $${total}`;

  alert(detalle);
}

// funcion para finalizar la compra
function confirmarPedido() {
  if (carrito.length === 0) {
    alert("No tienes materiales en tu cotización para avanzar.");
    return;
  }

  let confirma = confirm("¿Deseas confirmar tu compra y generar el pedido?");
  if (confirma) {
    alert(
      "¡Tu pedido ha sido confirmado! \nTu material será preparado para entrega o retiro según lo coordinado con nuestro departamento de atencion al cliente.\nGracias por comprar en MUNDO OBRA."
    );
  } else {
    alert(
      "Tu cotización fue cancelada. ¡Te esperamos nuevamente!\n MUNDO OBRA"
    );
  }
}

/*funciones para el simulador*/

function simuladorCorralon() {
  alert("MUNDO OBRA \n - Bienvenido a nuestro cotizador online de materiales");

  let seguir = true;
  while (seguir) {
    agregarMaterial();
    seguir = confirm("¿Deseas agregar otro material?");
  }

  mostrarCotizacion();
  confirmarPedido();
}

// INVOCACIÓN

simuladorCorralon();
