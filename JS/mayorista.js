const form = document.querySelector("#formpreciosxmayor");
const mensajeConfirmacion = document.querySelector("#mensaje-confirmacion");

//envio de formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // occultar el form para mostrar solo el mensaje
  form.style.display = "none";
  mensajeConfirmacion.style.display = "block";
});
