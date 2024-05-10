const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(),
  ctx = canvas.getContext("2d");

let isDrawing = false,
  brushWidth = 5;

window.addEventListener("load", () => {
  //Setting Canvas Width & Height ~ offsetwidth & height Return Viewable Width & Height Of An Element !
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
  isDrawing = true;
  ctx.beginPath(); //Creating New path To Draw !
  ctx.lineWidth = brushWidth; //Passing brushSize As line Width !
};

const drawing = (e) => {
  if (!isDrawing) return; //If isdrawing Is False return From Here !
  ctx.lineTo(e.offsetX, e.offsetY); //Creating Line According To The Mouse Pointer !
  ctx.stroke(); //Drawing & Filling Line With Color !
};

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
