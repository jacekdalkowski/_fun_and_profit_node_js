(function(){

	var app = angular.module('myApp.controllers', ['myApp.services']);

	app.controller('tableController', ['$scope', 'employeesDataProvider', 
		function($scope, employeesDataProvider){

			var ctrl = this;

			$scope.lastUpdate = new Date();
			employeesDataProvider.getAllEmployees(function(data){
			 	$scope.employees = data;
			});

			this.onSurnameFilterKeyDown = function(event){
				$scope.lastUpdate = new Date();	
				employeesDataProvider.getAllEmployees(function(data){
				 	$scope.employees = data;
				});
			};

			this.onPositionFilterKeyDown = function(event){
				alert("yo");
				if(event.keyCode == 13){
					alert("yo yo 2");
				}
			};

		}]);

})();