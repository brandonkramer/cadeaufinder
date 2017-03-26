// Products controller
angular.module('products').controller('ProductsShowController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductsService',
  function ($scope, $stateParams, $location, Authentication, ProductsService) {
    $scope.authentication = Authentication;

    $scope.filterTag = "";

    // reset the tag filter
    $scope.resetTagFilter = function() {
      // set tag filter object back to blank
      $scope.filterTag = "";
      $scope.query = "";
    }

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
