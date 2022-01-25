document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

// BARRA DE MENU FIJA AUNQUE DEMOS SCROLL.
function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

//SMOOTH SCROLL.
//esta funcion nos permite dar smooth scroll hacia los enlaces del menu, osea baja lentamente
function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// esta funcion sirve para llamar las imagenes de la carpeta y generar una galeria de imagenes
// IMPORTANTE DE APRENDER!!!!!
function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `<source srcset="build/img/thumb/${i}.avif" type="image/avif" />
        <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
        <img
          loading="lazy"
          width="200"
          height="300"
          src="build/img/thumb/${i}.jpg"
          alt="imagen galeria"
        />`;

    //"onclick" accion de dar click
    // al darle click a una imagen de la galeria hara lo siguiente
    imagen.onclick = function () {
      mostrarImagen(i);
    };
    /* appendChild() sirve para agregar elementos como hijos al elemento que le declares
         como aqui abajo se le esta agregando "imagen" como hijo al elemento "galeria"*/
    galeria.appendChild(imagen);
  }
}

// function para crear en grande la imagen de la galeria que le des click
function mostrarImagen(numeroImagen) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `<source srcset="build/img/grande/${numeroImagen}.avif" type="image/avif" />
        <source srcset="build/img/grande/${numeroImagen}.webp" type="image/webp" />
        <img
          loading="lazy"
          width="200"
          height="300"
          src="build/img/grande/${numeroImagen}.jpg"
          alt="imagen galeria"
        />`;

  //crea el overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  // permite cerrar la imagen dando click en cualquier parte.
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove(); // quita el haber abierto la imagen.
  };

  // boton para cerrar el modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");

  // accion de dar click para cerrar.
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body"); // quita el no poder dar scroll una vez cerrada la imagen
    overlay.remove(); // quita el haber abierto la imagen.
  };

  overlay.appendChild(cerrarModal);

  //añadirlo al html
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
