class Controller {
  constructor(posX = 0, posY = 0, width = 0, height = 0) {
    this.x = posX;
    this.y = posY;
    this.w = width;
    this.h = height;
    this.gapX = 25;
    this.gapY = 25;
    this.active = false;
  }

  draw() {
    if (this.active) {
      push();
      rectMode(CENTER);
      noFill();
      stroke("gray");
      rect(this.x, this.y, this.w + this.gapX, this.h - this.gapY);
      pop();
    }
  }

  discard() {
    this.active.false;
  }

  finish() {
    this.active = false;
  }

  options() {}
}
