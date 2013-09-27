define(['jquery','underscore','backbone','text!templates/task.html'],
	function($,_,Backbone,taskTemplate) {
		var TaskView = Backbone.View.extend({
			tagName: "li",
			className: "task",
			template: _.template(taskTemplate),
			events: {
				'drop': "drop",
				'dblclick': 'edit',
				'click button.save': 'save',
				'click .edit' : 'preventAppClick',
				'blur': 'close',
				'click button.close': 'delete'
			},
			initialize: function() {
				this.listenTo(this.model,'change',this.render);
				this.listenTo(this.model,'destroy',this.remove);
			},
			render: function(){
				this.$el.html(this.template(this.model.toJSON()));

				this.$input = this.$('input');
				this.$textarea = this.$('textarea');
				return this;
			},
			drop: function(event, status) {
				console.log(this.model.id);
				this.model.save('status',status);
			},
			edit: function() {
				this.$textarea.val(this.model.get('description'));
				this.$input.val(this.model.get('title')).focus();
				this.$el.addClass('editing');
			},
			save: function() {
				var title = this.$input.val();
				var desc = this.$textarea.val();

				this.model.save(_.object(['title','description'],[title,desc]));
				this.close();
			},
			close: function() {
				this.$el.removeClass('editing');
			},
			preventAppClick: function(event) {
				event.stopPropagation();
			},
			delete: function(event) {
				this.model.destroy();
				event.stopPropagation();
			}
		});

		return TaskView;
	});