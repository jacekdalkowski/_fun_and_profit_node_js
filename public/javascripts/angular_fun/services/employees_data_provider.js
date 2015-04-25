(function(){

	var app = angular.module('myApp.services', []);

	app.factory('employeesDataProvider', ['$http', function($http){
		return{
			getAllEmployees: function(handleData){
				$http.get('/angular_fun/table/data')
					.success(function(data, status, headers, config) {
						handleData(data);
					})
					.error(function(data, status, headers, config) {
						throw 'error';
					});
			}
		};
	}]);

})();