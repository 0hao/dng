'use strict';

angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $urlRouterProvider.otherwise("/");

        $stateProvider.state('home', {
            url: "/index",
            template: 'index <div ng-click="swipe()">go dian</div>',
            controller: 'HomeController'
        });

        $urlRouterProvider.otherwise('/index');

        $stateProvider.state('dian', {
            url: "/dian",
            template: 'dian <div ng-click="swipe()">go detail</div>',
            controller: 'DianController'
        });

        $stateProvider.state('item', {
            url: "/item",
            template: 'detail <div ng-click="swipe()">go mydetail</div>',
            controller: 'ItemController'
        });

        $stateProvider.state('my', {
            url: "/my",
            template: 'my <div ng-click="swipe()">go detail</div><br><div ng-click="back()">back index</div>',
            controller: 'MyController'
        });

        $stateProvider.state('mydetail', {
            url: "/mydetail",
            template: 'detail <div ng-click="swipe()">back my</div>',
            controller: 'MyDetailController'
        });

        $locationProvider.html5Mode(true);

    }
]);


// angular.module('ngApp', ['HomeCtrl']);
angular.module('ngApp', ['ui.router', 'appRoutes', 'HomeCtrl', 'DianCtrl', 'ItemCtrl', 'MyCtrl', 'MyDetailCtrl']).run(['$state', '$rootScope',
    function($state, $rootScope) {

        var stopped = false;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('toState: ' + toState.name + '\n' + 'fromState: ' + fromState.name);

            if (fromState.name == 'mydetail' && toState.name == 'item' && !stopped) {
                stopped = true;
                console.log('prev')
                event.preventDefault();

                $state.go('my', {}, {
                    location: 'replace'
                });

                stopped = false;
            }

            if (fromState.name == 'my' && toState.name == 'dian' && !stopped) {
                stopped = true;
                console.log('prev')
                event.preventDefault();

                $state.go('index', {}, {
                    location: 'replace'
                });

                stopped = false;
            }

        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            // console.log(event);
        });
    }
]);

window.onpopstate = function(e) {
    console.log(e);
}