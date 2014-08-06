// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// configure the module.
// in this example we will create a greeting filter

//angular.module('rails_calculator', []).controller("CalculatorController", function ($scope) {
//    $scope.calculator = "CalculatorModel";})

(function() {
    angular.module('calculator_app', [])
        .controller('CalculatorIndexController', ['$scope','$http', function ($scope,$http) {
            $scope.calculatorName = "Calculator1"
            $scope.commandHistory = [];
            $scope.update = function(commandInput){

                $http(
                    {
                        url:  '/api/calculator_update',
                        method: "PUT",
                        data: {command:commandInput}
                    }
                ).success(function(response) {
                    $scope.result = response.state;
                    $scope.append()
                });


            }
            $scope.append = function() {

                $scope.commandHistory.push($scope.result);
            }
        }]);

})();