'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.example1model = [];
    $scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"} ];
    $scope.trans = { buttonDefaultText: 'Voor'  };
    $scope.example1settings = {
      showCheckAll: false,
      buttonDefaultText: 'Voor',
      showUncheckAll: false,
        smartButtonMaxItems: 2,
      smartButtonTextConverter: function(itemText, originalItem) { if (itemText === '') {  } return itemText; }
    }
  }
]);
