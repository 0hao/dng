angular.module('ItemCtrl', []).controller('ItemController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
        // console.log('ItemController');
        // console.log($rootScope)
        // $rootScope.focusBack = 'dian';
        $rootScope.state.setHeader({
            'back': 'index',
            'title': 'dian'
        });

        $scope.swipe = function(e) {
            $rootScope.state.go('push', {
                'target': 'mydetail',
                'focusBack': 'index',
                'params': {
                    'id': 'index'
                }
            });
        }

    }
]);