(function () {
  'use strict';

  // Products controller
  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$timeout', '$state', '$window', 'Authentication', 'productResolve', 'FileUploader'];

  function ProductsController ($scope, $timeout, $state, $window, Authentication, product, FileUploader) {
    var vm = this;

    vm.authentication = Authentication;
    vm.product = product;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;




    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/products/picture'
    });



    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      },
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.image = fileReaderEvent.target.result;

          }, 0);
        };
      }
        $scope.imgname = vm.product.slug+'-'+fileItem._file.name;
        vm.product.imageFile = vm.product.slug+'-'+fileItem._file.name;
        vm.product.image = 'modules/products/img/products/uploads/'+vm.product.slug+'-'+fileItem._file.name;
    }



    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      // Populate user object
      $scope.user = Authentication.user = response;
      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();
      // Show error message
      $scope.error = response.message;
    };

        // Change user profile picture
        $scope.uploadProductPicture = function () {


        };

        // Cancel the upload process
        $scope.cancelUpload = function () {
          $scope.uploader.clearQueue();
          $scope.image = vm.product.image;
        };


    // Remove existing Product
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.product.$remove($state.go('products.list'));
      }
    }

    // Save Product
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }



          $scope.uploader.onBeforeUploadItem = onBeforeUploadItem;
      function onBeforeUploadItem(item) {
        item.formData.push({
          image : '' + $scope.imgname
        });
      }
      console.log($scope.uploader);


      ///////////////////////// upload
      // Clear messages
      $scope.success = $scope.error = null;
      // Start upload
      $scope.uploader.uploadAll({});



      // TODO: move create/update logic to service
      if (vm.product._id) {
        vm.product.$update(successCallback, errorCallback);
      } else {
        vm.product.$save(successCallback, errorCallback);
      }

      function successCallback(res) {

        $state.go('products.view', {
          productId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    }

  }


}());
