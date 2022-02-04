class Triangle extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.isFilled = new IsFilled();
    this.x1 = -1;
    this.y1 = -1;
    this.x2 = -1;
    this.y2 = -1;
    this.x3 = -1;
    this.y3 = -1;
  }

  draw() {
    if (mouseIsPressed) {
      if (!this.isDrawing) {
        this.isDrawing = true;
      }
    } else {
      this.isDrawing = false;
    }

    if (this.isDrawing) {
    }
  }

  displayTriangle() {
    this.isFilled.status ? fill(this.color.fill) : noFill();
    stroke(this.color.outline);
    this.x1 = mouseX - 50;
    this.y1 = mouseY + 50;
    this.x2 = mouseX + 50;
    this.y2 = mouseY + 50;
    this.x3 = mouseX;
    this.y3 = mouseY - 50;
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  displayConfigOptions() {
    return [
      this.color.displayFill("Triangle"),
      this.color.displayOutline("Triangle"),
      this.isFilled.displayConfigOptions(),
    ];
  }
}
