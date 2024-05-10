const canvas = document.guerySelector("canvas"),
  ctx = canvas.getContext("2d");

const drawing = (e) => {
  ctx.LineTo(e.offsetX, e.offsetY); //Creating Line According To The Mouse Pointer !
  ctx.stroke(); //Drawing/Filling Line With Color !
};

canvas.addEventlistener("mousemove", drawing);
