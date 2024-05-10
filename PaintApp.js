const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color"),
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
  //If fillColor Is Not Checked Draw A Rect With Border Else Draw Rect With Background !
  if (!fillColor.checked) {
    //Creating Circle According To The Mouse Pointer !
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawCircle = (e) => {
  ctx.arc(prevMouseX, prevMouseY, 50, 0, 2 * Math.PI);
  ctx.stroke();
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
  ctx.putImageData(snapshot, 0, 0); //Adding Copied Canvas Data On Ti This Canvas !

  if (selectedTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY); //Creating Line According To The Mouse Pointer !
    ctx.stroke(); //Drawing & Filling Line With Color !
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
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
