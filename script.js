// Fondo de partículas
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

// ===================== ARTISTAS =====================
fetch("artistas.json")
.then(r => r.json())
.then(lista => {

  // Catálogo de artistas
  const gridArtistas = document.getElementById("artistas-grid");

  // Galería de artistas
  const galeriaArtistas = document.getElementById("galeria-artistas");

  lista.forEach(a => {

    // Card catálogo
    const card = document.createElement("div");
    card.className = "card-artista";
    card.innerHTML = `
      <img src="${a.img}">
      <h3>${a.nombre}</h3>
      <p>${a.descripcion}</p>
    `;
    gridArtistas.appendChild(card);

    // Foto para galería de artistas
    if (a.img && a.img.length > 5) {
      const foto = document.createElement("img");
      foto.src = a.img;
      galeriaArtistas.appendChild(foto);
    }
  });

});

// ===================== GALERÍA EXTRA =====================
fetch("galeria.json")
.then(r => r.json())
.then(fotos => {
  const galeriaExtras = document.getElementById("galeria-extras");

  fotos.forEach(link => {
    const img = document.createElement("img");
    img.src = link;
    galeriaExtras.appendChild(img);
  });
});
