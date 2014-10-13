tool.minDistance = 10;

var path;
var difCol = '#'+Math.floor(Math.random()*16777215).toString(16);
var difWidth = Math.floor((Math.random()*15) + 1); 

console.log(difWidth);

function onMouseDown(event) {
	// Create a new path and give it a stroke color:
	path = new Path();
	path.strokeColor = 	difCol;
	path.strokeWidth = difWidth; 

	// Add a segment to the path where
	// you clicked:
	path.add(event.point);
}

function onMouseDrag(event) {
	// Every drag event, add a segment
	// to the path at the position of the mouse:
	path.add(event.point);
}


