define(["underscore","backbone"],
	function(_,Backbone) {
		var TaskModel = Backbone.Model.extend({
			defaults: function () {
				return {
					title: 'New one',
					description: 'New one description',
					created: new Date()
				};
			},
			initialize: function(attributes) {
				
			},
		});

		return TaskModel;
});