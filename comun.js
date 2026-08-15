// comun.js — helpers compartidos. Ya no hay juego ni niveles: el logro se
// desbloquea con un solo botón en la página de Logros.
(function (global) {
  'use strict';

  const CLAVE_USUARIO = 'mision_espacial_usuario';
  const PREFIJO_LOGRO = 'mision_espacial_logro_';

  function obtenerUsuario() {
    return localStorage.getItem(CLAVE_USUARIO) || '';
  }

  function guardarUsuario(nombre) {
    localStorage.setItem(CLAVE_USUARIO, nombre);
  }

  function claveLogro(usuario) {
    return PREFIJO_LOGRO + usuario.trim().toLowerCase();
  }

  function logroDesbloqueado(usuario) {
    return localStorage.getItem(claveLogro(usuario)) === '1';
  }

  function desbloquearLogro(usuario) {
    localStorage.setItem(claveLogro(usuario), '1');
  }

  /**
   * Si no hay usuario guardado, regresa al login. Se llama al inicio de
   * galaxia.html y logros.html.
   */
  function requerirUsuario() {
    const usuario = obtenerUsuario();
    if (!usuario) {
      window.location.href = 'index.html';
      return null;
    }
    return usuario;
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_USUARIO);
    window.location.href = 'index.html';
  }

  /**
   * Dibuja el encabezado compartido dentro de <div id="cabecera"></div>.
   */
  function renderHeader(paginaActiva, usuario) {
    const contenedor = document.getElementById('cabecera');
    if (!contenedor) return;

    contenedor.innerHTML = `
      <header class="cabecera">
        <div class="cabecera__marca">
          <span class="cabecera__logo"></span>
          <span class="cabecera__titulo">Una Galaxia</span>
        </div>
        <nav class="cabecera__nav" aria-label="Navegación principal">
          <a href="galaxia.html" class="nav__link ${paginaActiva === 'galaxia' ? 'es-activo' : ''}">Galaxia</a>
          <a href="logros.html" class="nav__link ${paginaActiva === 'logros' ? 'es-activo' : ''}">Cometa</a>
        </nav>
        <div class="cabecera__usuario">
          <span class="usuario__saludo">Estrella, ${usuario}</span>
          <button id="botonSalir" class="boton boton--fantasma">Salir</button>
        </div>
      </header>
    `;

    document.getElementById('botonSalir').addEventListener('click', cerrarSesion);
  }

  global.MisionEspacial = {
    obtenerUsuario,
    guardarUsuario,
    logroDesbloqueado,
    desbloquearLogro,
    requerirUsuario,
    cerrarSesion,
    renderHeader,
  };
})(window);