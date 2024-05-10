const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  ctx = canvas.getContext("2d");

//Global Variables With Default Value !
let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5;

window.addEventListener("load", () => {
  //Setting Canvas Width & Height ~ offsetWidth & Height Return Viewable Width & Height Of An Element !
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const drawRect = (e) => {
  ctx.strokeRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX; //Passing Current MouseX Position As prevMouseX Value !
  prevMouseY = e.offsetY; //Passing Current MouseY Position As prevMouseY Value !
  ctx.beginPath(); //Creating New Path To Draw !
  ctx.lineWidth = brushWidth; //Passing brushSize As Line Width !
  //Copying Canvas Data & Passing As Snapshot Value ~ This Avoids Dragging The Image !
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
  if (!isDrawing) return; //If isDrawing Is False Return From Here !

  if (selectedTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY); //Creating Line According To The Mouse Pointer !
    ctx.stroke(); //Drawing & Filling Line With Color !
  } else if (selectedTool === "rectangle") {
    // Corrected the tool name
    drawRect(e);
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    //Adding Click Event To All Tool Option !
    //Removing Active Class From The Previous Option And Adding On Current Clicked Option !
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
