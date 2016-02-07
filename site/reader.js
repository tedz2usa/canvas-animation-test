var log = console.log.bind(console);
var canvas, ctx;

window.addEventListener('load', init);

function init() {
	log('window loaded!');
	setupCanvas();

	var img = new ReaderImage();
	img.x = 5;
	img.y = 10;

	log(img.id);
	log(ReaderImage.all);

	renderCanvas();

}


function setupCanvas() {
	var body = document.getElementsByTagName('body')[0];
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');
	body.appendChild(canvas);
	canvas.height = 800;
	canvas.width = 800;
}

function renderCanvas() {
	// Render all images.
	for (var id in ReaderImage.all) {
		ReaderImage.all[id].render(ctx);
	}
}


function ReaderImage() {
	this.id = ++ReaderImage.lastId;
	this.x;
	this.y;
	this.width = 300;
	this.height = 100;
	this.color = '#f0a';

	ReaderImage.all[this.id] = this;

}

ReaderImage.all = {};
ReaderImage.lastId = 0;


// Takes a canvas 2d rendering context as input.
ReaderImage.prototype.render = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);


}

