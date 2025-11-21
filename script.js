// Partículas
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

// CONTRATAR
function contratar(nombre){
  const numero = "5491157343551";
  const mensaje = encodeURIComponent(`Hola 👋, quiero contratar a ${nombre} (MMG | Representante de Artistas).`);
  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}

// ARTISTAS
fetch("artistas.json")
.then(r => r.json())
.then(lista => {
  const container = document.getElementById("artistas-container");

  lista.forEach(a => {
    const foto = a.img && a.img.length > 5 ? a.img : "https://iili.io/KtXqRHJ.md.png";

    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="card-artista">
        <img src="${foto}">
        <h3>${a.nombre}</h3>
        <p>${a.descripcion}</p>
        <button class="btn-contratar" onclick="contratar('${a.nombre}')">🎤 Contratar Artista</button>
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
});

// GALERÍA
fetch("galeria.json")
.then(r => r.json())
.then(fotos => {

  const galeria = document.getElementById("galeria-extras");
  const btnMas = document.getElementById("btn-ver-mas");
  const btnMenos = document.getElementById("btn-ver-menos");

  let cantidad = 20;

  function render(){
    galeria.innerHTML = "";

    fotos.slice(0, cantidad).forEach(link => {
      const img = document.createElement("img");
      img.src = link;
      galeria.appendChild(img);
    });

    btnMenos.style.display = cantidad > 20 ? "block" : "none";
    btnMas.style.display = cantidad >= fotos.length ? "none" : "block";
  }

  btnMas.addEventListener("click", () => {
    cantidad += 20;
    render();
  });

  btnMenos.addEventListener("click", () => {
    cantidad = 20;
    render();
    window.location.hash = "#galeria";
  });

  render();
});
