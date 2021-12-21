class Color {
  constructor() {
    this.fill = "#000000";
    this.outline = "#000000";
  }

  displayFill(className) {
    const inp = createInput(this.fill, "color");
    const fillObj = createDiv(`<p class="optionTitle">Fill</p>`);
    fillObj.class(`${className}fillColor optionContainer fillColor`);
    inp.parent(fillObj);
    inp.input((e) => {
      this.fill = e.target.value;
    });
    return fillObj;
  }

  displayOutline(className) {
    const inp = createInput(this.outline, "color");
    const outlineObj = createDiv(`<p class="optionTitle">Outline</p>`);
    outlineObj.class(`${className}outlineColor optionContainer outlineColor`);
    inp.parent(outlineObj);
    inp.input((e) => {
      this.outline = e.target.value;
    });
    return outlineObj;
  }
}
