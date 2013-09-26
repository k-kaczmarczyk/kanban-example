var express = require('express');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/kanban');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {

	var TaskSchema = mongoose.Schema({
		name: String,
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

	app.use(express.static(__dirname+'/public'));

	app.get('/',function(req, res) {
		res.sendfile('index.html');
	});

	function handleDBError(err, res) {
		console.error('retrieving error ', err);
		res.statusCode = 404;
		return res.send('Error querying the database');
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

	});

	app.listen(80);
});

