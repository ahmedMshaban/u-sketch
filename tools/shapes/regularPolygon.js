class RegularPolygon extends Tools {
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
    this.radius = 100;
    this.points = 6;
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

        //Display Polygon, open the controller and show it.
        this.displayPolygon();
        Controller.active = true;
        this.displayController();
      }

      this.drag.pressed(
        this.previousMouseX - this.controller.w / 2,
        this.previousMouseY - this.controller.h / 2,
        this.controller.w +  this.controller.w / 2,
        this.controller.h +  this.controller.h / 2
      );
    } else {
      //Chceck if I finish/discard changes
      if (Controller.active === false && this.isDrawing) {
        //Then stop drawing
        this.isDrawing = false;
        //Did I save cahnges?
        if (Controller.finishChanges === true) {
          //clear the background and load the last saved pixels
          //then re draw the RegularPolygon but without the controller
          background(255);
          updatePixels();
          this.displayPolygon();
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
        this.displayPolygon();
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
        this.displayPolygon();
        this.displayController();
      }

      //Is mouse over the Controller area
      this.drag.over(
        this.previousMouseX - this.controller.w / 2,
        this.previousMouseY - this.controller.h / 2,
        this.controller.w +  this.controller.w / 2,
        this.controller.h +  this.controller.h / 2
      );

      //Change cursor based on the current mouse location
      this.drag.show();
    }
  }

  displayController() {
    //Polygon Controller
    this.controller.x = this.previousMouseX;
    this.controller.y = this.previousMouseY;
    this.controller.w = 30;
    this.controller.h = 30;

    Controller.active ? this.controller.draw() : null;
  }

  displayPolygon() {
    push();
    this.isFilled.status ? fill(this.color.fill) : noFill();
    stroke(this.color.outline);
    angleMode(RADIANS);
    translate(this.previousMouseX, this.previousMouseY);
    rotate((this.rotate.degree * PI) / 180); //Convert degrees to radians
    this.drawPolygon(0, 0, this.radius, this.points);
    pop();
  }

  drawPolygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      console.log(x);
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  displayRadius() {
    const inpContainer = createDiv(
      `<p class='optionTitle'>Radius: <span class='optionValue'>${this.radius}</span></p>`
    );
    inpContainer.class("radiusContainer");
    const inp = createInput(this.radius, "number");
    inp.class("radiusInput");
    inp.input((e) => {
      this.radius = +inp.value();
      select(".optionValue", inpContainer).elt.innerHTML = e.target.value;
    });
    inp.parent(inpContainer);
    return inpContainer;
  }

  displayNumOfPoints() {
    const inpContainer = createDiv(
      `<p class='optionTitle'>Number Of Points:: <span class='optionValue'>${this.points}</span></p>`
    );
    inpContainer.class("npointsContainer");
    const inp = createInput(this.points, "number");
    inp.class("npointsInput");
    inp.input((e) => {
      this.points = +inp.value();
      select(".optionValue", inpContainer).elt.innerHTML = e.target.value;
    });
    inp.parent(inpContainer);
    return inpContainer;
  }

  displayConfigOptions() {
    return [
      this.rotate.displayOptions(),
      this.displayRadius(),
      this.displayNumOfPoints(),
      this.color.displayFill("RegularPolygon"),
      this.color.displayOutline("RegularPolygon"),
      this.isFilled.displayConfigOptions(),
    ];
  }
}
