define(["jquery","underscore","backbone","models/table",'views/task','text!templates/table.html', 'jqueryui'],
	function($,_,Backbone,TableModel,TaskView,tableTemplate) {

		var TableView = Backbone.View.extend({
			el: "#tableContent",
			template: _.template(tableTemplate),
			initialize: function() {
				this.listenTo(this.model,'add',this.render);
				this.listenTo(this.model,'change',this.render);
				this.listenTo(this.model,'destroy',this.remove);
				this.listenTo(this.model.tasks,'add',this.addOne);
				this.render();
			},
			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
				this.initializeSortable();
				this.renderTasks();
				return this;
			},
			renderTasks: function() {
				if (this.model.tasks.length > 0)
					this.model.tasks.each(function(task) {
						this.addOne(task);
					},this);
			},
			changeModel: function(table) {
				this.stopListening();
				this.model = table;
				this.listenTo(this.model,'add',this.render);
				this.listenTo(this.model,'change',this.render);
				this.listenTo(this.model,'destroy',this.remove);
				this.listenTo(this.model.tasks,'add',this.addOne);
				this.render();
			},
			initializeSortable: function() {
				var that = this;
				this.$('.taskList').sortable({
					connectWith: '.taskList',
					placeholder: "ui-state-highlight",
					cursor: 'move',
					opacity: 0.5,
				}).disableSelection().on('sortupdate',function(e,ui) {
					if (ui.sender !== null) {
						//status change
						var statusIdx = ui.item.parents('.statusColumn').index();
						ui.item.trigger('drop',that.model.get('statuses')[statusIdx]);
					}
				});
			},
			addOne: function(task) {
				var view = new TaskView({model:task});
				var column = _.indexOf(this.model.get('statuses'),task.get('status'));
				$('#tableContent').find('ul').eq(column).append(view.render().el);
			}
		});

		return TableView;
	});