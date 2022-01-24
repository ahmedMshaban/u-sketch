class Controller {
  static active = true;

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
      this.finish();
      pop();
    }
  }

  discard() {}

  finish() {
    let img = createImg("../assets/finish.svg", "finishChanges");
    img.elt.className = "finishCahngesIcon";
    img.position(this.x, this.y + this.h + this.gapY + this.imgSize);
    img.mouseClicked(() => {
        Controller.active = false;
    });
  }

  options() {}
}
