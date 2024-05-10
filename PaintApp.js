const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

const drawing = (e) => {
  ctx.lineTo(e.offsetX, e.offsetY); //Creating Line According To The Mouse Pointer !
  ctx.stroke(); //Drawing/Filling Line With Color !
};

canvas.addEventListener("mousemove", drawing);
