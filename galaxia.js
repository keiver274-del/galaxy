// galaxia.js — filtros de datos curiosos y visor de constelaciones
(function () {
  'use strict';

  const DATOS_GALAXIA = [
    { categoria: 'estrellas', titulo: 'Las Supernovas', texto: 'Fuego que renace al morir.' },
    { categoria: 'estrellas', titulo: 'La Estrella Más Grande', texto: 'UY Scuti es, hasta donde sabemos, la estrella más grande conocida: unas 1700 veces más ancha que el Sol.' },

    { categoria: 'planetas', titulo: 'Nuestra Galaxia', texto: 'La Vía Láctea tiene cientos de miles de millones de estrellas orbitando sin parar, pero qué suerte la mía que en todo este infinito fui a coincidir justamente contigo.' },
    { categoria: 'planetas', titulo: 'Vecinos Cercanos', texto: 'Apenas estamos empezando a descifrar nuestras propias galaxias, pero no necesito conocer todo el cosmos para saber que me encantas' },

    { categoria: 'estrellas', titulo: '¿Por qué brillan las estrellas?', texto: 'Dicen que las estrellas brillan por fusionar energía en su núcleo, pero la verdad es que se quedan cortas intentando competir con la luz de tus ojos..' },

    { categoria: 'constelaciones', titulo: 'Mapas en el Cielo', texto: 'Trazos de historia y memoria que unen estrellas lejanas.' },
  ];

  const CONSTELACIONES = [
    {
      nombre: 'Orión',
      estrellas: [
        { x: 60, y: 20, r: 2.4 }, { x: 110, y: 10, r: 3 }, { x: 150, y: 30, r: 2 },
        { x: 90, y: 70, r: 3.6, nombre: 'Cinturón' }, { x: 120, y: 75, r: 2.4 }, { x: 150, y: 80, r: 2 },
        { x: 70, y: 140, r: 2.6 }, { x: 160, y: 150, r: 3.2, nombre: 'Betelgeuse' },
      ],
      lineas: [[0,1],[1,2],[3,4],[4,5],[0,3],[2,5],[3,6],[5,7]],
    },
    {
      nombre: 'Cruz del Sur',
      estrellas: [
        { x: 150, y: 20, r: 3 }, { x: 150, y: 130, r: 3.4, nombre: 'Acrux' },
        { x: 90, y: 75, r: 2.4 }, { x: 210, y: 75, r: 2.4 },
      ],
      lineas: [[0,1],[2,3]],
    },
    {
      nombre: 'Osa Mayor',
      estrellas: [
        { x: 30, y: 60, r: 2.4 }, { x: 70, y: 50, r: 2.4 }, { x: 110, y: 55, r: 2.6 },
        { x: 150, y: 65, r: 2.8, nombre: 'Cazo' }, { x: 175, y: 40, r: 2.2 },
        { x: 210, y: 45, r: 2.4 }, { x: 240, y: 70, r: 2.6 },
      ],
      lineas: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,6]],
    },
  ];

  // Imagen que se muestra en el visor grande según el filtro activo.
  // Solo cambia el archivo: pon tus propias fotos en la carpeta img/ con
  // estos mismos nombres y se mostrarán automáticamente, sin tocar el código.
  const IMAGENES_FILTRO = {
    todos: 'galaxia.png',
    estrellas: 'estrellas.png',
    planetas: 'planetas.png',
    constelaciones: 'constelaciones.png',
  };
  const IMAGEN_RESPALDO = 'galaxia.png'; // se usa si el archivo del filtro aún no existe

  let filtroActivo = 'todos';
  let indiceConstelacion = 0;

  const $ = (sel) => document.querySelector(sel);
  const el = {
    filtroGalaxia: $('#filtroGalaxia'),
    columnaTarjetas: $('#columnaTarjetas'),
    imagenGalaxia: $('#imagenGalaxia'),
    nombreConstelacion: $('#nombreConstelacion'),
    botonCambiarConstelacion: $('#botonCambiarConstelacion'),
    svgConstelacion: $('#svgConstelacion'),
  };

  document.addEventListener('DOMContentLoaded', () => {
    const usuario = MisionEspacial.requerirUsuario();
    if (!usuario) return; // ya redirige a index.html
    MisionEspacial.renderHeader('galaxia', usuario);

    el.filtroGalaxia.addEventListener('click', manejarFiltro);
    el.botonCambiarConstelacion.addEventListener('click', siguienteConstelacion);
    renderGalaxia();
    renderConstelacion();
  });

  function renderGalaxia() {
    const lista = filtroActivo === 'todos'
      ? DATOS_GALAXIA
      : DATOS_GALAXIA.filter((d) => d.categoria === filtroActivo);

    el.columnaTarjetas.innerHTML = lista.map((dato) => `
      <div class="tarjeta-dato">
        <div class="tarjeta-dato__titulo">${dato.titulo}</div>
        <p class="tarjeta-dato__texto">${dato.texto}</p>
      </div>
    `).join('') || '<p class="tarjeta-dato">No hay datos para este filtro todavía.</p>';
  }

  function manejarFiltro(evento) {
    const boton = evento.target.closest('.filtro__boton');
    if (!boton) return;
    filtroActivo = boton.dataset.filtro;
    el.filtroGalaxia.querySelectorAll('.filtro__boton').forEach((b) => {
      b.classList.toggle('es-activo', b === boton);
      b.setAttribute('aria-selected', b === boton ? 'true' : 'false');
    });
    renderGalaxia();
    cambiarImagenVisor();
  }

  function cambiarImagenVisor() {
    const ruta = IMAGENES_FILTRO[filtroActivo] || IMAGEN_RESPALDO;
    el.imagenGalaxia.onerror = () => {
      el.imagenGalaxia.onerror = null; // evita bucles si tampoco existe la de respaldo
      el.imagenGalaxia.src = IMAGEN_RESPALDO;
    };
    el.imagenGalaxia.src = ruta;
  }

  function renderConstelacion() {
    const c = CONSTELACIONES[indiceConstelacion];
    el.nombreConstelacion.textContent = c.nombre;
    const partes = [];
    c.lineas.forEach(([a, b]) => {
      const ea = c.estrellas[a], eb = c.estrellas[b];
      partes.push(`<line x1="${ea.x}" y1="${ea.y}" x2="${eb.x}" y2="${eb.y}" />`);
    });
    c.estrellas.forEach((estrella) => {
      partes.push(`<circle cx="${estrella.x}" cy="${estrella.y}" r="${estrella.r}" />`);
      if (estrella.nombre) {
        partes.push(`<text x="${estrella.x + 6}" y="${estrella.y + 3}">${estrella.nombre}</text>`);
      }
    });
    el.svgConstelacion.innerHTML = partes.join('');
  }

  function siguienteConstelacion() {
    indiceConstelacion = (indiceConstelacion + 1) % CONSTELACIONES.length;
    renderConstelacion();
  }
})();
