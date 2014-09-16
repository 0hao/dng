angular.module('DianCtrl', []).controller('DianController', ['$scope', '$state', function($scope, $state) {

  console.log('DianController');

  $scope.swipe = function(e) {
    console.log(e);
    // location.href = '/dian';
    $state.go('home');
    

  }

}]);