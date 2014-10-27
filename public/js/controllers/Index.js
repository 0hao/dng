angular.module('HomeCtrl', []).controller('HomeController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
        // console.log('HomeController');

        $rootScope.state.setHeader({
            'back': '',
            'title': '首页',
            'options': ['<div class="search">搜索</div>']
        });


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

        // 表单重置
        function formReset() {
            $scope.form = {
                name: '',
                address: '',
                phone: ''
            }
        }

    }
]);