// Products controller
angular.module('products').controller('ProductsShowController', ['$filter', '$scope', '$stateParams', '$location', 'Authentication', 'ProductsService',
  function ($filter, $scope, $stateParams, $location, Authentication, ProductsService) {
    $scope.authentication = Authentication;

    $scope.filterTagChoice = "";

    // reset the tag filter
    $scope.resetTagFilter = function() {
      // set tag filter object back to blank
      $scope.filterTagChoice = "";
      $scope.query = "";
    }

    $scope.tagIsActive = false;
    $scope.toggleTag = function () {
      $scope.tagIsActive = !$scope.tagIsActive;
    }

    $scope.filterTags = [
      { tag: 'voor hem', label: 'Voor hem', slug: 'voorhem' },
      { tag: 'voor haar', label: 'Voor haar', slug: 'voorhaar' },
      { tag: 'voor kids', label: 'Voor kids', slug: 'voorkids' },
    ]

    $scope.filterPrices = [
      { tag: '#', label: '0 - 20€', slug: '0-20' },
      { tag: '#', label: '20€ - 50€', slug: '20-50' },
      { tag: '#', label: '50€ - 100€', slug: '50-100' },
      { tag: '#', label: '100€ - 500€', slug: '100-500' },
    ]

    $scope.filterFunctionTest = function (item) {
      return
      item.tags.indexOf('voor haar') >= 0 || item.tags.indexOf('voor kids') >= 0;
    }

    var customSplitString = $filter('customSplitString');

    $scope.selectedTags = ['voor haar','voor kids'];

    $scope.tagFilters = function(product) {
        $scope.currentTags = customSplitString(product.tags);
        return ($scope.selectedTags.indexOf(product.tags) >= 0);
    };

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
