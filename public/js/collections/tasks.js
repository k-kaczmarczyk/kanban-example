define(['underscore','backbone','models/task'],
	function(_,Backbone,Task) {
		var TasksCollection = Backbone.Collection.extend({
			model: Task


		});

		return TasksCollection;
	});