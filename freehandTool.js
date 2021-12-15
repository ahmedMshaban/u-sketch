class FreehandTool extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.previousMouseX = -1;
    this.previousMouseY = -1;
  }

  //to smoothly draw we'll draw a line from the previous mouse location
  //to the current mouse location. The following values store
  //the locations from the last frame. They are -1 to start with because
  //we haven't started drawing yet.

  draw() {
    //if the mouse is pressed
    if (mouseIsPressed) {
      //check if they previousX and Y are -1. set them to the current
      //mouse X and Y if they are.
      if (this.previousMouseX == -1) {
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;
      }
      //if we already have values for previousX and Y we can draw a line from
      //there to the current mouse location
      else {
        line(this.previousMouseX, this.previousMouseY, mouseX, mouseY);
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;
      }
    }
    //if the user has released the mouse we want to set the previousMouse values
    //back to -1.
    //try and comment out these lines and see what happens!
    else {
      this.previousMouseX = -1;
      this.previousMouseY = -1;
    }
  }
}
