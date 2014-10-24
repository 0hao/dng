angular.module('MyCtrl', []).controller('MyController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        $rootScope.state.markBack('index');

        // console.log('MyController');

        $scope.swipe = function(e) {
            $rootScope.state.go('push', {
                'target': 'mydetail'
            });
        }


        // $scope.back = function(e) {
        //   // console.log(e);
        //   // location.href = '/dian';
        //   history.go(-2);
        //   // var gohome = $state.go('home');

        //   // console.log($state.go('home'))

        // }

    }
]);