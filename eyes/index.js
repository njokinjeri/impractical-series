function updatePointerVariables(e) {
  let style = document.documentElement.style;

  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const centerX = Math.floor(window.innerWidth / 2);
  const centerY = Math.floor(window.innerHeight / 2);

  style.setProperty('--mouse-x', mouseX);
  style.setProperty('--mouse-y', mouseY);
  style.setProperty('--center-x', centerX);
  style.setProperty('--center-y', centerY);

}

window.addEventListener("pointermove", updatePointerVariables);