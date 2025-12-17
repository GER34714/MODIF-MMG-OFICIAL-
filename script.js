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

function normName(s){
  return String(s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function safeOnClickName(nombre){
  return String(nombre || "").replace(/'/g, "\\'");
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
].map(normName);

function buildSlideHTML(a){
  const foto = a.img && a.img.length > 5 ? a.img : "https://iili.io/KtXqRHJ.md.png";
  const nombre = a.nombre || "Artista";
  const descripcion = a.descripcion || "";

  return `
    <div class="card-artista">
      <img src="${foto}" alt="${nombre}">
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <button class="btn-contratar" onclick="contratar('${safeOnClickName(nombre)}')">🎤 Contratar Artista</button>
    </div>
  `;
}

function initSwiper(swiperSelector, prevClass, nextClass){
  return new Swiper(swiperSelector, {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    navigation: {
      nextEl: `.${nextClass}`,
      prevEl: `.${prevClass}`
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}

fetch("./artistas.json")
  .then(r => {
    if(!r.ok) throw new Error("No se pudo cargar artistas.json");
    return r.json();
  })
  .then(lista => {
    const contDest = document.getElementById("destacados-container");
    const contCat = document.getElementById("artistas-container");
    if (!contDest || !contCat) return;

    const destacados = [];
    const resto = [];

    lista.forEach(a => {
      const n = normName(a.nombre);
      if (DESTACADOS.includes(n)) destacados.push(a);
      else resto.push(a);
    });

    destacados.sort((a,b) => DESTACADOS.indexOf(normName(a.nombre)) - DESTACADOS.indexOf(normName(b.nombre)));
    const catalogoOrdenado = [...destacados, ...resto];

    destacados.forEach(a => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = buildSlideHTML(a);
      contDest.appendChild(slide);
    });

    catalogoOrdenado.forEach(a => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = buildSlideHTML(a);
      contCat.appendChild(slide);
    });

    initSwiper("#destacados-swiper", "destacados-prev", "destacados-next");
    initSwiper("#catalogo-swiper", "catalogo-prev", "catalogo-next");
  })
  .catch(err => console.log("Error artistas:", err));

fetch("./galeria.json")
  .then(r => {
    if(!r.ok) throw new Error("No se pudo cargar galeria.json");
    return r.json();
  })
  .then(fotos => {
    const ultimas = document.getElementById("ultimas-galeria");
    const modal = document.getElementById("galeria-modal");
    const galeria = document.getElementById("galeria-extras");

    const btnAbrir = document.getElementById("btn-abrir-galeria");
    const btnCerrar = document.getElementById("btn-cerrar-galeria");

    const btnMas = document.getElementById("btn-ver-mas");
    const btnMenos = document.getElementById("btn-ver-menos");

    if (ultimas) {
      ultimas.innerHTML = "";
      fotos.slice(0, 9).forEach(link => {
        const img = document.createElement("img");
        img.src = link;
        ultimas.appendChild(img);
      });
    }

    let cantidad = 20;

    function render(){
      if (!galeria) return;

      galeria.innerHTML = "";
      fotos.slice(0, cantidad).forEach(link => {
        const img = document.createElement("img");
        img.src = link;
        galeria.appendChild(img);
      });

      if (btnMenos) btnMenos.style.display = cantidad > 20 ? "block" : "none";
      if (btnMas) btnMas.style.display = cantidad >= fotos.length ? "none" : "block";
    }

    if (btnAbrir && modal) {
      btnAbrir.addEventListener("click", () => {
        modal.style.display = "block";
        cantidad = 20;
        render();
      });
    }

    if (btnCerrar && modal) {
      btnCerrar.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    if (btnMas) btnMas.addEventListener("click", () => {
      cantidad += 20;
      render();
    });

    if (btnMenos) btnMenos.addEventListener("click", () => {
      cantidad = 20;
      render();
      if (modal) modal.scrollTo({ top: 0, behavior: "smooth" });
    });
  })
  .catch(err => console.log("Error galería:", err));