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
    this.with = 0;
    this.height = 0;
    this.drag = new Draggable();
    this.style = "normal";
    this.decorationSThrough = "none";
    this.decorationUnderline = "none";
    this.weight = "normal";
    this.alignment = "center";
    //The following fonts are safe fonts for HTML and CSS and
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
    this.message = "Silence is golden...";
    this.rotate = new Rotate();
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

      this.drag.pressed(
        this.previousMouseX - this.controller.w / 2,
        this.previousMouseY - this.controller.h / 2,
        this.controller.w + this.controller.w / 2,
        this.controller.h + this.controller.h / 2
      );
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

      // Quit dragging
      this.drag.released();
    }

    if (this.isDrawing) {
      //If I'm dragging
      if (this.drag.dragging) {
        background(255);
        //Save the current mouse location
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;
        updatePixels();
        this.displayText();
        this.displayController();
      }

      //Is mouse over text
      this.drag.over(
        this.previousMouseX - this.controller.w / 2,
        this.previousMouseY - this.controller.h / 2,
        this.controller.w + this.controller.w / 2,
        this.controller.h + this.controller.h / 2
      );

      //Change cursor based on the current mouse location
      this.drag.show();
    }
  }

  displayText() {
    //Make sure we capture the latest message
    this.message = select(".textInput").value();

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

    // Change the mode to DEGREES
    angleMode(DEGREES);

    //Text decoration Underline
    if (this.decorationUnderline === "underline") {
      push();
      translate(this.previousMouseX, this.previousMouseY);
      rotate(this.rotate.degree);
      if (this.alignment === "center" || this.alignment === "justify") {
        textAlign(CENTER, BOTTOM);
        line(-textWidth(this.message) / 2, 0, textWidth(this.message) / 2, 0);
      } else if (this.alignment === "left") {
        textAlign(LEFT, BOTTOM);
        line(0, 0, textWidth(this.message), 0);
      } else {
        textAlign(RIGHT, BOTTOM);
        line(-textWidth(this.message), 0, 0, 0);
      }
      pop();
    }

    //Text decoration Through
    if (this.decorationSThrough === "line-through") {
      push();
      translate(this.previousMouseX, this.previousMouseY);
      rotate(this.rotate.degree);
      if (this.alignment === "center" || this.alignment === "justify") {
        textAlign(CENTER);
        line(
          -textWidth(this.message) / 2,
          -((textAscent(this.message) - textDescent(this.message)) / 2),
          textWidth(this.message) / 2,
          -((textAscent(this.message) - textDescent(this.message)) / 2)
        );
      } else if (this.alignment === "left") {
        textAlign(LEFT);
        line(
          0,
          -((textAscent(this.message) - textDescent(this.message)) / 2),
          textWidth(this.message),
          -((textAscent(this.message) - textDescent(this.message)) / 2)
        );
      } else {
        textAlign(RIGHT);
        line(
          -textWidth(this.message),
          -((textAscent(this.message) - textDescent(this.message)) / 2),
          0,
          -((textAscent(this.message) - textDescent(this.message)) / 2)
        );
      }
      pop();
    }

    //Output the text on the correct location on the canvas and controller
    push();
    if (this.alignment === "center" || this.alignment === "justify") {
      textAlign(CENTER);
    } else if (this.alignment === "left") {
      textAlign(LEFT);
    } else {
      textAlign(RIGHT);
    }
    translate(this.previousMouseX, this.previousMouseY);
    rotate(this.rotate.degree);
    text(this.message, 0, 0);
    pop();
  }

  displayController() {
    //Text Controller
    this.controller.x = this.previousMouseX;
    this.controller.y = this.previousMouseY;
    this.controller.w = 10;
    this.controller.h = 10;

    //So we can usee later to handle the drag functionality.
    this.with = this.controller.w;
    this.height = this.controller.h;

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

  textContentHandler() {
    const inp = createInput(this.message);
    inp.class("textInput");
    return inp;
  }

  displayConfigOptions() {
    return [
      this.textContentHandler(),
      this.color.displayFill("text"),
      this.color.displayOutline("text"),
      this.fontFamilyHandler(),
      this.fontSizeHandler(),
      this.rotate.displayOptions(),
      this.textAlignHandler(),
      this.fontStyleHandler(),
    ];
  }
}
