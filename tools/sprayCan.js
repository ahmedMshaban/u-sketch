class SprayCan extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.points = 13;
    this.spread = 10;
  }

  draw() {
    const r = random(5, 10);
    if (mouseIsPressed) {
      for (let i = 0; i < this.points; i++) {
        point(
          random(mouseX - this.spread, mouseX + this.spread),
          random(mouseY - this.spread, mouseY + this.spread)
        );
      }
    }
  }
}
