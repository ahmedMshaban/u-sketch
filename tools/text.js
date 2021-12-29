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

    const alignJustify = createImg(
      "../assets/justify-align.svg",
      "Center Text Alignment"
    );
    alignJustify.class("alignCenter");
    alignJustify.mouseClicked(function () {
      // TODO: alignJustify
      activeAlignmentHanlder();
      alignJustify.addClass("active");
    });

    alignLeft.parent(textAlignContainer);
    alignCenter.parent(textAlignContainer);
    alignRight.parent(textAlignContainer);
    alignJustify.parent(textAlignContainer);

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

  fontStyleHandler() {
    const fontStyleContainer = createDiv();
    fontStyleContainer.class("fontStyleContainer");

    const activeStyleHanlder = () => {
      const images = selectAll(".fontStyleContainer img");
      for (const img of images) {
        img.removeClass("active");
      }
    };

    const boldStyle = createImg("../assets/bold-style.svg", "Bold Style");
    boldStyle.class("boldStyle");
    boldStyle.mouseClicked(function () {
      // TODO: boldStyle
      activeStyleHanlder();
      boldStyle.addClass("active");
    });

    const strikethroughStyle = createImg(
      "../assets/strikethrough-style.svg",
      "Strikethrough Style"
    );
    strikethroughStyle.class("strikethroughStyle");
    strikethroughStyle.mouseClicked(function () {
      // TODO: strikethroughStyle
      activeStyleHanlder();
      strikethroughStyle.addClass("active");
    });

    const underlineStyle = createImg(
      "../assets/underline-style.svg",
      "Underline Style"
    );
    underlineStyle.class("underlineStyle");
    underlineStyle.mouseClicked(function () {
      // TODO: underlineStyle
      activeStyleHanlder();
      underlineStyle.addClass("active");
    });

    const italicStyle = createImg("../assets/italic-style.svg", "Italic Style");
    italicStyle.class("italicStyle");
    italicStyle.mouseClicked(function () {
      // TODO: italicStyle
      activeStyleHanlder();
      italicStyle.addClass("active");
    });

    boldStyle.parent(fontStyleContainer);
    strikethroughStyle.parent(fontStyleContainer);
    underlineStyle.parent(fontStyleContainer);
    italicStyle.parent(fontStyleContainer);

    return fontStyleContainer;
  }

  textRotateHanlder() {}

  textMoveHanlder() {}

  displayConfigOptions() {
    return [
      this.color.displayFill("text"),
      this.color.displayOutline("text"),
      this.fontSizeHandler(),
      this.textAlignHandler(),
      this.fontStyleHandler(),
    ];
  }
}
