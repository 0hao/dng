angular.module('ItemCtrl', []).controller('ItemController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        console.log('ItemController');
        // console.log($rootScope)

        $scope.swipe = function(e) {
            $rootScope.rootSwipe('push', {
                'target': 'mydetail',
                'navBack': 'my'
            });
        }

    }
]);