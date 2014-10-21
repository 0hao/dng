angular.module('DianCtrl', []).controller('DianController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        // console.log('DianController');
        $rootScope.route.markBack('index');

        $scope.swipe = function(e) {
            $rootScope.route.swipe('push', {
                'target': 'item',
                'focusBack': 'index'
            });
        }

    }
]);