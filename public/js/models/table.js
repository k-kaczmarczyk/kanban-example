define(["underscore","backbone","collections/tasks"],
	function(_,Backbone,TasksCollection) {
		var TableModel = Backbone.Model.extend({
			defaults:  {
				statuses: ['wymagania','analiza','development','testy'],
				name: 'EHM'
			},
			initialize: function(attributes) {
				this.tasks = new TasksCollection(attributes.tasks);
				this.listenTo(this.tasks,'change',this.saveWhole);
			},
			saveWhole: function() {
				console.log('saveWhole');
			}
		});

		return TableModel;
	});