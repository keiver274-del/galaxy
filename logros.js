// logros.js — un botón, un logro, un mensaje. Sin juego ni niveles.
(function () {
  'use strict';

  const MENSAJE_ESPECIAL = (nombre) =>
    `${nombre}, cruzaste galaxias enteras de niveles para llegar hasta aquí. ` +
    `De todas las constantes del universo, mi favorita eres tú, ` +
    `Entre millones de galaxias, años luz y estrellas infinitas, ` +
    `coincidir contigo en el mismo espacio y tiempo es el fenómeno más extraordinario de todos.`;;

  const $ = (sel) => document.querySelector(sel);
  const el = {
    tiraLogros: $('#tiraLogros'),
    botonDesbloquear: $('#botonDesbloquear'),
    modal: $('#modalEspecial'),
    modalMensaje: $('#modalMensaje'),
    botonCerrarModal: $('#botonCerrarModal'),
    botonGuardarLogro: $('#botonGuardarLogro'),
  };

  let usuario = '';

  document.addEventListener('DOMContentLoaded', () => {
    usuario = MisionEspacial.requerirUsuario();
    if (!usuario) return; // ya redirige a index.html

    MisionEspacial.renderHeader('Cometa', usuario);
    renderInsignia();

    el.botonDesbloquear.addEventListener('click', desbloquear);
    el.botonCerrarModal.addEventListener('click', cerrarModal);
    el.botonGuardarLogro.addEventListener('click', cerrarModal);
  });

  function renderInsignia() {
    const desbloqueada = MisionEspacial.logroDesbloqueado(usuario);
    el.tiraLogros.innerHTML = `
      <div class="insignia ${desbloqueada ? 'es-desbloqueada' : 'es-bloqueada'} es-especial">
        <div class="insignia__hex">${desbloqueada ? '?' : '?'}</div>
        <div class="insignia__nombre">${desbloqueada ? 'Mensaje de una estrella' : 'Misiones Especiales'}</div>
        <div class="insignia__detalle">${desbloqueada ? 'Atrapala' : 'Toca el botón para desbloquearlo.'}</div>
      </div>
    `;
    el.botonDesbloquear.textContent = desbloqueada ? 'Ver mensaje especial ' : 'Desbloquear mensaje especial ';
  }

  function desbloquear() {
    MisionEspacial.desbloquearLogro(usuario);
    renderInsignia();
    el.modalMensaje.textContent = MENSAJE_ESPECIAL(usuario);
    el.modal.hidden = false;
  }

  function cerrarModal() {
    el.modal.hidden = true;
  }
})();