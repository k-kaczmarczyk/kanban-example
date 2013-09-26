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
				if (attributes.status === undefined && attributes.table !== undefined && attributes.table.has('statuses')) {
					this.set('status', attributes.table.get('statuses')[0]);
				}
			},
			updateStatus: function(statusIdx) {
				if (this.has('table') && this.get('table').has('statuses')) {
					this.set('status', this.get('table').get('statuses')[statusIdx]);
				}
			},

		});

		return TaskModel;
});