requirejs.config({
	"paths": {
		"jquery" : "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
		"jqueryui" : "http://code.jquery.com/ui/1.10.3/jquery-ui",
		"jquery.bootstrap": "lib/bootstrap.min",
		"backbone" : "lib/backbone-min",
		"underscore": "lib/underscore-min",
		'text': "lib/text"
	},
	"shim": {
		"jquery.bootstrap": {
			deps: ["jquery"]
		},
		"backbone": {
			deps: ["jquery","underscore"],
			exports: "Backbone"
		},
		"underscore": {
			exports: "_"
		},
		"jqueryui": {
			deps: ["jquery"]
		}
	}
});

require(['views/app','jquery.bootstrap'],function(AppView) {
	new AppView();
	// $(document).ready(function() {
	//$('.taskList').sortable({
	//		connectWith: '.taskList',
	//		placeholder: "ui-state-highlight",
	//		cursot: 'move',
	//		opacity: 0.5
	//	}).disableSelection();
	// });
});