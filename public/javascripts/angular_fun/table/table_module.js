(function(){

	var app = angular.module('tableModule', []);

	app.controller('tableController', ['$http', function($http){

		var ctrl = this;

		this.employees = [];

		$http.get('/angular_fun/table/data')
			.success(function(data, status, headers, config) {
				ctrl.employees = data;
			})
			.error(function(data, status, headers, config) {
				alert('error');
			});
	}]);

})();