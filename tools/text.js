class Text extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.size = 14;
    this.style = "normal";
    this.decorationSThrough = "none";
    this.decorationUnderline = "none";
    this.weight = "normal";
    this.alignment = "left";
    //Te following fonts are safe fonts for HTML and CSS and
    //available on all major operating systems and using
    //fallback fonts in case they are not available.
    this.fonts = {
      Arial: "Arial, sans-seri",
      Verdana: "Verdana, sans-serif",
      Helvetica: "Helvetica, sans-serif",
      "Trebuchet MS": "'Trebuchet MS', sans-serif",
      Tahoma: "Tahoma, sans-serif",
      "Times New Roman": "'Times New Roman', serif",
      Georgia: "Georgia, serif",
      Garamond: "Garamond, serif",
      "Courier New": "'Courier New', monospace",
      "Brush Script MT": "'Brush Script MT', cursive",
    };
    this.selectedFont = this.fonts["Arial"];
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
    //active by default
    alignLeft.addClass("active");
    alignLeft.mouseClicked(() => {
      activeAlignmentHanlder();
      this.alignment = "left";
      alignLeft.addClass("active");
    });

    const alignRight = createImg(
      "../assets/right-align.svg",
      "Right Text Alignment"
    );
    alignRight.class("alignRight");
    alignRight.mouseClicked(() => {
      activeAlignmentHanlder();
      this.alignment = "right";
      alignRight.addClass("active");
    });

    const alignCenter = createImg(
      "../assets/center-align.svg",
      "Center Text Alignment"
    );
    alignCenter.class("alignCenter");
    alignCenter.mouseClicked(() => {
      activeAlignmentHanlder();
      this.alignment = "center";
      alignCenter.addClass("active");
    });

    const alignJustify = createImg(
      "../assets/justify-align.svg",
      "Center Text Alignment"
    );
    alignJustify.class("alignCenter");
    alignJustify.mouseClicked(() => {
      activeAlignmentHanlder();
      this.alignment = "justify";
      alignJustify.addClass("active");
    });

    alignLeft.parent(textAlignContainer);
    alignCenter.parent(textAlignContainer);
    alignRight.parent(textAlignContainer);
    alignJustify.parent(textAlignContainer);

    return textAlignContainer;
  }

  fontFamilyHandler() {
    const fontFamilyContainer = createDiv(
      "<p class='optionTitle'>Font Family</p>"
    );
    fontFamilyContainer.class("fontFamilyContainer");
    const sel = createSelect();
    for (const font in this.fonts) {
      sel.option(font);
    }
    sel.selected(this.selectedFont);
    sel.changed(() => {
      for (const font in this.fonts) {
        if (sel.value() === font) {
          this.selectedFont = this.fonts[font];
        }
      }
    });
    sel.parent(fontFamilyContainer);
    return fontFamilyContainer;
  }

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

    const boldStyle = createImg("../assets/bold-style.svg", "Bold Style");
    boldStyle.class("boldStyle");
    boldStyle.mouseClicked(() => {
      if (this.weight === "bold") {
        this.weight = "normal";
        boldStyle.removeClass("active");
      } else {
        this.weight = "bold";
        boldStyle.addClass("active");
      }
    });

    const strikethroughStyle = createImg(
      "../assets/strikethrough-style.svg",
      "Strikethrough Style"
    );
    strikethroughStyle.class("strikethroughStyle");
    strikethroughStyle.mouseClicked(() => {
      if (this.decorationSThrough === "line-through") {
        this.decorationSThrough = "none";
        strikethroughStyle.removeClass("active");
      } else {
        this.decorationSThrough = "line-through";
        strikethroughStyle.addClass("active");
      }
    });

    const underlineStyle = createImg(
      "../assets/underline-style.svg",
      "Underline Style"
    );
    underlineStyle.class("underlineStyle");
    underlineStyle.mouseClicked(() => {
      if (this.underlineStyle === "underline") {
        this.underlineStyle = "none";
        underlineStyle.removeClass("active");
      } else {
        this.underlineStyle = "underline";
        underlineStyle.addClass("active");
      }
    });

    const italicStyle = createImg("../assets/italic-style.svg", "Italic Style");
    italicStyle.class("italicStyle");
    italicStyle.mouseClicked(() => {
      if (this.style === "italic") {
        this.style = "normal";
        italicStyle.removeClass("active");
      } else {
        this.style = "italic";
        italicStyle.addClass("active");
      }
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
      this.fontFamilyHandler(),
      this.fontSizeHandler(),
      this.textAlignHandler(),
      this.fontStyleHandler(),
    ];
  }
}
