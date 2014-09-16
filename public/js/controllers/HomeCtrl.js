angular.module('HomeCtrl', []).controller('HomeController', ['$scope', '$state',function($scope,$state) {
  console.log('HomeController');
  console.log($state);
  // if(!lib.login.isLogin()) {
  //   lib.login.goLogin({
  //     hideType: "reload"
  //   });
  // }

  // $scope.showContent = true;

  $scope.form = {
    name: '',
    address: '',
    phone: ''
  }

  // 提交
  $scope.swipe = function(e) {
    console.log(e);
    // location.href = '/dian';
    console.log($state.href('/dian'));
    

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