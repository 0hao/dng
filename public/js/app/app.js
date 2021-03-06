'use strict';

angular.module('appRoutes', ['state']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $urlRouterProvider.otherwise("/");

        $stateProvider.state('index', {
            url: "/index",
            template: 'index <div state-go="dian"><span>go dian</span></div>',
            controller: 'HomeController',
            data: {}
        });

        $urlRouterProvider.otherwise('/index');

        $stateProvider.state('dian', {
            url: "/dian",
            template: 'dian <div ng-click="swipe()">go item</div> <div ng-back="{{state.header.focusBack}}">back</div>',
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

        // $locationProvider.html5Mode(true);

    }
]);


angular.module('ngApp', ['ui.router', 'appRoutes', 'state', 'ngSanitize', 'HomeCtrl', 'DianCtrl', 'ItemCtrl', 'MyCtrl', 'MyDetailCtrl']).run(['stateService' ,
    function() {
        console.log('run')
    }
])