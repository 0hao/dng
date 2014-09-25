angular.module('DianCtrl', []).controller('DianController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

  // console.log('DianController');
  // console.log($rootScope)

  $scope.swipe = function(e) {
    // console.log(e);
    // location.href = '/dian';
    // history.go(-1);
    $state.go('my',{}, {
      // location: 'replace'
    });
    

  }

}]);