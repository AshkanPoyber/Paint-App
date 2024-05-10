const canvas = document.guerySelector("canvas"),
  ctx = canvas.getContext("2d");

const drawing = () => {
  ctx.LineTo();
};

canvas.addEventlistener("mousemove", drawing);
