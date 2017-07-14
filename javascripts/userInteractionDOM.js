'use strict';

let $ = require('jquery');

let userInteraction = {};
// let attractionListData = require('./attractions-list-data-builder');
userInteraction.nameClick = function()
{
	$('#attractionList li').on('click', function()
	{
	let currentDiv = this.lastElementChild;
	if(currentDiv.classList.contains('isHidden') === false)
	{
		currentDiv.classList.add('isHidden');
	}
	else
	{
		$('#attractionList li div').each( function()
		{
			this.classList.add('isHidden');
		});
		// console.log('does not have isHidden');
		currentDiv.classList.remove('isHidden');
	}
	});
};

module.exports = userInteraction;