//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the
//pixel array.
class LineTo extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.drawing = false;
    this.size = new Size();
    this.color = new Color();
  }

  //draws the line to the screen
  draw() {
    //only draw when mouse is clicked
    if (mouseIsPressed) {
      //if it's the start of drawing a new line
      if (this.startMouseX == -1) {
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
        this.drawing = true;
        //save the current pixel Array
        loadPixels();
      } else {
        //update the screen with the saved pixels to hide any previous
        //line between mouse pressed and released
        updatePixels();
        //draw the line
        strokeWeight(this.size.value);
        stroke(this.color.outline);
        line(this.startMouseX, this.startMouseY, mouseX, mouseY);
      }
    } else if (this.drawing) {
      //save the pixels with the most recent line and reset the
      //drawing bool and start locations
      loadPixels();
      this.drawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
    }
  }

  topBottomPointsHandler() {

  }

  displayConfigOptions() {
    return [
      this.color.displayOutline("lineTo"),
      this.size.displaySizeRange(1, 250, "lineTo"),
    ];
  }
}
