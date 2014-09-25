angular.module('MyCtrl', []).controller('MyController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

  console.log('MyController');
  console.log($rootScope);
  var stopped = false;

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
    // do something

    
    // console.log(toState);
    // console.log(toParams);
    // console.log(fromState);
    // console.log(fromParams);
    // history.go(-1);
    

    // console.log(toState);
    console.log(toState);
    console.log(fromState);


    if(fromState.name == 'my' && toState.name == 'dian' && !stopped) {
      stopped = true;
      event.preventDefault();console.log('prev')

      $state.go('home', {}, {
        location: 'replace'
      });
    }
    
    

    

    // $state.go('home', {}, {
    //   location: 'replace'
    // });

  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    // console.log(event);
  });

  

  $scope.swipe = function(e) {
    // console.log(e);
    // location.href = '/dian';
    history.go(-2);
    // var gohome = $state.go('home');
    
    // console.log($state.go('home'))

  }

}]);