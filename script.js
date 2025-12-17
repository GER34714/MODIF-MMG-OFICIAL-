/* =========================
     script.js (COMPLETO)
========================= */
particlesJS('particles-js', {
  particles:{
    number:{value:70},
    color:{value:["#d4af37","#b97cff"]},
    opacity:{value:0.5,random:true},
    size:{value:3,random:true},
    move:{enable:true,speed:1.4},
    line_linked:{enable:false}
  }
});

function contratar(nombre){
  const numero = "5491157343551";
  const mensaje = encodeURIComponent(`Hola 👋, quiero contratar a ${nombre} (MMG | Representante de Artistas).`);
  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}

function normalizar(txt){
  return txt.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const DESTACADOS = [
  "damy levante",
  "delro",
  "los creadores",
  "dario el angel del amor",
  "axel flp",
  "kevin quiroz",
  "franco flow 999",
  "tomy lp"
].map(normalizar);

/* ================= ARTISTAS ================= */

fetch("artistas.json")
.then(r => r.json())
.then(lista => {

  const contDest = document.getElementById("destacados-container");
  const contCat  = document.getElementById("artistas-container");

  const destacados = [];
  const catalogo = [];

  lista.forEach(a => {
    if (DESTACADOS.includes(normalizar(a.nombre))) {
      destacados.push(a);
    } else {
      catalogo.push(a);
    }
  });

  function crearSlide(a){
    const foto = a.img && a.img.length > 5 ? a.img : "https://iili.io/KtXqRHJ.md.png";
    return `
      <div class="card-artista">
        <img src="${foto}">
        <h3>${a.nombre}</h3>
        <p>${a.descripcion}</p>
        <button class="btn-contratar" onclick="contratar('${a.nombre.replace(/'/g,"\\'")}')">
          🎤 Contratar Artista
        </button>
      </div>
    `;
  }

  destacados.forEach(a => {
    const d = document.createElement("div");
    d.className = "swiper-slide";
    d.innerHTML = crearSlide(a);
    contDest.appendChild(d);
  });

  catalogo.forEach(a => {
    const d = document.createElement("div");
    d.className = "swiper-slide";
    d.innerHTML = crearSlide(a);
    contCat.appendChild(d);
  });

  new Swiper("#destacados-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation:{
      nextEl: ".destacados-next",
      prevEl: ".destacados-prev"
    },
    breakpoints:{
      320:{slidesPerView:1},
      768:{slidesPerView:2},
      1024:{slidesPerView:3}
    }
  });

  new Swiper("#catalogo-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation:{
      nextEl: ".catalogo-next",
      prevEl: ".catalogo-prev"
    },
    breakpoints:{
      320:{slidesPerView:1},
      768:{slidesPerView:2},
      1024:{slidesPerView:3}
    }
  });
});

/* ================= GALERÍA ================= */

fetch("galeria.json")
.then(r => r.json())
.then(fotos => {

  const ultimas = document.getElementById("ultimas-galeria");
  const galeria = document.getElementById("galeria-extras");

  const btnAbrir  = document.getElementById("btn-abrir-galeria");
  const btnCerrar = document.getElementById("btn-cerrar-galeria");
  const btnMas    = document.getElementById("btn-ver-mas");
  const btnMenos  = document.getElementById("btn-ver-menos");

  /* 🔥 ÚLTIMAS FOTOS (SOLO 6) */
  ultimas.innerHTML = "";
  fotos.slice(-6).forEach(link => {
    const img = document.createElement("img");
    img.src = link;
    ultimas.appendChild(img);
  });

  let cantidad = 20;

  function renderGaleria(){
    galeria.innerHTML = "";
    fotos.slice(0, cantidad).forEach(link => {
      const img = document.createElement("img");
      img.src = link;
      galeria.appendChild(img);
    });

    btnMenos.style.display = cantidad > 20 ? "block" : "none";
    btnMas.style.display   = cantidad >= fotos.length ? "none" : "block";
  }

  btnAbrir.onclick = () => {
    document.getElementById("galeria-modal").style.display = "block";
    cantidad = 20;
    renderGaleria();
  };

  btnCerrar.onclick = () => {
    document.getElementById("galeria-modal").style.display = "none";
  };

  btnMas.onclick = () => {
    cantidad += 20;
    renderGaleria();
  };

  btnMenos.onclick = () => {
    cantidad = 20;
    renderGaleria();
  };
});