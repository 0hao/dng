'use strict';

angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $urlRouterProvider.otherwise("/");

        $stateProvider.state('index', {
            url: "/index",
            template: 'index <div ng-click="state.go(\'push\', {\'target\': \'dian\'});">go dian</div>',
            controller: 'HomeController',
            data: {}
        });

        $urlRouterProvider.otherwise('/index');

        $stateProvider.state('dian', {
            url: "/dian",
            template: 'dian <div ng-click="swipe()">go item</div>',
            controller: 'DianController',
            data: {}
        });

        $stateProvider.state('item', {
            url: "/item",
            template: 'detail <div ng-click="swipe()">go mydetail</div>',
            controller: 'ItemController',
            data: {}
        });

        $stateProvider.state('my', {
            url: "/my",
            template: 'my <div ng-click="swipe()">go detail</div><br><div ng-click="back()">back index</div>',
            controller: 'MyController',
            data: {}
        });

        $stateProvider.state('mydetail', {
            url: "/mydetail?id",
            template: 'detail <div ng-click="state.back()">back my</div>',
            controller: 'MyDetailController',
            data: {}
        });

        $locationProvider.html5Mode(true);

    }
]);


angular.module('ngApp', ['ui.router', 'appRoutes', 'HomeCtrl', 'DianCtrl', 'ItemCtrl', 'MyCtrl', 'MyDetailCtrl', 'state']).run(['stateService' ,
    function() {
        console.log('run')
    }
]);