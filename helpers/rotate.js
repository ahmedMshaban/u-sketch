class Rotate {
  constructor(defaultValue = 0) {
    this.degree = defaultValue;
  }

  displayOptions() {
    const inpContainer = createDiv(
      `<p class='optionTitle'>Rotate Degree: <span class='optionValue'>${this.degree}</span><sup>°</sup></p>`
    );
    inpContainer.class("rotateDegreeContainer");
    const inp = createInput(this.degree, "number");
    inp.class("rotateInput");
    inp.input((e) => {
      if (+inp.value() <= 360 && +inp.value() >= 0) {
        this.degree = +inp.value();
        select(".optionValue", inpContainer).elt.innerHTML = e.target.value;
      } else {
        alert("Please enter value between 0 and 360");
      }
    });
    inp.parent(inpContainer);
    return inpContainer;
  }
}
