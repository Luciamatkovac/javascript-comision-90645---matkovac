const form = document.querySelector("#formpreciosxmayor");
const mensajeConfirmacion = document.querySelector("#mensaje-confirmacion");

//envio de formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();

  //obtener datos del formulario para mostrar en el Swal y hacerlo personalizado

  const nombre = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;

  Swal.fire({
    icon: "success",
    title: "Solicitud enviada",
    html: `
      <p>¡Gracias <strong>${nombre}</strong>!</p>
      <p>Un agente de atención al cliente se contactará contigo en <strong>${email}</strong> y enviaremos nuestra lista de precios mayorista.</p>
    `,
    confirmButtonText: "Aceptar",
  }).then(() => {
    // opcional: limpiar el formulario después del Swal
    form.reset();
  });
});
