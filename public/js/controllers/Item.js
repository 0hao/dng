angular.module('ItemCtrl', []).controller('ItemController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
        // console.log('ItemController');
        // console.log($rootScope)
        // $rootScope.focusBack = 'dian';
        $rootScope.route.markBack('dian');

        $scope.swipe = function(e) {
            $rootScope.route.swipe('push', {
                'target': 'mydetail',
                'focusBack': 'index',
                'params': {
                    'id': 'index'
                }
            });
        }

    }
]);