class Size {
  constructor() {
    this.title = "Size";
    this.value = 1;
  }

  displaySizeRange(min, max, className) {
    const inp = createSlider(min, max, this.value, 1);
    const sizeObj = createDiv(
      `<p class="optionTitle">${this.title} <span class="optionValue">${this.value}</span></p>`
    );
    sizeObj.class(`optionContainer ${className}Size`);
    inp.class(`${className}SizeRange sizeRange slider`);
    inp.input(
      (e) => (select(".optionValue", sizeObj).elt.innerHTML = e.target.value)
    );
    inp.parent(sizeObj);
    return sizeObj;
  }
}
