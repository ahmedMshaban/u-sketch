class mirrorDrawTool extends Tools {
  constructor(icon, name) {
    super(icon, name);
    //which axis is being mirrored (x or y) x is default
    this.axis = "x";
    //line of symmetry is halfway across the screen
    this.lineOfSymmetry = width / 2;
    //where was the mouse on the last time draw was called.
    //set it to -1 to begin with
    this.previousMouseX = -1;
    this.previousMouseY = -1;

    //mouse coordinates for the other side of the Line of symmetry.
    this.previousOppositeMouseX = -1;
    this.previousOppositeMouseY = -1;
  }

  draw() {
    //display the last save state of pixels
    updatePixels();

    //do the drawing if the mouse is pressed
    if (mouseIsPressed) {
      //if the previous values are -1 set them to the current mouse location
      //and mirrored positions
      if (this.previousMouseX == -1) {
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;
        this.previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
        this.previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
      }

      //if there are values in the previous locations
      //draw a line between them and the current positions
      else {
        line(this.previousMouseX, this.previousMouseY, mouseX, mouseY);
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;

        //these are for the mirrored drawing the other side of the
        //line of symmetry
        const oX = this.calculateOpposite(mouseX, "x");
        const oY = this.calculateOpposite(mouseY, "y");
        line(this.previousOppositeMouseX, this.previousOppositeMouseY, oX, oY);
        this.previousOppositeMouseX = oX;
        this.previousOppositeMouseY = oY;
      }
    }
    //if the mouse isn't pressed reset the previous values to -1
    else {
      this.previousMouseX = -1;
      this.previousMouseY = -1;

      this.previousOppositeMouseX = -1;
      this.previousOppositeMouseY = -1;
    }

    //after the drawing is done save the pixel state. We don't want the
    //line of symmetry to be part of our drawing

    loadPixels();

    //push the drawing state so that we can set the stroke weight and colour
    push();
    strokeWeight(3);
    stroke("red");
    //draw the line of symmetry
    if (this.axis == "x") {
      line(width / 2, 0, width / 2, height);
    } else {
      line(0, height / 2, width, height / 2);
    }
    //return to the original stroke
    pop();
  }

  /*calculate an opposite coordinate the other side of the
   *symmetry line.
   *@param n number: location for either x or y coordinate
   *@param a [x,y]: the axis of the coordinate (y or y)
   *@return number: the opposite coordinate
   */
  calculateOpposite(n, a) {
    //if the axis isn't the one being mirrored return the same
    //value
    if (a != this.axis) {
      return n;
    }

    //if n is less than the line of symmetry return a coorindate
    //that is far greater than the line of symmetry by the distance from
    //n to that line.
    if (n < this.lineOfSymmetry) {
      return this.lineOfSymmetry + (this.lineOfSymmetry - n);
    }

    //otherwise a coordinate that is smaller than the line of symmetry
    //by the distance between it and n.
    else {
      return this.lineOfSymmetry - (n - this.lineOfSymmetry);
    }
  }

  //when the tool is deselected update the pixels to just show the drawing and
  //hide the line of symmetry. Also clear options
  unselectTool() {
    updatePixels();
  }

  //adds a button and click handler to the options area. When clicked
  //toggle the line of symmetry between horizonatl to vertical
  populateOptions() {
    select(".options").html(
      "<button id='directionButton'>Make Horizontal</button>"
    );
    // 	//click handler
    select("#directionButton").mouseClicked(function () {
      const button = select("#" + this.elt.id);
      if (self.axis == "x") {
        self.axis = "y";
        self.lineOfSymmetry = height / 2;
        button.html("Make Vertical");
      } else {
        self.axis = "x";
        self.lineOfSymmetry = width / 2;
        button.html("Make Horizontal");
      }
    });
  }
}
