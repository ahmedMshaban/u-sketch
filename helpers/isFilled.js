class IsFilled {
  constructor() {
    this.status = false;
  }

  displayConfigOptions() {
    const checkbox = createCheckbox("Filled?", false);
    checkbox.changed((e) => {
      this.status = e.target.checked;
    });
    return checkbox;
  }
}
