var app = angular.module('app', ['ngCookies']);
app.controller('productsCtrl', ['$scope', '$cookies', '$http', function ($scope, $cookies, $http) {
    $http.get('https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d')
    .then(function (response) {
        $scope.products = response.data;
        $scope.cart = [];
        $scope.total = 0;

        $scope.requestProductInfo = function(id) {
            $scope.productInfo = response.data[id-1];
        };

        $scope.countInCart = function(id, cart) {
            var item;
            for (item of cart) {
                if (item.id == id) {
                    return item.count;
                }
            }
            return 0;
        }

        if(!angular.isUndefined($cookies.get('total'))) {
            $scope.total = parseFloat($cookies.get('total'));
        }

        if (!angular.isUndefined($cookies.get('cart'))) {
            $scope.cart = $cookies.getObject('cart');
        }

        $scope.addToCart = function(product){

            if ($scope.cart.length === 0){
                product.count = 1;
                $scope.cart.push(product);
            } else {
                var repeat = false;
                for(var i = 0; i< $scope.cart.length; i++){
                    if($scope.cart[i].id === product.id){
                        repeat = true;
                        $scope.cart[i].count +=1;
                    }
                }
                if (!repeat) {
                    product.count = 1;
                    $scope.cart.push(product);
                }
            }
            var endDate = new Date();
            endDate.setDate(endDate.getDate() + 1);
            $cookies.putObject('cart', $scope.cart, {'expires': endDate});
            $scope.cart = $cookies.getObject('cart');

            $scope.total += parseFloat(product.price);
            $cookies.put('total', $scope.total, {'expires': endDate});
        };


        $scope.removeItemCart = function(product){

            if(product.count > 1){
                product.count -= 1;
                var endDate = new Date();
                endDate.setDate(endDate.getDate() + 1);
                $cookies.putObject('cart', $scope.cart, {'expires': endDate});
                $scope.cart = $cookies.getObject('cart');
            }
            else if(product.count === 1){
                var index = $scope.cart.indexOf(product);
                $scope.cart.splice(index, 1);
                endDate = new Date();
                endDate.setDate(endDate.getDate() + 1);
                $cookies.putObject('cart', $scope.cart, {'expires': endDate});
                $scope.cart = $cookies.getObject('cart');

            }

            $scope.total -= parseFloat(product.price);
            $cookies.put('total', $scope.total,  {'expires': endDate});

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

}]);