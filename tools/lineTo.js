//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the
//pixel array.
class LineTo extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.endMouseX = -1;
    this.endMouseX = -1;
    this.controllerFP = new Controller(); //First point Controller
    this.controllerSP = new Controller(); //Second point Controller
    this.size = new Size();
    this.color = new Color();
  }

  //draws the line to the screen
  draw() {
    //only draw when mouse is clicked
    if (mouseIsPressed) {
      //if it's the start of drawing a new line
      if (this.startMouseX == -1) {
        //save the current pixel Array
        loadPixels();
        //I'm drawing now...
        this.isDrawing = true;
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
      } else {
        //update the screen with the saved pixels to hide any previous
        //line between mouse pressed and released
        updatePixels();
        //draw the line
        this.drawLine();
        //Open the controller and show it.
        Controller.active = true;
        //Get the current mouse location
        this.endMouseX = mouseX;
        this.endMouseY = mouseY;
        this.displayFPController();
        this.displaySPController();
      }
    } else if (this.isDrawing) {
      //save the pixels with the most recent line and reset the
      //drawing bool and start locations
      loadPixels();
      this.isDrawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
    }
  }

  drawLine() {
    push();
    strokeWeight(this.size.value);
    stroke(this.color.outline);
    line(this.startMouseX, this.startMouseY, mouseX, mouseY);
    pop();
  }

  displayFPController() {
    this.controllerFP.x = this.startMouseX;
    this.controllerFP.y = this.startMouseY;
    this.controllerFP.w = max(10, this.size.value);
    this.controllerFP.h = max(10, this.size.value);

    Controller.active ? this.controllerFP.draw() : null;
  }

  displaySPController() {
    this.controllerSP.x = this.endMouseX;
    this.controllerSP.y = this.endMouseY;
    this.controllerSP.w = max(10, this.size.value);
    this.controllerSP.h = max(10, this.size.value);

    Controller.active ? this.controllerSP.draw() : null;
  }

  topBottomPointsHandler() {}

  displayConfigOptions() {
    return [
      this.color.displayOutline("lineTo"),
      this.size.displaySizeRange(1, 250, "lineTo"),
    ];
  }
}
