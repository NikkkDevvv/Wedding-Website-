document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2025-11-24T08:00:00").getTime();
  const countdownContainer = document.querySelector(".countdown-container");

  if (countdownContainer) {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdownContainer.innerHTML = "<h3>Acara telah berlangsung</h3>";
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days.toString().padStart(3, "0");
      hoursEl.textContent = hours.toString().padStart(2, "0");
      minutesEl.textContent = minutes.toString().padStart(2, "0");
      secondsEl.textContent = seconds.toString().padStart(2, "0");
    }

    var countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  const stickyTop = document.querySelector(".sticky-top");
  const offcanvas = document.querySelector(".offcanvas");

  if (stickyTop && offcanvas) {
    offcanvas.addEventListener("show.bs.offcanvas", function () {
      stickyTop.style.overflow = "visible";

      setTimeout(function () {
        document.body.style.paddingRight = "0px";
      }, 0);
    });

    offcanvas.addEventListener("hidden.bs.offcanvas", function () {
      stickyTop.style.overflow = "hidden";
    });
  }

  //   const stickyTop = document.querySelector(".sticky-top");
  //   const offcanvas = document.querySelector(".offcanvas");

  //   if (stickyTop && offcanvas) {
  //     // Event ini berjalan SETELAH menu sepenuhnya terlihat
  //     offcanvas.addEventListener("shown.bs.offcanvas", function () {
  //       stickyTop.style.overflow = "visible";
  //       document.body.style.paddingRight = '0px';
  //     });

  //     offcanvas.addEventListener("hidden.bs.offcanvas", function () {
  //       stickyTop.style.overflow = "hidden";
  //     });
  //   }

  // BAGIAN 3: GALERI LIGHTBOX SEDERHANA
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("simple-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");

  if (galleryItems.length > 0 && lightbox && lightboxImage && closeButton) {
    const openLightbox = (imageSrc) => {
      lightboxImage.src = imageSrc;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    galleryItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        openLightbox(item.href);
      });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }
  const offcanvasLinks = document.querySelectorAll(
    "#offcanvasNavbar .nav-link"
  );

  const offcanvasElement = document.getElementById("offcanvasNavbar");

  const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

  offcanvasLinks.forEach((link) => {
    link.addEventListener("click", () => {
      bsOffcanvas.hide();
    });
  });
});

const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  // localStorage.setItem("opened", "true");
  playAudio();
}

function playAudio() {
  song.volume = 0.8;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
};

// if (!localStorage.getItem("opened")) {
//   disableScroll();
// }
disableScroll();