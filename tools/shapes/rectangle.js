class Rectangle extends Tools {
  constructor(icon, name) {
    super(icon, name);
    this.color = new Color();
  }

  draw() {}

  displayConfigOptions() {
    return [this.color.displayOutline("Rectangle")];
  }
}
