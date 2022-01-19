class Modal {
  static elt = document.getElementById("modal");
  static status = "closed";

  static show() {
    this.elt.style.display = "block";
    this.status = "open";
  }
  static hide() {
    this.elt.style.display = "none";
    this.status = "closed";
  }
}
