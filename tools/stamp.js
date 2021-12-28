class Stamp extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.shapes = {
      Heart: loadImage("../assets/heart.svg"),
      Star: loadImage("../assets/star.svg"),
      "Thumbs up": loadImage("../assets/thumbs-up.svg"),
      "Thumbs down": loadImage("../assets/thumbs-down.svg"),
    };
    this.selectedShape = this.shapes["Heart"];
    this.size = new Size();
  }

  draw() {
    if (mouseIsPressed) {
      let shapeX = mouseX - this.size.value / 2;
      let shapeY = mouseY - this.size.value / 2;
      image(
        this.selectedShape,
        shapeX,
        shapeY,
        this.size.value,
        this.size.value
      );
    }
  }

  shapeListOptions() {
    const selContainer = createDiv("<p class='optionTitle'>Shapes</p>");
    selContainer.class("shapesContainer");
    const sel = createSelect();
    for (const shape in this.shapes) {
      sel.option(shape);
    }
    sel.selected(this.selectedShape);
    sel.changed(() => {
      for (const shape in this.shapes) {
        if (sel.value() === shape) {
          this.selectedShape = this.shapes[shape];
        }
      }
    });
    sel.parent(selContainer);
    return selContainer;
  }

  displayConfigOptions() {
    return [
      this.size.displaySizeRange(40, 50, "stampSize"),
      this.shapeListOptions(),
    ];
  }
}
