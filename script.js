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

  const gridArtistas = document.getElementById("artistas-grid");
  const galeriaArtistas = document.getElementById("galeria-artistas");

  lista.forEach(a => {

    // Si no tiene imagen → usar logo MMG
    const foto = a.img && a.img.length > 5
      ? a.img
      : "https://iili.io/KtXqRHJ.md.png";

    // ----- Catálogo -----
    const card = document.createElement("div");
    card.className = "card-artista";
    card.innerHTML = `
      <img src="${foto}">
      <h3>${a.nombre}</h3>
      <p>${a.descripcion}</p>
    `;
    gridArtistas.appendChild(card);

    // ----- Galería de Artistas -----
    const img = document.createElement("img");
    img.src = foto;
    galeriaArtistas.appendChild(img);

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
