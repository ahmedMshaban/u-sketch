class Triangle extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.isFilled = new IsFilled();
  }

  draw() {
    if (mouseIsPressed) {
      if (!this.isDrawing) {
        this.isDrawing = true;
        this.isFilled.status ? fill(this.color.fill) : noFill();
        stroke(this.color.outline);
        triangle(
          mouseX - 50,
          mouseY + 50,
          mouseX + 50,
          mouseY + 50,
          mouseX,
          mouseY - 50
        );
      }
    } else {
      this.isDrawing = false;
    }
  }

  displayConfigOptions() {
    return [
      this.color.displayFill("Triangle"),
      this.color.displayOutline("Triangle"),
      this.isFilled.displayConfigOptions(),
    ];
  }
}
