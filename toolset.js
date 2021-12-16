const toolbarItemClick = function (item, self) {
  //remove any existing active class
  const items = selectAll(".sideBarItem");
  for (const item of items) {
    item.removeClass("active");
  }

  const toolName = item.id().split("sideBarItem")[0];

  self.selectTool(toolName);
  //call loadPixels to make sure most recent changes are saved to pixel array
  loadPixels();
};

//add a new tool icon to the html page
const addToolIcon = function (icon, name) {
  const sideBarItem = createDiv(
    `<img src='${icon}'><span class='tooltiptext'>${name}</span></div>`
  );
  const self = this;
  sideBarItem.class("sideBarItem");
  sideBarItem.id(name + "sideBarItem");
  sideBarItem.parent("sidebar");
  sideBarItem.mouseClicked(function () {
    toolbarItemClick(sideBarItem, self);
  });
};

//container object for storing the tools. Functions to add new tools and select a tool
class ToolSet {
  constructor() {
    this.tools = [];
    this.selectedTool = null;
  }

  //add a tool to the tools array
  addTool(tool) {
    //check that the object tool has an icon and a name
    if (!"icon" in tool || !"name" in tool) {
      alert("make sure your tool has both a name and an icon");
    }
    this.tools.push(tool);
    addToolIcon.bind(this)(tool.icon, tool.name);
    //if no tool is selected (ie. none have been added so far)
    //make this tool the selected one.
    if (this.selectedTool == null) {
      this.selectTool(tool.name);
    }
  }

  selectTool(toolName) {
    //search through the tools for one that's name matches
    //toolName
    for (const tool of this.tools) {
      if (tool.name == toolName) {
        //if the tool has an unselectTool method run it.
        if (this.selectedTool != null && "unselectTool" in this.selectedTool) {
          this.selectedTool.unselectTool();
        }
        //select the tool and highlight it on the toolbar
        this.selectedTool = tool;
        select("#" + toolName + "sideBarItem").addClass("active");

        //if the tool has an options area. Populate it now.
        if (this.selectedTool.hasOwnProperty("populateOptions")) {
          this.selectedTool.populateOptions();
        }
      }
    }
  }
}
