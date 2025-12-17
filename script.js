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

fetch("./artistas.json")
.then(r => r.json())
.then(lista => {
  const container = document.getElementById("artistas-container");
  if (!container) return;

  lista.forEach(a => {
    const foto = a.img && a.img.length > 5 ? a.img : "https://iili.io/KtXqRHJ.md.png";

    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="card-artista">
        <img src="${foto}" alt="${a.nombre}">
        <h3>${a.nombre}</h3>
        <p>${a.descripcion}</p>
        <button class="btn-contratar" onclick="contratar('${a.nombre.replace(/'/g, "\\'")}')">🎤 Contratar Artista</button>
      </div>
    `;

    container.appendChild(slide);
  });

  new Swiper('.artistas-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 3500 },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
})
.catch(() => {});

fetch("./galeria.json")
.then(r => r.json())
.then(fotos => {
  const ultimas = document.getElementById("ultimas-galeria");
  if (ultimas) {
    ultimas.innerHTML = "";
    fotos.slice(0, 6).forEach(link => {
      const img = document.createElement("img");
      img.src = link;
      ultimas.appendChild(img);
    });
  }

  const galeria = document.getElementById("galeria-extras");
  const btnMas = document.getElementById("btn-ver-mas");
  const btnMenos = document.getElementById("btn-ver-menos");

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

  if (btnMas) btnMas.addEventListener("click", () => {
    cantidad += 20;
    render();
  });

  if (btnMenos) btnMenos.addEventListener("click", () => {
    cantidad = 20;
    render();
    window.location.hash = "#galeria";
  });

  render();

  const btnAbrir = document.getElementById("btn-abrir-galeria");
  const seccionGaleria = document.getElementById("galeria");

  if (btnAbrir && seccionGaleria) {
    btnAbrir.addEventListener("click", () => {
      seccionGaleria.style.display = "block";
      setTimeout(() => {
        seccionGaleria.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }

  const btnCerrar = document.getElementById("btn-cerrar-galeria");
  const seccionUltimas = document.getElementById("ultimas-fotos");

  if (btnCerrar && seccionGaleria) {
    btnCerrar.addEventListener("click", () => {
      seccionGaleria.style.display = "none";
      if (seccionUltimas) {
        setTimeout(() => {
          seccionUltimas.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });
  }
})
.catch(() => {});