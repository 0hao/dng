angular.module('DianCtrl', []).controller('DianController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

  console.log('DianController');
  console.log($rootScope)

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
    // do something

    console.log(event);
    // console.log(toState);
    // console.log(toParams);
    // console.log(fromState);
    // console.log(fromParams);
    // history.go(-1);
    

    console.log(1);
    
    event.preventDefault();

    $state.go('home');

  })

  $scope.swipe = function(e) {
    // console.log(e);
    // location.href = '/dian';
    // history.go(-1);
    $state.go('home');
    

  }

}]);