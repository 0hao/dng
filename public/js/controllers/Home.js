angular.module('HomeCtrl', []).controller('HomeController', ['$scope', '$rootScope', '$state',function($scope, $rootScope, $state) {
  console.log('HomeController');

  $rootScope.hlen = 'history.length: ' + history.length;
  

  // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
  //   // do something

  //   console.log(event);
  //   // console.log(toState);
  //   // console.log(toParams);
  //   // console.log(fromState);
  //   // console.log(fromParams);
  //   // event.preventDefault();
  // })

  // if(!lib.login.isLogin()) {
  //   lib.login.goLogin({
  //     hideType: "reload"
  //   });
  // }

  // $scope.showContent = true;
  // console.log($state);

  $scope.form = {
    name: '',
    address: '',
    phone: ''
  }

  // 提交
  $scope.swipe = function(e) {
    // console.log(e);
    // location.href = '/dian';
    $state.go('dian',{}, {
      // location: 'replace'
    })
    

  }

  // 表单重置
  function formReset() {
    $scope.form = {
      name: '',
      address: '',
      phone: ''
    }
  }

}]);