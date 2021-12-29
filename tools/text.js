class Text extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.size = 14;
  }

  draw() {}

  textAlignHandler() {
    const textAlignContainer = createDiv();
    textAlignContainer.class("textAlignContainer");

    const activeAlignmentHanlder = () => {
      const images = selectAll(".textAlignContainer img");
      for (const img of images) {
        img.removeClass("active");
      }
    };

    const alignLeft = createImg(
      "../assets/left-align.svg",
      "Left Text Alignment"
    );
    alignLeft.class("alignLeft");
    alignLeft.mouseClicked(function () {
      // TODO: alignLeft
      activeAlignmentHanlder();
      alignLeft.addClass("active");
    });

    const alignRight = createImg(
      "../assets/right-align.svg",
      "Right Text Alignment"
    );
    alignRight.class("alignRight");
    alignRight.mouseClicked(function () {
      // TODO: alignRight
      activeAlignmentHanlder();
      alignRight.addClass("active");
    });

    const alignCenter = createImg(
      "../assets/center-align.svg",
      "Center Text Alignment"
    );
    alignCenter.class("alignCenter");
    alignCenter.mouseClicked(function () {
      // TODO: alignCenter
      activeAlignmentHanlder();
      alignCenter.addClass("active");
    });

    alignLeft.parent(textAlignContainer);
    alignCenter.parent(textAlignContainer);
    alignRight.parent(textAlignContainer);
    return textAlignContainer;
  }

  fontFamilyHandler() {}

  fontSizeHandler() {
    const inpContainer = createDiv(
      `<p class='optionTitle'>Font Size: <span class='optionValue'>${this.size}</span>px</p>`
    );
    inpContainer.class("fontSizeContainer");
    const inp = createInput(this.size, "number");
    inp.class("textInput");
    inp.input((e) => {
      this.size = +inp.value();
      select(".optionValue", inpContainer).elt.innerHTML = e.target.value;
    });
    inp.parent(inpContainer);
    return inpContainer;
  }

  fontStyleHandler() {}

  textRotateHanlder() {}

  textMoveHanlder() {}

  displayConfigOptions() {
    return [
      this.color.displayFill("text"),
      this.color.displayOutline("text"),
      this.fontSizeHandler(),
      this.textAlignHandler(),
    ];
  }
}
