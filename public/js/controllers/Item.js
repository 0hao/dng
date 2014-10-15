angular.module('ItemCtrl', []).controller('ItemController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

  console.log('ItemController');
  // console.log($rootScope)

  $scope.swipe = function(e) {
    // console.log(e);
    // location.href = '/dian';
    // history.go(-1);
    $state.go('mydetail',{}, {
      // location: 'replace'
    });
    

  }

}]);