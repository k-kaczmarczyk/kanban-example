define(['jquery', 'underscore','backbone','models/table', "views/table",'collections/tables'],
	function($,_,Backbone,TableModel,TableView,TablesCollection) {
		var tableLinkTemplate = '<li><a href="#no-link" class="tableLink"><%- name %></a></li>';

		var AppView = Backbone.View.extend({
			el: "#wrap",
			events: {
				'click #summaryAction': 'dump',
				'click': 'appClick',
				'click #newTaskAction': 'addOne',
				'click .tableLink': 'loadTable'
			},
			tableLinkTemplate: _.template(tableLinkTemplate),
			initialize: function() {
				this.listenTo(TablesCollection, 'add', this.addTableToMenu);
				this.listenTo(TablesCollection, 'reset', this.renderTablesInMenu);

				TablesCollection.fetch();
			},
			dump: function() {
				this.view.model.tasks.each(function(task) {
					console.log(task.get('title')+' '+task.get('status'));
				});
			},
			appClick: function() {
				if (this.$('ul.taskList li.editing').length) {
					this.$('ul.taskList li.editing').trigger('blur');
				}
			},
			addOne: function() {
				var status = this.view.model.get('statuses')[0];
				var model = this.view.model.tasks.create({status: status});
			},
			addTableToMenu: function(table) {
				var html = this.tableLinkTemplate(table.toJSON());
				this.$('#tablesMenu').append(html);
			},
			renderTablesInMenu: function() {
				this.$('#tablesMenu').children().detach();
				TablesCollection.each(this.addTableToMenu, this);
			},
			loadTable: function(event) {
				var tableName = $(event.target).text();
				var table = TablesCollection.findWhere({name: tableName});

				if (this.view === undefined) {
					this.view = new TableView({model: table});
				}
				else {
					this.view.changeModel(table);
				}
			}
		});

		return AppView;
	});