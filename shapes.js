class Shapes extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.shapesList = [
      new Triangle("../../assets/triangle.svg", "Triangle"),
      new Rectangle("../../assets/rectangle.svg", "Rectangle"),
      new Ellipse("../../assets/ellipse.svg", "Ellipse"),
      new RegularPolygon("../../assets/polygon.svg", "Regular Polygon"),
    ];
    this.selectedShape = this.shapesList[0];
  }

  draw() {}

  selectShape() {
    const selContainer = createDiv("<p class='optionTitle'>Shapes</p>");
    selContainer.class("shapesContainer");
    const sel = createSelect();
    for (const shape of this.shapesList) {
      sel.option(shape.name);
    }
    sel.selected(this.selectedShape.name);
    sel.changed(() => {
      for (const shape of this.shapesList) {
        if (sel.value() === shape.name) {
          //Select the current shape image on the toolbar
          const currentShapeImg = select(
            "#" + this.shapesList[0].name + "sideBarItem img",
            "#sidebar"
          ).elt;
          //Select the current shape tool tip on the toolbar
          const currentShapeTP = select(
            "#" + this.shapesList[0].name + "sideBarItem .tooltiptext",
            "#sidebar"
          ).elt;
          //Update current selected shape
          this.selectedShape = shape;
          //Update the current shape on the toolbar
          currentShapeImg.src = this.selectedShape.icon;
          currentShapeImg.alt = this.selectedShape.name;
          currentShapeTP.innerText = this.selectedShape.name;
        }
      }
    });
    return sel.parent(selContainer);
  }

  displayConfigOptions() {
    return [this.selectShape()];
  }
}
