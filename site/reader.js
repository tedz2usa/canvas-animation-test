var log = console.log.bind(console);
var canvas, ctx;

window.addEventListener('load', init);

window.addEventListener('keydown', keydownListener);
window.addEventListener('keyup', keyupListener);

var img;

var keyMap = {
	65: 'LEFT',
	37: 'LEFT',
	87: 'UP',
	38: 'UP',
	68: 'RIGHT',
	39: 'RIGHT',
	83: 'DOWN',
	40: 'DOWN'
}

var keys = { }

function keydownListener(e) {
	var key = keyMap[e.keyCode];
	if (key) { keys[key] = true; }
}

function keyupListener(e) {
	var key = keyMap[e.keyCode];
	if (key) { delete keys[key]; }
}

function init() {
	log('window loaded!');
	setupCanvas();

	img = new ReaderImage();
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
	// Clear the canvas.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Render all images.
	for (var id in ReaderImage.all) {
		ReaderImage.all[id].render(ctx);
	}
	log(keys);
	window.requestAnimationFrame(renderCanvas);
}


function ReaderImage() {
	this.id = ++ReaderImage.lastId;
	this.x;
	this.y;
	this.dx = 0;
	this.dy = 0;
	this.ddx = 0;
	this.ddy = 0;
	this.width = 300;
	this.height = 100;
	this.color = '#f0a';

	ReaderImage.all[this.id] = this;

}

ReaderImage.all = {};
ReaderImage.lastId = 0;


// Takes a canvas 2d rendering context as input.
ReaderImage.prototype.render = function(ctx) {
	this.move();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
	//log(this.x, this.y);
}

ReaderImage.prototype.move = function() {

	var acceleration = 0.8;

	if (keys['LEFT'] || keys['RIGHT']) {
		if (keys['LEFT']) {
			this.ddx = -acceleration;
		}
		if (keys['RIGHT']) {
			this.ddx = acceleration;
		}
	} else {
		this.ddx = 0;
	}
	
	if (keys['UP'] || keys['DOWN']) {
		if (keys['UP']) {
			this.ddy = -acceleration;
		}
		if (keys['DOWN']) {
			this.ddy = acceleration;
		}
	} else {
		this.ddy = 0;
	}
	

	// Update for next frame.
	this.dx += this.ddx;
	this.dy += this.ddy;

	var maxSpeed = 5;

	if (this.dx >  maxSpeed) { this.dx =  maxSpeed; }
	if (this.dx < -maxSpeed) { this.dx = -maxSpeed; }
	if (this.dy >  maxSpeed) { this.dy =  maxSpeed; }
	if (this.dy < -maxSpeed) { this.dy = -maxSpeed; }

	var friction = 0.95;

	this.dx *= friction;
	this.dy *= friction;

	var stopThreshold = 0.2;
	if (Math.abs(this.dx) < stopThreshold) { this.dx = 0; }
	if (Math.abs(this.dy) < stopThreshold) { this.dy = 0; }

	log('F: ', this.ddx, this.ddy, '    V: ', this.dx, this.dy, '    P: ', this.x, this.y);

	this.x += this.dx;
	this.y += this.dy;



}

