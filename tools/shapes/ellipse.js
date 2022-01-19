class Ellipse extends Tools {
    constructor(icon, name) {
      super(icon, name);
      this.color = new Color();
    }
  
    draw() {
      console.log('hello from Ellipse');
    }
  
    displayConfigOptions() {
      return [this.color.displayFill("Ellipse")];
    }
  }
  