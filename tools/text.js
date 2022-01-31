class Text extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
    this.controller = new Controller();
    this.size = 14;
    this.fontScalar = 0.8;
    this.fontBaseline = 0;
    this.ascVal = null;
    //where was the mouse on the last time draw was called.
    //set it to -1 to begin with
    this.previousMouseX = -1;
    this.previousMouseY = -1;
    this.with;
    this.height;
    this.drag = new Draggable();
    this.style = "normal";
    this.decorationSThrough = "none";
    this.decorationUnderline = "none";
    this.weight = "normal";
    this.alignment = "center";
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
    this.message = "Hello from another world";
  }

  draw() {
    if (mouseIsPressed) {
      //I'm not drawing
      if (!this.isDrawing) {
        loadPixels();
        //I'm drawing now...
        this.isDrawing = true;
        //Save the current mouse location
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;

        //Display Text, open the controller and show it.
        this.displayText();
        Controller.active = true;
        this.displayController();
      }
    } else {
      //Chceck if I finish/discard changes
      if (Controller.active === false && this.isDrawing) {
        //Then stop drawing
        this.isDrawing = false;
        //Did I save cahnges?
        if (Controller.finishChanges === true) {
          //clear the background and load the last saved pixels
          //then re draw the text but without the controller
          background(255);
          updatePixels();
          this.displayText();
          //reset the finishChanges status
          Controller.finishChanges = false;
          //save the pixels with the most recent draw
          loadPixels();
        }
      }

      //Am I still drawing?
      else if (this.isDrawing) {
        background(255);
        updatePixels();
        this.displayText();
        this.displayController();
      }
    }
  }

  displayText() {
    //Font Size
    textSize(this.size);

    //Font Family
    textFont(this.selectedFont);

    //Font Style
    if (this.style === "italic" && this.weight === "bold") {
      textStyle(BOLDITALIC);
    } else if (this.style === "italic") {
      textStyle(ITALIC);
    } else if (this.weight === "bold") {
      textStyle(BOLD);
    } else {
      textStyle(NORMAL);
    }

    //Font Color
    fill(this.color.fill);

    //Font Stroke color
    stroke(this.color.outline);

    //Text decoration Underline
    if (this.decorationUnderline === "underline") {
      if (this.alignment === "center" || this.alignment === "justify") {
        line(
          this.previousMouseX - textWidth(this.message) / 2,
          this.previousMouseY + (textAscent() * this.fontScalar) / 2,
          this.previousMouseX + textWidth(this.message) / 2,
          this.previousMouseY + (textAscent() * this.fontScalar) / 2
        );
      } else if (this.alignment === "left") {
        line(
          this.previousMouseX -
            textWidth(this.message) / 2 -
            this.controller.gapX / 2,
          this.previousMouseY + (textAscent() * this.fontScalar) / 2,
          this.previousMouseX +
            textWidth(this.message) / 2 -
            this.controller.gapX / 2,
          this.previousMouseY + (textAscent() * this.fontScalar) / 2
        );
      } else {
        line(
          this.previousMouseX -
            textWidth(this.message) / 2 +
            this.controller.gapX / 2,
          this.previousMouseY + (textAscent() * this.fontScalar) / 2,
          this.previousMouseX +
            textWidth(this.message) / 2 +
            this.controller.gapX / 2,
          this.previousMouseY + (textAscent() * this.fontScalar) / 2
        );
      }
    }

    //Text decoration Through
    if (this.decorationSThrough === "line-through") {
      this.ascVal = textAscent() * this.fontScalar;
      if (this.alignment === "center" || this.alignment === "justify") {
        line(
          this.previousMouseX - textWidth(this.message) / 2,
          this.previousMouseY + this.fontBaseline,
          this.previousMouseX + textWidth(this.message) / 2,
          this.previousMouseY + this.fontBaseline
        );
      } else if (this.alignment === "left") {
        line(
          this.previousMouseX -
            textWidth(this.message) / 2 -
            this.controller.gapX / 2,
          this.previousMouseY + this.fontBaseline,
          this.previousMouseX +
            textWidth(this.message) / 2 -
            this.controller.gapX / 2,
          this.previousMouseY + this.fontBaseline
        );
      } else {
        line(
          this.previousMouseX -
            textWidth(this.message) / 2 +
            this.controller.gapX / 2,
          this.previousMouseY + this.fontBaseline,
          this.previousMouseX +
            textWidth(this.message) / 2 +
            this.controller.gapX / 2,
          this.previousMouseY + this.fontBaseline
        );
      }
    }

    //Output the text on the correct location on the canvas and controller
    if (this.alignment === "center" || this.alignment === "justify") {
      text(
        this.message,
        this.previousMouseX - textWidth(this.message) / 2,
        this.previousMouseY + (textAscent() * this.fontScalar) / 2
      );
    } else if (this.alignment === "left") {
      text(
        this.message,
        this.previousMouseX -
          textWidth(this.message) / 2 -
          this.controller.gapX / 2,
        this.previousMouseY + (textAscent() * this.fontScalar) / 2
      );
    } else {
      text(
        this.message,
        this.previousMouseX -
          textWidth(this.message) / 2 +
          this.controller.gapX / 2,
        this.previousMouseY + (textAscent() * this.fontScalar) / 2
      );
    }
  }

  displayController() {
    //Text Controller
    this.controller.x = this.previousMouseX;
    this.controller.y = this.previousMouseY + this.fontBaseline;
    this.controller.w = textWidth(this.message);
    this.controller.h = -textAscent();

    Controller.active ? this.controller.draw() : null;
  }

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
    //active by default
    alignCenter.addClass("active");
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
      if (this.decorationUnderline === "underline") {
        this.decorationUnderline = "none";
        underlineStyle.removeClass("active");
      } else {
        this.decorationUnderline = "underline";
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
