define(['jquery', 'underscore','backbone','models/table', "views/table",'collections/tables'],
	function($,_,Backbone,TableModel,TableView,TablesCollection) {
		var tableLinkTemplate = '<li><a href="#no-link" class="tableLink"><%- name %></a></li>';

		var AppView = Backbone.View.extend({
			el: "#wrap",
			events: {
				'click #summaryAction': 'dump',
				'click #newTaskAction': 'addOne',
				'click #addTableAction': 'addTable',
				'click': 'appClick',
				'click .tableLink': 'loadTable',
				'click #saveTable' : 'newTable',
				'change #tableColumnsNr': 'columnsNumberChange'
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
				this.$('#tablesMenu').prepend(html);
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
			},
			addTable: function() {
				this.$('#addTableForm').modal({keyboard:true});
			},
			columnsNumberChange: function() {
				var nr = parseInt(this.$('#tableColumnsNr').val(),10);
				var inputs = this.$('#addTableForm').find('div.column_name');
				if (inputs.length > nr) {
					inputs.filter(':gt('+(nr-1)+')').detach();
				}
				else if (nr > inputs.length) {
					for (var i = nr; i > inputs.length; i--) {
						var last_one = inputs.filter(':last');
						var copy = last_one.clone().val('');
						copy.insertAfter(last_one);
					}
				}
			},
			newTable: function() {
				this.$('#addTableForm .form-group').removeClass('has-error');
				var data = {
					name: this.$('#tableTitle').val(),
					description: this.$('#tableDescription').val(),
					statuses: this.$('#addTableForm .column_name input').map(function(){
						return $(this).val();
					}).get()
				};
				var self = this;
				TablesCollection.once('invalid',function(model,err) {
					console.log(err);
					if (_.has(err,'name')) {
						self.$('#tableTitle').parent().addClass('has-error');
					}
					if (_.has(err,'statuses')) {
						_.each(err.statuses, function(error, idx) {
							self.$('#addTableForm').find('div.column_name:eq('+idx+')').addClass('has-error');
						});
					}
				});
				TablesCollection.create(data,{success: function() {
					console.log('OK!');
					self.$('#addTableForm').modal('hide');
				}});
			}
		});

		return AppView;
	});