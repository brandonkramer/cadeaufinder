// Products controller
angular.module('products').controller('ProductsShowController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductsService',
  function ($scope, $stateParams, $location, Authentication, ProductsService) {
    $scope.authentication = Authentication;

    // Find a list of Produts
    $scope.find = function () {
      $scope.products = ProductsService.query();
    };

    // Find existing Product
    $scope.findOne = function () {
      $scope.product = ProductsService.get({
        productId: $stateParams.productId
      });
    };
  }
]);
