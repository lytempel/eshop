var app = angular.module('app', []);
app.controller('productsCtrl', function($scope, $http) {
    $http.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
    .then(function (response) {
        $scope.products = response.data;
        $scope.requestProductInfo = function(id) {
            $scope.productInfo = response.data[id-1];
        };

    }, function(response) {
        $scope.products = "Something went wrong";
    });

    $scope.propertyName = '';
    $scope.reverse = '';

    $scope.orderByFun = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

});

