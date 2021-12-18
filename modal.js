class Modal {
  static elt = document.getElementById("modal");

  static show() {
    this.elt.style.display = "block";
  }
  static hide() {
    this.elt.style.display = "none";
  }
}
