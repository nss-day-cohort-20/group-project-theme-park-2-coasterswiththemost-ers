'use strict';

//draws a number on the canvas mapGrid overlay based on coordinates
//called in search function after filter and drawing list to dom

function draw(attractions) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	let counter = 1;
	attractions.forEach( function(attraction) {
	  context.font = '8px, sans-serif';
	  context.fillStyle = '#ffffff';
	  context.fillText(`${counter}`, `${attraction.positionX}`, `${attraction.positionY}`);
	  counter += 1;
		});
}

module.exports = draw;