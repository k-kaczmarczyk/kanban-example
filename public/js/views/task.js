define(['jquery','underscore','backbone'/*,'text!templates/task.html'*/],
	function($,_,Backbone/*,taskTemplate*/) {
		/*jshint multistr: true */
		var taskTemplate = '<div class="view"> \
			<strong><%- title %></strong> \
			<%- description %> \
			<small><%- new Date(created).toLocaleDateString() %></small> \
		</div> \
		<div class="edit"> \
			<input type="text" class="edit" value="<%- title %>"/> \
			<textarea><%- description %></textarea> \
			<button>Save</button> \
		</div>';

		var TaskView = Backbone.View.extend({
			tagName: "li",
			className: "task",
			template: _.template(taskTemplate),
			events: {
				'drop': "drop",
				'dblclick': 'edit',
				'click button': 'save',
				'click .edit' : 'preventAppClick',
				'blur': 'close'
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
				this.model.set('status',status);
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
			}
		});

		return TaskView;
	});