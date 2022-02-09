class Triangle extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.isFilled = new IsFilled();
    this.controller = new Controller();
    this.drag = new Draggable();
    this.rotate = new Rotate();
    this.x1 = -1;
    this.y1 = -1;
    this.x2 = -1;
    this.y2 = -1;
    this.x3 = -1;
    this.y3 = -1;
    this.side = 100;
  }

  draw() {
    if (mouseIsPressed) {
      //I'm not drawing
      if (!this.isDrawing) {
        loadPixels();
        //I'm drawing now...
        this.isDrawing = true;
        //Save the current mouse location
        this.x1 = mouseX;
        this.y1 = mouseY;
        this.x2 = mouseX;
        this.y2 = mouseY;
        this.x3 = mouseX;
        this.y3 = mouseY;

        //Display Triangle, open the controller and show it.
        this.displayTriangle();
        Controller.active = true;
        this.displayController();
      }

      this.drag.pressed(
        this.x1 - this.side - this.controller.gapX,
        this.y1 - this.side - this.controller.gapY / 2,
        this.controller.w + this.controller.gapX,
        this.side * 2 + this.controller.gapY
      );
    } else {
      //Chceck if I finish/discard changes
      if (Controller.active === false && this.isDrawing) {
        //Then stop drawing
        this.isDrawing = false;
        //Did I save cahnges?
        if (Controller.finishChanges === true) {
          //clear the background and load the last saved pixels
          //then re draw the text but without the controller
          background(255);
          updatePixels();
          this.displayTriangle();
          //reset the finishChanges status
          Controller.finishChanges = false;
          //save the pixels with the most recent draw
          loadPixels();
        }
      }

      //Am I still drawing?
      else if (this.isDrawing) {
        background(255);
        updatePixels();
        //Make sure we capture the latest side legnth
        this.side = +select(".sideLengthInput").value();
        this.displayTriangle();
        this.displayController();
      }

      // Quit dragging
      this.drag.released();
    }

    if (this.isDrawing) {
      //If I'm dragging
      if (this.drag.dragging) {
        background(255);
        //Save the current mouse location
        this.x1 = mouseX;
        this.y1 = mouseY;
        this.x2 = mouseX;
        this.y2 = mouseY;
        this.x3 = mouseX;
        this.y3 = mouseY;
        updatePixels();
        //Make sure we capture the latest side legnth
        this.side = +select(".sideLengthInput").value();
        this.displayTriangle();
        this.displayController();
      }

      //Is mouse over the Controller area
      this.drag.over(
        this.x1 - this.side - this.controller.gapX,
        this.y1 - this.side - this.controller.gapY / 2,
        this.controller.w + this.controller.gapX,
        this.side * 2 + this.controller.gapY
      );

      //Change cursor based on the current mouse location
      this.drag.show();
    }
  }

  displayController() {
    //Triangle Controller
    this.controller.x = this.x1;
    this.controller.y = this.y1;
    this.controller.w = this.side * 2 + this.controller.gapX / 2;
    this.controller.h = this.side * 2 + this.controller.gapY * 2;

    Controller.active ? this.controller.draw() : null;
  }

  displaySideLength() {
    const inpContainer = createDiv(
      `<p class='optionTitle'>Side Length: <span class='optionValue'>${this.side}</span></p>`
    );
    inpContainer.class("sideLengthContainer");
    const inp = createInput(this.side, "number");
    inp.class("sideLengthInput");
    inp.input((e) => {
      this.side = +inp.value();
      select(".optionValue", inpContainer).elt.innerHTML = e.target.value;
    });
    inp.parent(inpContainer);
    return inpContainer;
  }

  displayTriangle() {
    // Change the mode to DEGREES
    angleMode(DEGREES);
    push();
    this.isFilled.status ? fill(this.color.fill) : noFill();
    stroke(this.color.outline);
    translate(this.x1, this.y1);
    rotate(this.rotate.degree);
    triangle(-this.side, this.side, this.side, this.side, 0, -this.side);
    pop();
  }

  displayConfigOptions() {
    return [
      this.rotate.displayOptions(),
      this.displaySideLength(),
      this.color.displayFill("Triangle"),
      this.color.displayOutline("Triangle"),
      this.isFilled.displayConfigOptions(),
    ];
  }
}
