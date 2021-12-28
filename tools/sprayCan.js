class SprayCan extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.points = 13;
    this.spread = 10;
    this.color = new Color();
  }

  draw() {
    const r = random(5, 10);
    if (mouseIsPressed) {
      strokeWeight(1);
      for (let i = 0; i < this.points; i++) {
        point(
          random(mouseX - this.spread, mouseX + this.spread),
          random(mouseY - this.spread, mouseY + this.spread)
        );
      }
    }
  }

  pointsHanlder() {
    const inp = createSlider(13, 50, this.points);
    const pointsObj = createDiv(
      `<p class="optionTitle">Points <span class="optionValue">${this.points}</span></p>`
    );
    pointsObj.class(`optionContainer sprayCan`);
    inp.class('points sizeRange slider');
    inp.input((e) => {
      select(".optionValue", pointsObj).elt.innerHTML = e.target.value;
      this.points = +e.target.value;
    });
    inp.parent(pointsObj);
    return pointsObj;
  }

  spreadHanlder() {
    const inp = createSlider(10, 50, this.spread);
    const spreadObj = createDiv(
      `<p class="optionTitle">Spread <span class="optionValue">${this.spread}</span></p>`
    );
    spreadObj.class(`optionContainer sprayCan`);
    inp.class('spread sizeRange slider');
    inp.input((e) => {
      select(".optionValue", spreadObj).elt.innerHTML = e.target.value;
      this.spread = +e.target.value;
    });
    inp.parent(spreadObj);
    return spreadObj;
  }

  displayConfigOptions() {
    return [
      this.color.displayOutline("sprayCan"),
      this.pointsHanlder(),
      this.spreadHanlder()
    ];
  }
}
