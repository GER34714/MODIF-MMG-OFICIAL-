// ===================== PARTICLES =====================
if (window.particlesJS) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color: { value: "#b97cff" },
      shape: { type: "circle" },
      opacity: { value: 0.35 },
      size: { value: 2.2, random: true },
      line_linked: { enable: true, distance: 140, color: "#b97cff", opacity: 0.18, width: 1 },
      move: { enable: true, speed: 1.2 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
      modes: { grab: { distance: 160, line_linked: { opacity: 0.22 } }, push: { particles_nb: 2 } }
    },
    retina_detect: true
  });
}

// ===================== DESTACADOS (NO VAN AL CATÁLOGO) =====================
const DESTACADOS = new Set([
  "dami levante",
  "delro",
  "los creadores",
  "dario el angel del amor",
  "axel flp",
  "kevin quiroz",
  "franco flou 999",
  "tomy lp"
].map(normalizeText));

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function pick(obj, keys, fallback = "") {
  for (const k of keys) {
    if (obj && obj[k] != null && String(obj[k]).trim() !== "") return obj[k];
  }
  return fallback;
}

function renderCard(artista) {
  const nombre = pick(artista, ["nombre", "name", "artista", "titulo"], "Artista");
  const imagen = pick(artista, ["imagen", "foto", "img", "image"], "");
  const safeImg = imagen ? String(imagen) : "https://iili.io/fF3u6Q4.jpg";

  return `
    <article class="card-artista">
      <img loading="lazy" src="${safeImg}" alt="${nombre}">
      <div class="info">
        <h3>${nombre}</h3>
      </div>
    </article>
  `;
}

async function loadArtistas() {
  const destEl = document.getElementById("destacados-container");
  const catEl = document.getElementById("artistas-container");

  if (!destEl || !catEl) return;

  let data = [];
  try {
    const res = await fetch("artistas.json", { cache: "no-store" });
    data = await res.json();
    if (!Array.isArray(data)) data = [];
  } catch (e) {
    data = [];
  }

  const destacados = [];
  const catalogo = [];

  for (const a of data) {
    const nombre = pick(a, ["nombre", "name", "artista", "titulo"], "");
    const key = normalizeText(nombre);
    if (DESTACADOS.has(key)) destacados.push(a);
    else catalogo.push(a);
  }

  // Render destacados
  destEl.innerHTML = destacados.length
    ? destacados.map(renderCard).join("")
    : `<div class="test-box">Todavía no cargaron los destacados (revisá que los nombres en artistas.json coincidan).</div>`;

  // Render catálogo en swiper
  catEl.innerHTML = "";
  for (const a of catalogo) {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = renderCard(a);
    catEl.appendChild(slide);
  }

  // Init Swiper
  new Swiper(".artistas-swiper", {
    slidesPerView: 1.15,
    spaceBetween: 14,
    centeredSlides: false,
    loop: false,
    navigation: {
      nextEl: ".artistas-swiper .swiper-button-next",
      prevEl: ".artistas-swiper .swiper-button-prev"
    },
    pagination: {
      el: ".artistas-swiper .swiper-pagination",
      clickable: true
    },
    breakpoints: {
      520: { slidesPerView: 2.1 },
      900: { slidesPerView: 3.1 }
    }
  });
}

loadArtistas();

// ===================== GALERÍA (6 ÚLTIMAS + RESTO EN COMPLETA) =====================
// Poné acá TODAS tus fotos en orden (primero las más nuevas).
const FOTOS_GALERIA = [
  "https://iili.io/fcjuI.jpg"
  // Agregá el resto acá...
];

const ultimasEl = document.getElementById("ultimas-galeria");
const extrasEl = document.getElementById("galeria-extras");
const secGaleria = document.getElementById("galeria");

const btnAbrir = document.getElementById("btn-abrir-galeria");
const btnCerrar = document.getElementById("btn-cerrar-galeria");
const btnMas = document.getElementById("btn-ver-mas");
const btnMenos = document.getElementById("btn-ver-menos");

const ULTIMAS_CANT = 6;
const PAGE_SIZE = 18;

let visibleCount = 0;

function imgTag(url) {
  return `<img loading="lazy" src="${url}" alt="MMG foto">`;
}

function renderUltimas() {
  if (!ultimasEl) return;
  const ult = FOTOS_GALERIA.slice(0, ULTIMAS_CANT);
  ultimasEl.innerHTML = ult.length
    ? ult.map(imgTag).join("")
    : `<div class="test-box">Todavía no hay fotos cargadas.</div>`;
}

function renderGaleriaCompleta() {
  if (!extrasEl) return;

  const resto = FOTOS_GALERIA.slice(ULTIMAS_CANT);
  const slice = resto.slice(0, visibleCount);

  extrasEl.innerHTML = slice.length
    ? slice.map(imgTag).join("")
    : `<div class="test-box">No hay más fotos para mostrar.</div>`;

  const hayResto = resto.length > 0;
  const puedeVerMas = hayResto && visibleCount < resto.length;
  const puedeVerMenos = hayResto && visibleCount > PAGE_SIZE;

  if (btnMas) btnMas.style.display = puedeVerMas ? "inline-block" : "none";
  if (btnMenos) btnMenos.style.display = puedeVerMenos ? "inline-block" : "none";
}

function abrirGaleria() {
  if (!secGaleria) return;
  secGaleria.style.display = "block";
  if (visibleCount === 0) visibleCount = PAGE_SIZE;
  renderGaleriaCompleta();
  secGaleria.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cerrarGaleria() {
  if (!secGaleria) return;
  secGaleria.style.display = "none";
}

if (btnAbrir) btnAbrir.addEventListener("click", abrirGaleria);
if (btnCerrar) btnCerrar.addEventListener("click", cerrarGaleria);

if (btnMas) btnMas.addEventListener("click", () => {
  const resto = FOTOS_GALERIA.slice(ULTIMAS_CANT);
  visibleCount = Math.min(visibleCount + PAGE_SIZE, resto.length);
  renderGaleriaCompleta();
});

if (btnMenos) btnMenos.addEventListener("click", () => {
  visibleCount = PAGE_SIZE;
  renderGaleriaCompleta();
  if (secGaleria) secGaleria.scrollIntoView({ behavior: "smooth", block: "start" });
});

renderUltimas();