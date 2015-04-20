var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('angular_fun/index', { title: 'Express' });
});

router.get('/table', function(req, res, next) {
  res.render('angular_fun/table/table.jade', { title: 'Table yo' });
});

router.get('/table/data', function(req, res, next) {
  res.json([{ id: 1, surname: 'Weglarz', position: 'Dyrektor', salary: 3000 },
  	{ id: 2, surname: 'Brzezinski', position: 'Profesor', salary: 2000 },
  	{ id: 3, surname: 'Dalkowski', position: 'Asystent', salary: 1000 }
  	]);
});


module.exports = router;
