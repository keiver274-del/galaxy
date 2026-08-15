// login.js — pantalla de inicio, ahora 100% en el navegador (sin PHP).
(function () {
  'use strict';

  const formulario = document.getElementById('formularioLogin');
  const campoUsuario = document.getElementById('campoUsuario');
  const loginError = document.getElementById('loginError');

  document.addEventListener('DOMContentLoaded', () => {
    // Si ya hay un usuario guardado, saltamos directo al juego.
    const usuarioExistente = MisionEspacial.obtenerUsuario();
    if (usuarioExistente) {
      window.location.href = 'galaxia.html';
      return;
    }
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nombre = campoUsuario.value.trim();
    loginError.hidden = true;

    if (!nombre) {
      mostrarError('Escribe un nombre o apodo para comenzar.');
      return;
    }

    MisionEspacial.guardarUsuario(nombre);
    window.location.href = 'galaxia.html';
  });

  function mostrarError(texto) {
    loginError.textContent = texto;
    loginError.hidden = false;
  }
})();