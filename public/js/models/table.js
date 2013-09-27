define(["underscore","backbone","collections/tasks"],
	function(_,Backbone,TasksCollection) {
		var TableModel = Backbone.Model.extend({
			defaults:  {
				statuses: ['wymagania','analiza','development','testy'],
				name: 'EHM'
			},
			url: '/tables',
			initialize: function(attributes) {
				this.tasks = new TasksCollection(attributes.tasks);
				this.tasks.each(function(task) {
					if (task.has('_id'))
						task.id = task.get('_id');
				});
				this.tasks.url = 'tasks/'+this.get('name')+'/';
			},
			validate: function(attrs, options) {
				var errors = {};
				if (attrs.name === undefined || attrs.name === '') {
					errors.name = 'Name is required';
				}
				if (attrs.statuses === undefined || attrs.length < 2) {
					errors.statuses = 'Column names are required and there should be at least 2';
				}
				else {
					errors.statuses = [];
					_.each(attrs.statuses, function(status, idx) {
						if (status === '') {
							errors.statuses[idx] = 'Column name is required';
						}
					});
					if (errors.statuses.length === 0)
						delete errors.statuses;
				}
				if  (!_.isEmpty(errors))
					return errors;
			}
		});

		return TableModel;
	});