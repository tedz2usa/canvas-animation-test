var log = console.log.bind(console);

window.addEventListener('load', init);

function init() {
	log('window loaded!');
	setupCanvas();
}


function setupCanvas() {
	var body = document.getElementsByTagName('body')[0];
	var canvas = document.createElement('canvas');
	body.appendChild(canvas);
	canvas.height = 800;
	canvas.width = 800;
}



function ReaderImage() {

}


