angular.module('MyDetailCtrl', []).controller('MyDetailController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        // console.log('MyDetailController');

        $rootScope.route.markBack('my');

        $scope.swipe = function(e) {
            // console.log(e);
            // location.href = '/dian';
            history.go(-1);
            // var gohome = $state.go('home');

            // console.log($state.go('home'))

        }

    }
]);