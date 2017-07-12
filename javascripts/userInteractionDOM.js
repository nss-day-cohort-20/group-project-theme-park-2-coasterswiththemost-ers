'use strict';

let $ = require('jquery');

let userInteraction = {};
// let attractionListData = require('./attractions-list-data-builder');
userInteraction.nameClick = function()
{
	$('#attractionList li').on('click', function()
	{
	$('#attractionList li div').each( function()
	{
		this.classList.add('isHidden');
	});
	let childCount = document.getElementById('attractionList').childElementCount;

	console.log(this);
	this.lastElementChild.classList.toggle('isHidden');
	});
};

module.exports = userInteraction;