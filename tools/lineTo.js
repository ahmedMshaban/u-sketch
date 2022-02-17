//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the
//pixel array.
class LineTo extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.endMouseX = -1;
    this.endMouseY = -1;
    this.controllerFP = new Controller(); //First point Controller
    this.controllerSP = new Controller(); //Second point Controller
    this.dragFP = new Draggable(); //First point drag
    this.dragSP = new Draggable(); //Second point drag
    this.size = new Size();
    this.color = new Color();
    this.finishedLine = false;
  }

  //draws the line to the screen
  draw() {
    //only draw when   mouse is clicked
    if (mouseIsPressed) {
      if (!this.finishedLine) {
        //if it's the start of drawing a new line
        if (this.startMouseX == -1) {
          //save the current pixel Array
          loadPixels();
          //I'm drawing now...
          this.isDrawing = true;

          //Save the starting mouse location
          this.startMouseX = mouseX;
          this.startMouseY = mouseY;

          //Open the controller and show it.
          Controller.active = true;
        } else {
          //update the screen with the saved pixels to hide any previous
          //line between mouse pressed and released
          updatePixels();
          //draw the line
          this.drawLine();
          //Get the current mouse location
          this.endMouseX = mouseX;
          this.endMouseY = mouseY;
          //To make sure the two points are not overlapping
          if (
            this.startMouseX === this.endMouseX &&
            this.startMouseY === this.endMouseY
          ) {
            this.endMouseX = mouseX + this.size.value + 15;
          }
          this.displayFPController();
          this.displaySPController();
        }
      }
      //First point
      this.dragFP.pressed(
        this.startMouseX - this.controllerFP.w / 2,
        this.startMouseY - this.controllerFP.h / 2,
        this.controllerFP.w,
        this.controllerFP.h
      );

      //Second point
      this.dragSP.pressed(
        this.endMouseX - this.controllerSP.w / 2,
        this.endMouseY - this.controllerSP.h / 2,
        this.controllerSP.w,
        this.controllerSP.h
      );
    } else {
      //Chceck if I finish/discard changes
      if (Controller.active === false && this.isDrawing) {
        //Then stop drawing
        this.isDrawing = false;

        //Did I save cahnges?
        if (Controller.finishChanges === true) {
          //clear the background and load the last saved pixels
          //then re draw the Line but without the controller
          background(255);
          updatePixels();

          this.drawLine();
          //reset the finishChanges status
          Controller.finishChanges = false;
          //save the pixels with the most recent draw
          loadPixels();
          //save the pixels with the most recent line
        }

        //reset the and start locations
        this.startMouseX = -1;
        this.startMouseY = -1;
        this.endMouseX = -1;
        this.endtMouseY = -1;
        this.finishedLine = false;
      }

      //Am I still drawing?
      else if (this.isDrawing) {
        //This means I released the mouse
        this.finishedLine = true;
        background(255);
        updatePixels();
        //To make sure the two points are not overlapping
        if (
          this.startMouseX === this.endMouseX &&
          this.startMouseY === this.endMouseY
        ) {
          this.endMouseX = mouseX + this.size.value + 15;
        }
        this.drawLine();
        this.displayFPController();
        this.displaySPController();
      }

      // Quit dragging
      this.dragFP.released();
      this.dragSP.released();
    }

    if (this.isDrawing && this.finishedLine) {
      //If I'm dragging the first point
      if (this.dragFP.dragging) {
        background(255);
        //Save the current mouse location
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
        updatePixels();
        this.drawLine();
        this.displayFPController();
        this.displaySPController();
      }

      //Is mouse over the Controller area of the first point
      this.dragFP.over(
        this.startMouseX - this.controllerFP.w / 2,
        this.startMouseY - this.controllerFP.h / 2,
        this.controllerFP.w,
        this.controllerFP.h
      );

      //Change cursor based on the current mouse location
      this.dragFP.show();

      //If I'm dragging the second point
      if (this.dragSP.dragging) {
        background(255);
        //Save the current mouse location
        this.endMouseX = mouseX;
        this.endMouseY = mouseY;
        updatePixels();
        this.drawLine();
        this.displayFPController();
        this.displaySPController();
      }

      //Is mouse over the Controller area of the first point
      this.dragSP.over(
        this.endMouseX - this.controllerSP.w / 2,
        this.endMouseY - this.controllerSP.h / 2,
        this.controllerSP.w,
        this.controllerSP.h
      );

      //Change cursor based on the current mouse location
      this.dragSP.show();
    }
  }

  drawLine() {
    push();
    strokeWeight(this.size.value);
    stroke(this.color.outline);
    line(this.startMouseX, this.startMouseY, this.endMouseX, this.endMouseY);
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

  displayConfigOptions() {
    return [
      this.color.displayOutline("lineTo"),
      this.size.displaySizeRange(1, 250, "lineTo"),
    ];
  }
}
