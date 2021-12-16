//global variables that will store the toolset colour palette
//amnd the helper functions
let toolset = null;
var colourP = null;
var helpers = null;

function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  var c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  c.parent("content");

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  // colourP = new ColourPalette();

  //create a toolset for storing the tools
  toolset = new ToolSet();

  //add the tools to the toolset.
  toolset.addTool(new FreehandTool("assets/pencil.svg", "freehand"));
  toolset.addTool(new LineToTool("assets/lineTo.svg", "LineTo"));
  toolset.addTool(new SprayCanTool("assets/sprayCan.svg", "sprayCanTool"));
  toolset.addTool(new mirrorDrawTool("assets/mirror.svg", "mirrorDraw"));
  background(255);
}

function draw() {
  //call the draw function from the selected tool.
  //The `in` operator will return true for direct or
  //inherited properties through the prototype chain
  //if there isn't a draw method the app will alert the user
  if ("draw" in toolset.selectedTool) {
    toolset.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}
