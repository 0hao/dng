angular.module('HomeCtrl', []).controller('HomeController', ['$scope', function($scope) {
  console.log('HomeController')
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
  $scope.save = function(a) {

    

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