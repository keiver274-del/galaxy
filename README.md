# Misión Espacial (versión 100% HTML/CSS/JS, sin PHP)

Ya no necesitas ningún servidor con PHP. Todo el progreso (nombre de usuario, nivel,
logros) se guarda en el **localStorage** del navegador, así que puedes abrir la carpeta
directamente con doble clic en `index.html`.

## Estructura

```
mision-espacial-html/
├── index.html      → Login (pide nombre, sin contraseña)
├── juego.html       → Juego de los planetas/estrellas
├── galaxia.html       → Datos curiosos + visor de constelaciones
├── logros.html          → Insignias y el mensaje especial del Nivel 5
├── css/style.css          → Estilos (tema espacial)
└── js/
    ├── comun.js             → Guarda/lee usuario y progreso en localStorage, dibuja el encabezado
    ├── login.js               → Lógica del login
    ├── juego.js                → Niveles del juego (pregunta distinta en cada uno)
    ├── galaxia.js                → Filtros de datos curiosos + constelaciones
    └── logros.js                   → Insignias + modal del mensaje especial
```

## Cómo abrirla

Simplemente abre `index.html` con doble clic, o —mejor— sírvela con cualquier servidor
estático simple para evitar restricciones del navegador con archivos locales:

```bash
cd mision-espacial-html
python3 -m http.server 8000
```
y entra a `http://localhost:8000`.

Con WampServer también funciona: copia la carpeta dentro de `www\`, activa Apache
y entra a `http://localhost/mision-espacial-html/`. Ya no necesitas tocar `httpd-vhosts`
ni PHP; solo Apache sirviendo archivos estáticos.

## Cómo funciona el progreso

- `js/comun.js` guarda el nombre en `localStorage['mision_espacial_usuario']`.
- El progreso de cada usuario se guarda en `localStorage['mision_espacial_progreso_<nombre>']`.
- Como es local al navegador, **el progreso no se comparte entre dispositivos** (a
  diferencia de la versión con PHP, que guardaba en el servidor). Si abres la página en
  el celular y en la laptop, cada uno tendrá su propio progreso independiente.

## El juego: una pregunta distinta por nivel

1. **Nivel 1** — Ordena los planetas por temperatura.
2. **Nivel 2** — Ordena los planetas por tamaño.
3. **Nivel 3** — Ordena los planetas por distancia al Sol.
4. **Nivel 4** — Ordena las estrellas por tamaño.
5. **Nivel 5** — Ordena las estrellas por temperatura superficial.

## Personalizar

- Preguntas y niveles: arreglo `NIVELES` en `js/juego.js`.
- Mensaje especial: función `MENSAJE_ESPECIAL` en `js/logros.js`.
- Datos curiosos / constelaciones: `js/galaxia.js`.
- Colores y tipografía: variables CSS al inicio de `css/style.css`.
