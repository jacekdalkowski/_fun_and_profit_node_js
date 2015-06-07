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
	client.execute("SELECT id, surname, position, salary FROM employees;", function (err, result) {
		console.log('1: ' + err + ' ' + result);
		if (!err){
			if (result.rows.length > 0) {
				console.log('result.rows.length' + result.rows.length);

				employees = result.rows.map(function(dbEmp){
					return {
						id: dbEmp.id,
						surname: dbEmp.surname,
						position: dbEmp.position[Object.keys(dbEmp.position)[0]],
						salary: dbEmp.salary
					};
				});
			}
		}
		res.json(employees);
   	});
});

router.get('/table/filteredData', function(req, res, next) {

	var surnameFilter = req.query.surname;
	var positionKeyFilter = req.query.position;

	var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'employees'});

	// temporary solution :(
	if(surnameFilter){
		if(positionKeyFilter){
			client.execute("SELECT id, surname, position, salary FROM employees where surname = '" + surnameFilter + "' and position contains key " + positionKeyFilter + ";", 
				function(err, dbResult){
					cassandraUtils.parseEmployeesQueryResult(err, dbResult, res);
				});
		}else{
			client.execute("SELECT id, surname, position, salary FROM employees where surname = '" + surnameFilter + "';", 
				function(err, dbResult){
					cassandraUtils.parseEmployeesQueryResult(err, dbResult, res);
				});
		}
	}else{
		if(positionKeyFilter){
			client.execute("SELECT id, surname, position, salary FROM employees where position contains key " + positionKeyFilter + ";", 
				function(err, dbResult){
					cassandraUtils.parseEmployeesQueryResult(err, dbResult, res);
				});
		}else{
			client.execute("SELECT id, surname, position, salary FROM employees;", 
				function(err, dbResult){
					cassandraUtils.parseEmployeesQueryResult(err, dbResult, res);
				});
		}
	}

});

cassandraUtils = {};
cassandraUtils.parseEmployeesQueryResult = function(err, dbResult, response) {
	if (!err){
		if (dbResult.rows.length > 0) {
			console.log('dbResult.rows.length' + dbResult.rows.length);

			employees = dbResult.rows.map(function(dbEmp){
				return {
					id: dbEmp.id,
					surname: dbEmp.surname,
					position: dbEmp.position.value,
					salary: dbEmp.salary
				};
			});
		}
	}
	response.json(employees);
};

module.exports = router;
