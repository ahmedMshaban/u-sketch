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
    sel.option("Heart");
    sel.option("Star");
    sel.option("Thumbs up");
    sel.option("Thumbs down");
    sel.selected("Heart");
    sel.changed(() => {
      switch (sel.value()) {
        case "Heart":
          this.selectedShape = this.shapes["Heart"];
          break;
        case "Star":
          this.selectedShape = this.shapes["Star"];
          break;
        case "Thumbs up":
          this.selectedShape = this.shapes["Thumbs up"];
          break;
        case "Thumbs down":
          this.selectedShape = this.shapes["Thumbs down"];
          break;
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
