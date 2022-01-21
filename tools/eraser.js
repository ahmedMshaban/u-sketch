class Eraser extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.size = new Size();
  }

  draw() {
    if (mouseIsPressed) {
      push();
      noStroke();
      fill("white");
      ellipse(mouseX, mouseY, this.size.value, this.size.value);
      pop();
    }
  }

  displayConfigOptions() {
    return [this.size.displaySizeRange(1, 250, "eraser")];
  }
}
