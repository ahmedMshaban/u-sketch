class Draggable {
  //this class inspired by https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
  constructor() {
    this.title = "Move";
    this.dragging = false;
    this.rollover = false;
  }

  over(objectX, objectY, objectW, objectH) {
    // Is mouse over object
    // This would handle the text object
    if (
      mouseX > objectX &&
      mouseX < objectX + objectW &&
      mouseY < objectY &&
      mouseY > objectY + objectH
    ) {
      this.rollover = true;
    } //This would handle the shapes Triangle, ellipse, etc...
    else if (
      mouseX > objectX &&
      mouseX < objectX + objectW &&
      mouseY > objectY &&
      mouseY < objectY + objectH
    ) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  show() {
    if (this.rollover) {
      cursor("grab");
    } else {
      cursor("auto");
    }
  }

  pressed(objectX, objectY, objectW, objectH) {
    // Did I click on the Object?
    if (
      // This would handle the text object
      mouseX > objectX &&
      mouseX < objectX + objectW &&
      mouseY < objectY &&
      mouseY > objectY + objectH
    ) {
      this.dragging = true;
      this.offsetX = objectX - mouseX;
      this.offsetY = objectY - mouseY;
    } else if (
      //This would handle the shapes Triangle, ellipse, etc...
      mouseX > objectX &&
      mouseX < objectX + objectW &&
      mouseY > objectY &&
      mouseY < objectY + objectH
    ) {
      this.dragging = true;
      this.offsetX = objectX - mouseX;
      this.offsetY = objectY - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}
