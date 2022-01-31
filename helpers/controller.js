class Controller {
  static active = false;
  static finishChanges = false;

  constructor(posX = 0, posY = 0, width = 0, height = 0) {
    this.x = posX;
    this.y = posY;
    this.w = width;
    this.h = height;
    this.gapX = 25;
    this.gapY = 25;
    this.imgSize = 15;
  }

  draw() {
    if (Controller.active) {
      push();
      rectMode(CENTER);
      noFill();
      stroke("gray");
      rect(this.x, this.y, this.w + this.gapX, this.h - this.gapY);
      this.showControllerButtons();
      pop();
    }
  }

  showControllerButtons() {
    select(".controller-buttons").addClass("active");
  }

  options() {}
}
