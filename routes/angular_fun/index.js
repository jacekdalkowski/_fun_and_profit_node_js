var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('angular_fun/index', { title: 'Express' });
});

router.get('/table', function(req, res, next) {
  res.render('angular_fun/table/table.jade', { title: 'Table yo' });
});

router.get('/table/data', function(req, res, next) {

	var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'employees'});

	var employees = [];
	client.execute("SELECT id, surname, salary FROM employees;", function (err, result) {
		console.log('1: ' + err + ' ' + result);
		if (!err){
			if (result.rows.length > 0) {
				console.log('result.rows.length' + result.rows.length);

				employees = result.rows.map(function(dbEmp){
					return {
						id: dbEmp.id,
						surname: dbEmp.surname,
						position: dbEmp.position,
						salary: dbEmp.salary
					};
				});
			}
		}
		res.json(employees);
   	});
});


module.exports = router;
