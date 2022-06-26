import React from 'react';

const CambiaFondo = () => {
  const pageHeader = document.querySelector(".page-header");
  const fondoHeader = "fondoHeader";
  let targetScroll = window.innerHeight - pageHeader.offsetHeight;

  window.addEventListener("scroll", () => {
    const scrollY = this.pageYOffset;

    if (scrollY > targetScroll | window.location.pathname !== '/index') {
        pageHeader.classList.add(fondoHeader);
    } else {
        pageHeader.classList.remove(fondoHeader);
    }
  });

  window.addEventListener("resize", () => {
    targetScroll = window.innerHeight - pageHeader.offsetHeight;
  });
};

export default CambiaFondo;
