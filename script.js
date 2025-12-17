fetch("artistas.json")
  .then(r => r.json())
  .then(data => {
    const destacados = data.filter(a => a.destacado);
    const normales = data.filter(a => !a.destacado);

    const destCont = document.getElementById("destacados-container");
    destacados.forEach(a => destCont.innerHTML += card(a));

    const catCont = document.getElementById("artistas-container");
    normales.forEach(a => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = card(a);
      catCont.appendChild(slide);
    });

    new Swiper(".artistas-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: true,
      breakpoints: {
        768: { slidesPerView: 3 }
      }
    });
  });

const fotos = [
  "https://iili.io/fcjuI.jpg",
  "https://iili.io/fcjuI.jpg",
  "https://iili.io/fcjuI.jpg",
  "https://iili.io/fcjuI.jpg",
  "https://iili.io/fcjuI.jpg",
  "https://iili.io/fcjuI.jpg",
  "https://iili.io/fcjuI.jpg"
];

const ult = document.getElementById("ultimas-galeria");
const gal = document.getElementById("galeria-extras");

fotos.forEach((f, i) => {
  const img = `<img src="${f}">`;
  if (i < 6) ult.innerHTML += img;
  else gal.innerHTML += img;
});

document.getElementById("btn-abrir-galeria").onclick = () =>
  document.getElementById("galeria").classList.remove("oculto");

document.getElementById("btn-cerrar-galeria").onclick = () =>
  document.getElementById("galeria").classList.add("oculto");

function card(a) {
  return `
    <div class="card-artista">
      <img src="${a.imagen}">
      <h3>${a.nombre}</h3>
    </div>
  `;
}