//global variables that will store the toolset colour palette
//amnd the helper functions
let toolset = null;
var colourP = null;
var helpers = null;


function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	// colourP = new ColourPalette();

	//create a toolset for storing the tools
	toolset = new ToolSet();


	//add the tools to the toolset.
	toolset.addTool(new FreehandTool("assets/pencil.svg", "freehand"));
	toolset.addTool(new LineToTool());
	toolset.addTool(new SprayCanTool());
	toolset.addTool(new mirrorDrawTool());
	background(255);

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if ("draw" in toolset.selectedTool) {
		toolset.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}