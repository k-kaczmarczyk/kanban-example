$(document).ready(function() {
	$('.taskList').sortable({
		connectWith: '.taskList',
		placeholder: "ui-state-highlight",
		cursot: 'move',
		opacity: 0.5
	}).disableSelection();
});