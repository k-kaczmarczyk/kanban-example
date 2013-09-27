var express = require('express');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/kanban');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {

	var TaskSchema = mongoose.Schema({
		title: String,
		description: String,
		status: String,
		created: Date
	});

	var tableSchema = mongoose.Schema({
		name: String,
		statuses: Array,
		tasks: [TaskSchema]
	});

	var tableModel = mongoose.model('Table',tableSchema);
	var taskModel = mongoose.model('Task',TaskSchema);

	app.use(express.static(__dirname+'/public'));
	app.use(express.bodyParser());
	app.get('/',function(req, res) {
		res.sendfile('index.html');
	});

	function handleDBError(err, res) {
		console.error('retrieving error ', err);
		if (res!==undefined) {
			res.statusCode = 404;
			return res.send('Error querying the database');
		}
	}

	app.get('/tables',function(req,res) {
		tableModel.find({}, function(err,table) {
			if (err) {
				return handleDBError(err,res);
			}
			else {
				res.json(table);
			}
		});
	});

	app.get('/tables/:name',function(req,res) {
		tableModel.findOne({'name':req.params.name}, function(err,table) {
			if (err) {
				return handleDBError(err,res);
			}
			else {
				res.json(table);
			}
		});
	});

	app.post('/tables',function(req,res) {
		var tableData = {
			name: req.body.name,
			statuses: req.body.statuses,
			tasks: []
		};
		var table = new tableModel(tableData);
		table.save(function (err,table) {
			if (err) {
				return handleDBError(err);
			}
			else {
				var id = table.id;
				return res.json({id: id});
			}
		});
	});

	app.post('/tasks/:table', function(req,res) {
		var table = tableModel.findOne({'name':req.params.table},function(err,table) {
			if (err) {
				return handleDBError(err,res);
			}
			else {
				var task = {
					title: req.body.title,
					description: req.body.description,
					status: req.body.status,
					created: req.body.created
				};
				table.tasks.push(task);
				table.save(function (err,table) {
					if (err) {
						return handleDBError(err);
					}
					else {
						var id = table.tasks[table.tasks.length-1].id;
						return res.json({id: id});
					}
				});
			}
		});
	});

	app.delete('/tasks/:table/:id', function(req,res) {
		var table = tableModel.findOne({'name':req.params.table},function(err,table) {
			if (err) {
				return handleDBError(err,res);
			}
			else {
				var task = table.tasks.id(req.params.id).remove();
				table.save(function (err,table) {
					if (err) {
						return handleDBError(err);
					}
					else {
						return res.send('OK');
					}
				});
			}
		});
	});

	app.put('/tasks/:table/:id', function(req,res) {
		var table = tableModel.findOne({'name':req.params.table},function(err,table) {
			if (err) {
				return handleDBError(err,res);
			}
			else {
				var task = table.tasks.id(req.params.id);
				task.description = req.body.description;
				task.title = req.body.title;
				task.status = req.body.status;
				table.save(function (err,table) {
					if (err) {
						return handleDBError(err);
					}
					else {
						return res.send('OK');
					}
				});
			}
		});
	});

	app.listen(80);
});

