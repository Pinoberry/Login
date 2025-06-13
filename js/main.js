const formularioLogin = document.getElementById("formularioLogin");
const campoUsuario = document.getElementById("campoUsuario");
const campoContrasena = document.getElementById("campoContrasena");
const toggleContrasena = document.getElementById("toggleContrasena");
const modalMensaje = document.getElementById("modalMensaje");
const tituloModal = document.getElementById("tituloModal");
const contenidoModal = document.getElementById("contenidoModal");
const barraCarga = document.getElementById("barraCarga");

// Función para mostrar la barra de carga
function mostrarBarraCarga() {
  barraCarga.style.width = "0%";
  barraCarga.classList.add("visible");
  // Simular progreso de carga (opcional, para efecto visual)
  let progreso = 0;
  const intervalo = setInterval(() => {
    progreso += 10;
    if (progreso <= 90) {
      // Carga hasta el 90% antes de finalizar
      barraCarga.style.width = `${progreso}%`;
    } else {
      clearInterval(intervalo);
    }
  }, 100);
}

// Función para ocultar la barra de carga y completarla
function ocultarBarraCarga() {
  barraCarga.style.width = "100%";
  barraCarga.classList.add("completa");
  setTimeout(() => {
    barraCarga.classList.remove("visible", "completa");
    barraCarga.style.width = "0%"; // Resetear para la próxima vez
  }, 500); // Pequeño retraso para que la barra se vea completa
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

  mostrarBarraCarga(); // Mostrar barra de carga al iniciar el proceso

  const usuario = campoUsuario.value.trim();
  const contrasena = campoContrasena.value.trim();

  // Oculta mensajes anteriores del modal si estuvieran visibles
  modalMensaje.classList.add("hidden");

  // Simulamos un pequeño retardo para ver la barra de carga
  setTimeout(() => {
    if (!usuario || !contrasena) {
      ocultarBarraCarga(); // Ocultar barra al finalizar
      mostrarModal(
        "Error de Inicio de Sesión",
        "Por favor, introduce tu usuario y contraseña.",
        "error"
      );
      return;
    }

    // Simulación de autenticación (¡No usar en producción real!)
    if (usuario === "admin" && contrasena === "password123") {
      ocultarBarraCarga(); // Ocultar barra al finalizar
      mostrarModal(
        "¡Bienvenido!",
        `Hola, ${usuario}. Has iniciado sesión exitosamente.`,
        "exito"
      );
      // Aquí podrías redirigir o cargar el dashboard después de un pequeño retraso
      // setTimeout(() => { window.location.href = '/dashboard.html'; }, 1500);
    } else {
      ocultarBarraCarga(); // Ocultar barra al finalizar
      mostrarModal(
        "Error de Autenticación",
        "Usuario o contraseña incorrectos.",
        "error"
      );
    }
  }, 1500); // Retardo simulado de 1.5 segundos
});

function mostrarModal(titulo, contenido, tipo) {
  tituloModal.textContent = titulo;
  contenidoModal.textContent = contenido;

  // Opcional: cambiar estilos del modal según el tipo (éxito/error)
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
