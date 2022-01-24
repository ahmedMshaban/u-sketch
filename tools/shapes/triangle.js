class Triangle extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.isFilled = new IsFilled();
    this.angle = 0;
    this.x1, this.y1, this.x2, this.y2, this.x3, (this.y3 = -1);
  }

  draw() {


    angleMode(DEGREES);
    if (mouseIsPressed) {
      if (!this.isDrawing) {
        this.isDrawing = true;
        this.isFilled.status ? fill(this.color.fill) : noFill();
        stroke(this.color.outline);
        angleMode(DEGREES);
        // translate(500, 500);
        rotate(this.angle);
        // triangle(0, 0, 100, 0, 50, -80); //Triangle x1, y1
        this.x1 = mouseX - 50;
        this.y1 = mouseY + 50;
        this.x2 = mouseX + 50;
        this.y2 = mouseY + 50;
        this.x3 = mouseX;
        this.y3 = mouseY - 50;
        triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
      }
    } else {
      this.isDrawing = false;
    }

    if (this.isDrawing) {
    }
  }

  show() {
    
  }

  displayConfigOptions() {
    return [
      this.color.displayFill("Triangle"),
      this.color.displayOutline("Triangle"),
      this.isFilled.displayConfigOptions(),
    ];
  }
}
