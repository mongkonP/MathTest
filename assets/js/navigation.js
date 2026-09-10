"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-navigate]").forEach((button) => {
    button.addEventListener("click", () => {
      const destination = button.dataset.navigate;
      if (!destination) return;

      const loadingBox = document.getElementById("loadingBox");
      if (loadingBox) loadingBox.style.display = "block";
      window.setTimeout(() => {
        window.location.href = destination;
      }, 150);
    });
  });

  document.querySelectorAll("[data-nav-home]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = button.dataset.navHome;
    });
  });
});
