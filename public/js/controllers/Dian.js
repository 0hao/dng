angular.module('DianCtrl', []).controller('DianController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        console.log('DianController');
        // console.log($rootScope)

        $scope.swipe = function(e) {
            $rootScope.rootSwipe('push', {
                'target': 'item',
                'navBack': 'index'
            });
        }

    }
]);