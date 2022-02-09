class Ellipse extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.isFilled = new IsFilled();
    this.controller = new Controller();
    this.drag = new Draggable();
    this.rotate = new Rotate();
    this.previousMouseX = -1;
    this.previousMouseY = -1;
    this.width = 200;
    this.height = 100;
  }

  draw() {
    if (mouseIsPressed) {
      //I'm not drawing
      if (!this.isDrawing) {
        loadPixels();
        //I'm drawing now...
        this.isDrawing = true;
        //Save the current mouse location
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;

        //Display Ellipse, open the controller and show it.
        this.displayEllipse();
        Controller.active = true;
        this.displayController();
      }

      this.drag.pressed(
        (this.controller.x =
          this.previousMouseX - this.width / 2 - this.controller.gapX / 2),
        (this.controller.y =
          this.previousMouseY - this.height / 2 - this.controller.gapY / 2),
        (this.controller.w = this.width + this.controller.gapX),
        (this.controller.h = this.height + this.controller.gapY)
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
          this.displayEllipse();
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
        this.displayEllipse();
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
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;
        updatePixels();
        this.displayEllipse();
        this.displayController();
      }

      //Is mouse over the Controller area
      this.drag.over(
        (this.controller.x =
          this.previousMouseX - this.width / 2 - this.controller.gapX / 2),
        (this.controller.y =
          this.previousMouseY - this.height / 2 - this.controller.gapY / 2),
        (this.controller.w = this.width + this.controller.gapX),
        (this.controller.h = this.height + this.controller.gapY)
      );

      //Change cursor based on the current mouse location
      this.drag.show();
    }
  }

  displayController() {
    //Ellipse Controller
    this.controller.x = this.previousMouseX;
    this.controller.y = this.previousMouseY;
    this.controller.w = this.width;
    this.controller.h = this.height + this.controller.gapY * 2;

    Controller.active ? this.controller.draw() : null;
  }

  displayEllipse() {
    // Change the mode to DEGREES
    angleMode(DEGREES);
    push();
    this.isFilled.status ? fill(this.color.fill) : noFill();
    stroke(this.color.outline);
    translate(
      this.previousMouseX - this.width / 2,
      this.previousMouseY - this.height / 2
    );
    rotate(this.rotate.degree);
    ellipse(this.width / 2, this.height / 2, this.width, this.height);
    pop();
  }

  displayWidthLength() {
    const inpContainer = createDiv(
      `<p class='optionTitle'>Width Length: <span class='optionValue'>${this.width}</span></p>`
    );
    inpContainer.class("widthLengthContainer");
    const inp = createInput(this.width, "number");
    inp.class("widthLengthInput");
    inp.input((e) => {
      this.width = +inp.value();
      select(".optionValue", inpContainer).elt.innerHTML = e.target.value;
    });
    inp.parent(inpContainer);
    return inpContainer;
  }

  displayHeightLength() {
    const inpContainer = createDiv(
      `<p class='optionTitle'>Height Length: <span class='optionValue'>${this.height}</span></p>`
    );
    inpContainer.class("heightLengthContainer");
    const inp = createInput(this.height, "number");
    inp.class("heightLengthInput");
    inp.input((e) => {
      this.height = +inp.value();
      select(".optionValue", inpContainer).elt.innerHTML = e.target.value;
    });
    inp.parent(inpContainer);
    return inpContainer;
  }

  displayConfigOptions() {
    return [
      this.rotate.displayOptions(),
      this.displayWidthLength(),
      this.displayHeightLength(),
      this.color.displayFill("Ellipse"),
      this.color.displayOutline("Ellipse"),
      this.isFilled.displayConfigOptions(),
    ];
  }
}
