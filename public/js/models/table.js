define(["underscore","backbone","collections/tasks"],
	function(_,Backbone,TasksCollection) {
		var TableModel = Backbone.Model.extend({
			defaults:  {
				statuses: ['wymagania','analiza','development','testy'],
				name: 'EHM'
			},
			initialize: function(attributes) {
				this.tasks = new TasksCollection();
				// this.listenTo(this.tasks,'add',this.taskAdded);
			},
			taskAdded: function(task) {
				this.trigger('change');
			},
		});

		return TableModel;
	});