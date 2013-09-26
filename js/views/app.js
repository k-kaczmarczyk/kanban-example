define(['jquery', 'underscore','backbone','models/table', "views/table"],
	function($,_,Backbone,TableModel,TableView) {
		var AppView = Backbone.View.extend({
			el: "#wrap",
			events: {
				'click #summaryAction': 'dump',
				'click': 'appClick',
				'click #newTaskAction': 'addOne'
			},
			initialize: function() {
				this.table = new TableModel();
				var view = new TableView({model:this.table});
				view.render();

				for (var i = 0; i < 4; i++) {
					this.addOne();
				}
			},
			dump: function() {
				this.table.tasks.each(function(task) {
					console.log(task.get('title')+' '+task.get('status'));
				});
			},
			appClick: function() {
				if (this.$('ul.taskList li.editing').length) {
					this.$('ul.taskList li.editing').trigger('blur');
				}
			},
			addOne: function() {
				this.table.tasks.add({table:this.table});
			}
		});

		return AppView;
	});