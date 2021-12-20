class Eraser extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.size = new Size();
  }

  draw() {}

  displayConfigOptions() {
    return  this.size.displaySizeRange(1, 250, "eraser");
  }
}
