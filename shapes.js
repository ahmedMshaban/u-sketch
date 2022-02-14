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

  draw() {
    this.selectedShape.draw();
  }

  updateToolbar(shape) {
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

  displayShapeOptions(container) {
    const shapeConfigOptions = createDiv();
    shapeConfigOptions.class("optionsContainer");
    for (const [index, shape] of this.shapesList.entries()) {
      const shapeOptions = createDiv();

      if (index === 0) {
        shapeOptions.class("shapeOptions active");
      } else {
        shapeOptions.class("shapeOptions");
      }

      for (const option of shape.displayConfigOptions()) {
        option.parent(shapeOptions);
      }
      shapeOptions.parent(shapeConfigOptions);
    }
    shapeConfigOptions.parent(container);
  }

  updateShapeOptions(targetIndex) {
    const optionsContainer = select(
      "#" + this.shapesList[0].name + "sideBarItem .optionsContainer",
      "#sidebar"
    ).elt;
    for (const [
      currentIndex,
      option,
    ] of optionsContainer.childNodes.entries()) {
      if (currentIndex !== targetIndex) {
        option.className = "shapeOptions";
      } else {
        option.className = "shapeOptions active";
      }
    }
  }

  selectShape() {
    const selContainer = createDiv("<p class='optionTitle'>Shapes</p>");
    selContainer.class("shapesContainer");
    const sel = createSelect();
    for (const shape of this.shapesList) {
      sel.option(shape.name);
    }
    sel.selected(this.selectedShape.name);
    sel.changed(() => {
      if (Controller.active === true && this.selectedShape !== sel.value()) {
        alert(
          "Please save/discard changes first before you select a new shape!"
        );
        //Update the current selected shape
        sel.selected(this.selectedShape.name);
        return;
      }
      for (const [index, shape] of this.shapesList.entries()) {
        if (sel.value() === shape.name) {
          this.updateToolbar(shape);
          this.updateShapeOptions(index);
        }
      }
    });
    sel.parent(selContainer);

    this.displayShapeOptions(selContainer);

    return selContainer;
  }

  displayConfigOptions() {
    return [this.selectShape()];
  }
}
