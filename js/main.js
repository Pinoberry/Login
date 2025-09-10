const formularioLogin = document.getElementById("formularioLogin");
const campoUsuario = document.getElementById("campoUsuario");
const campoContrasena = document.getElementById("campoContrasena");
const toggleContrasena = document.getElementById("toggleContrasena");
const modalMensaje = document.getElementById("modalMensaje");
const tituloModal = document.getElementById("tituloModal");
const contenidoModal = document.getElementById("contenidoModal");
const barraCarga = document.getElementById("barraCarga");

function mostrarBarraCarga() {
  barraCarga.style.width = "0%";
  barraCarga.classList.add("visible");

  let progreso = 0;
  const intervalo = setInterval(() => {
    progreso += 10;
    if (progreso <= 90) {
      barraCarga.style.width = `${progreso}%`;
    } else {
      clearInterval(intervalo);
    }
  }, 100);
}

function ocultarBarraCarga() {
  barraCarga.style.width = "100%";
  barraCarga.classList.add("completa");
  setTimeout(() => {
    barraCarga.classList.remove("visible", "completa");
    barraCarga.style.width = "0%";
  }, 500);
}

toggleContrasena.addEventListener("click", function () {
  const tipo =
    campoContrasena.getAttribute("type") === "password" ? "text" : "password";
  campoContrasena.setAttribute("type", tipo);
  this.querySelector("i").classList.toggle("fa-eye");
  this.querySelector("i").classList.toggle("fa-eye-slash");
});

formularioLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();

  mostrarBarraCarga();

  const usuario = campoUsuario.value.trim();
  const contrasena = campoContrasena.value.trim();

  modalMensaje.classList.add("hidden");

  setTimeout(() => {
    if (!usuario || !contrasena) {
      ocultarBarraCarga();
      mostrarModal(
        "Error de Inicio de Sesión",
        "Por favor, introduce tu usuario y contraseña.",
        "error"
      );
      return;
    }

    if (usuario === "admin" && contrasena === "password123") {
      ocultarBarraCarga();
      mostrarModal(
        "¡Bienvenido!",
        `Hola, ${usuario}. Has iniciado sesión exitosamente.`,
        "exito"
      );
    } else {
      ocultarBarraCarga();
      mostrarModal(
        "Error de Autenticación",
        "Usuario o contraseña incorrectos.",
        "error"
      );
    }
  }, 1500);
});

function mostrarModal(titulo, contenido, tipo) {
  tituloModal.textContent = titulo;
  contenidoModal.textContent = contenido;

  if (tipo === "error") {
    tituloModal.classList.remove("text-green-600");
    tituloModal.classList.add("text-red-600");
  } else if (tipo === "exito") {
    tituloModal.classList.remove("text-red-600");
    tituloModal.classList.add("text-green-600");
  } else {
    tituloModal.classList.remove("text-red-600", "text-green-600");
    tituloModal.classList.add("text-gray-800");
  }

  modalMensaje.classList.remove("hidden");
}

function cerrarModal() {
  modalMensaje.classList.add("hidden");
}
