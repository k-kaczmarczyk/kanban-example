define(['underscore','backbone','models/table'],
	function(_,Backbone,Table) {
		var TablesCollection = Backbone.Collection.extend({
			model: Table,
			url: '/tables'
		});

		return new TablesCollection();
	});