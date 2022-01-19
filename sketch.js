//global variables that will store the toolset colour palette
//amnd the helper functions
let toolset = null;
let shapes = null;
let sidebar = null;
var helpers = null;

function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  var c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  c.parent("content");

  //Get the sidebar object
  sidebar = document.getElementById("sidebar");

  //create helper functions and the colour palette
  helpers = new HelperFunctions();

  //create a toolset for storing the tools
  toolset = new ToolSet();

  //create a shapes to deal with current selected shape
  shapes = new Shapes();

  //add the tools to the toolset.
  toolset.addTool(new Freehand("assets/pencil.svg", "Freehand"));
  toolset.addTool(new LineTo("assets/lineTo.svg", "LineTo"));
  toolset.addTool(new SprayCan("assets/sprayCan.svg", "SprayCan"));
  toolset.addTool(new Stamp("assets/stamp.svg", "Stamp"));
  toolset.addTool(new Text("assets/text.svg", "Text"));
  toolset.addTool(new Eraser("assets/eraser.svg", "Eraser"));
  toolset.addTool(new MirrorDraw("assets/mirror.svg", "MirrorDraw"));
  toolset.addTool(new BucketFill("assets/bucketFill.svg", "BucketFill"));
  toolset.addTool(
    new Shapes(shapes.selectedShape.icon, shapes.selectedShape.name)
  );
  background(255);
}

function draw() {
  //call the draw function from the selected tool.
  //The `in` operator will return true for direct or
  //inherited properties through the prototype chain
  //if there isn't a draw method the app will alert the user

  if ("draw" in toolset.selectedTool) {
    if (Modal.status === "closed" && mouseX >= 0 && mouseY >= 0) {
      toolset.selectedTool.draw();
    }
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }

  //If the tool config is active and the user
  //clicks anywhere outside toolset area, close tool conif
  //and hide the modal.
  window.addEventListener("click", (event) => {
    if (toolset.isToolCofig) {
      if (event.target === Modal.elt || event.target === sidebar) {
        Modal.hide();
        toolset.hideToolConfig();
      }
    }
  });
}
