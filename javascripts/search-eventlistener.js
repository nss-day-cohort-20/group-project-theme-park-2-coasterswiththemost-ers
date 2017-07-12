'use strict';

let $ = require('jquery');
let data = require('./main');

$(document).on('keypress','#searchTextArea', function()
{
	// console.log('in keypress');
	if(event.which === 13)
	{
		// let list = 
		console.log(data);
	}
});