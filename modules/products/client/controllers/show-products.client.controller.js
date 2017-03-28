// Products controller
angular.module('products').controller('ProductsShowController', ['$timeout', '$filter', '$scope', '$stateParams', '$location', 'Authentication', 'ProductsService',
  function ($timeout, $filter, $scope, $stateParams, $location, Authentication, ProductsService) {
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

    $scope.filterTags = [
      { tag: 'voor hem', label: 'Voor hem' },
      { tag: 'voor haar', label: 'Voor haar'},
      { tag: 'voor kids', label: 'Voor kids' },
    ]

    $scope.filterPrices = [
      { tag: '#', label: '0 - 20€', slug: '0-20' },
      { tag: '#', label: '20€ - 50€', slug: '20-50' },
      { tag: '#', label: '50€ - 100€', slug: '50-100' },
      { tag: '#', label: '100€ - 500€', slug: '100-500' },
    ]

    // start with empty tags array for filter
    $scope.selectedTags = [];

    // function to add or remove (toggle) tag from array
    $scope.toggleTag = function (index) {
      //check if tag exists in the array
        if($scope.selectedTags.indexOf(index) !== -1) {

          // remove tag if it does
          $timeout(function() {
            $scope.selectedTags.splice($scope.selectedTags.indexOf(index), 1);
          });

        }else{

          // add tag if its not
            $scope.selectedTags.push(index);

        }
    }

    // filter products based on selectedTags scope above
    $scope.containsComparator = function(expected, actual){
        return actual.indexOf(expected) > -1;
    };

    // function to empty tags array
    $scope.resetTags = function() {
      $scope.selectedTags = [];
    }

  }
]);



    (function () {
      'use strict';

      angular
        .module('products')
        .filter('customSplitString', function() {
          return function(input) {
            var arr = input.split(',');
            return arr;
          };
        });
    }());
