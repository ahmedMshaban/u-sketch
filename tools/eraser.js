class Eraser extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.size = new Size();
  }

  draw() {
    //console.log(this.size.value);
  }

  displayConfigOptions() {
    return  this.size.displaySizeRange(1, 250, "eraser");
  }
}
