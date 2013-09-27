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
				// this.listenTo(this.tasks,'change add',this.saveTask);
				// this.listenTo(this.tasks,'remove',this.removeTask);
			},
			saveTask: function(task) {
				// task.url = 'tasks/'+this.get('name')+'/';
				// task.save();
			},
			removeTask: function(task) {
				
				// task.remove
				// console.log('remove');
			}
		});

		return TableModel;
	});