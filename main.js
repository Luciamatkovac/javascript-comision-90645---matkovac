// Catálogo de materiales del corralón
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

// Variables globales para carrito y total
let carrito = [];
let total = 0;

// Función para mostrar el catálogo y pedir una opción
function mostrarCatalogo() {
  let mensaje = "Catálogo de materiales de MUNDO OBRA:\n\n";
  for (let i = 0; i < catalogo.length; i++) {
    mensaje += `${i + 1}. ${catalogo[i].nombre} - $${catalogo[i].precio}\n`;
  }
  mensaje += "\nIngresa el número del material que deseas cotizar:";
  return mensaje;
}

// Función principal del simulador
function simuladorCorralon() {
  alert("¡Bienvenido a MUNDO OBRA!\nCotizá tus materiales online.");

  let seguir = true;

  while (seguir) {
    let opcion = prompt(mostrarCatalogo());

    switch (opcion) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
        let index = parseInt(opcion) - 1;
        let material = catalogo[index];

        let cantidad = parseInt(
          prompt(`¿Cuántas unidades de ${material.nombre} deseas agregar?`)
        );

        if (isNaN(cantidad) || cantidad <= 0) {
          alert("La cantidad ingresada no es válida.");
        } else {
          let subtotal = material.precio * cantidad;
          carrito.push({
            nombre: material.nombre,
            precio: material.precio,
            cantidad,
            subtotal,
          });
          total += subtotal;
          alert(
            `Agregaste ${cantidad} x ${material.nombre}.\nSubtotal: $${subtotal}`
          );
        }
        break;

      default:
        alert("Opción inválida. Por favor ingresa un número del catálogo.");
        break;
    }

    // Preguntar si quiere seguir comprando
    let respuesta = prompt(
      "¿Deseas agregar otro material? (si / no)"
    ).toLowerCase();
    if (respuesta !== "si") {
      seguir = false;
    }
  }

  //calcular el precio de la cotizacion del cliente segun cantidades elegidas

  if (carrito.length > 0) {
    let detalle = "Cotización del corralón:\n\n";
    for (let i = 0; i < carrito.length; i++) {
      let item = carrito[i];
      detalle += `${i + 1}. ${item.nombre} - $${item.precio} x ${
        item.cantidad
      } = $${item.subtotal}\n`;
    }
    detalle += `\nTotal a pagar: $${total}`;
    alert(detalle);

    // Confirmar pedido
    let confirma = confirm("¿Deseas confirmar tu pedido?");
    if (confirma) {
      alert(
        "¡Tu pedido ha sido confirmado! \nTu material será preparado para entrega o retiro según lo coordinado con nuestro departamento de atencion al cliente.\nGracias por comprar en MUNDO OBRA."
      );
    } else {
      alert(
        "Tu cotización fue cancelada. ¡Te esperamos nuevamente!\n MUNDO OBRA"
      );
    }
  } else {
    alert("No agregaste materiales a tu cotización.");
  }
}

// Ejecutar el simulador
simuladorCorralon();
