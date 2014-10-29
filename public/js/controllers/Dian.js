angular.module('DianCtrl', []).controller('DianController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
        console.warn('dian')

        $rootScope.state.setHeader({
            'back': 'index',
            'title': 'dian'
        });

        $scope.swipe = function(e) {
            $rootScope.state.go('push', {
                'target': 'item',
                'focusBack': 'index'
            });
        }

    }
]);