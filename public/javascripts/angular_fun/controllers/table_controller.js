(function(){

	var tableModule = angular.module('myApp.controllers', ['myApp.services', 'blockUI']);

	tableModule.controller('tableController', ['$scope', '$http', 'employeesDataProvider', 'blockUI', 
		function($scope, $http, employeesDataProvider, blockUI){

			var ctrl = this;
			
			$scope.model = {
				lastUpdate: new Date(),
				surnameFilter: "",
				positionFilter: "",
				employees: [],
			};

			(function init(){
				loadAllEmployees();
				setupFilters();
			})();

			function loadAllEmployees(){
				employeesDataProvider.getAllEmployees(function(employeesData){
			 		$scope.model.employees = employeesData;
				});
			};

			function setupFilters(){
				var filtersChange = Rx.Observable.merge(
						Rx.Observable.$watch($scope, 'model.surnameFilter'),
						Rx.Observable.$watch($scope, 'model.positionFilter'))
					.skip(2);

				filtersChange
					.subscribe(function (data) {
						//blockUI.start();
				    });

				filtersChange
					.throttle(1000)
			    	.flatMap(function (e) {
				        return Rx.Observable.fromPromise($http({
						        method: 'GET',
						        url: '/angular_fun/table/filteredData',
						        params: { position: 1 }}
						));
				    })
				    .subscribe(function (data) {
				    	debugger;
				        $scope.model.employees = data.data;
				    },
				    function (err) {
				        $scope.error = err.message;
				    });

			};

			// this.onSurnameFilterKeyDown = function(event){
			// 	$scope.lastUpdate = new Date();	
			// 	employeesDataProvider.getAllEmployees(function(data){
			// 	 	$scope.employees = data;
			// 	});
			// };

			// this.onPositionFilterKeyDown = function(event){
			// 	alert("yo: " + event.keyCode);
			// 	if(event.keyCode == 13){
			// 		alert("yo yo 2");
			// 	}
			// };

		}]);

})();