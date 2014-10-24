angular.module('DianCtrl', []).controller('DianController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {
        console.warn('dian')

        // console.log('DianController');
        $rootScope.state.markBack('index');

        $scope.swipe = function(e) {
            $rootScope.state.go('push', {
                'target': 'item',
                'focusBack': 'index'
            });
        }

    }
]);