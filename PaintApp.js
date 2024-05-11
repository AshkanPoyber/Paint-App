const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color"),
  sizeSlider = document.querySelector("#size-slider"),
  colorBtns = document.querySelectorAll(".colors .option"),
  colorPicker = document.querySelector("#color-picker"),
  ctx = canvas.getContext("2d");

//Global Variables With Default Value !
let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5,
  selectedColor = "#000";

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
  ctx.beginPath(); //Creating New Path To Draw Circle !
  //Getting Radius For Circle According To The mouse Pointer !
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); //Creating Circle According To The Mouse Pointer !
  fillColor.checked ? ctx.fill() : ctx.stroke(); //If fillColor Is Checked Fill Circle Else Draw Border Circle !
};

const drawTriangle = (e) => {
  ctx.beginPath(); //Creating New Path To Draw Circle !
  ctx.moveTo(prevMouseX, prevMouseY); //Moving Triangle To The Mouse Pointer !
  ctx.lineTo(e.offsetX, e.offsetY); //Creating First Line According To The Mouse Pointer !
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); //Creating Bottom Line Of Triangle !
  ctx.closePath(); //Close Path Of A Triangle So The Third Line Draw Automatically !
  fillColor.checked ? ctx.fill() : ctx.stroke(); //If fillColor Is Checked Fill Triangle Else Draw Border Triangle !
};

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX; //Passing Current MouseX Position As prevMouseX Value !
  prevMouseY = e.offsetY; //Passing Current MouseY Position As prevMouseY Value !
  ctx.beginPath(); //Creating New Path To Draw !
  ctx.lineWidth = brushWidth; //Passing brushSize As Line Width !
  ctx.strokeStyle = selectedColor; //Passing selectedColor As Stroke Style !
  ctx.fillStyle = selectedColor; //Passing selectedColor As Fill Style !
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
  } else {
    drawTriangle(e);
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

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value)); //Passing Slider Value As brushSize !

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    //Adding Click Event To All Color Button !
    //Removing Active Class From The Previous Option And Adding On Current Clicked Option !
    document.querySelector(".options .selected").classList.remove("selected");
    btn.classList.add("selected");
    //Passing Selected btn Background Color As selectedColor value !
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
