class Size {
  constructor(defaultValue = 1) {
    this.title = "Size";
    this.value = defaultValue;
  }

  displaySizeRange(min, max, className, title = "") {
    const inp = createSlider(min, max, min, 1);
    const sizeObj = createDiv(
      `<p class="optionTitle">${
        title !== "" ? title : this.title
      } <span class="optionValue">${
        this.value === null ? min : this.value
      }</span></p>`
    );
    sizeObj.class(`optionContainer ${className}Size`);
    inp.class(`${className}SizeRange sizeRange slider`);
    inp.input((e) => {
      select(".optionValue", sizeObj).elt.innerHTML = e.target.value;
      this.value = +e.target.value;
    });
    inp.parent(sizeObj);
    return sizeObj;
  }
}
