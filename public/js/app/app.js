'use strict';

angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/index",
                template: 'index',
                controller: 'HomeController'
            });

        $urlRouterProvider.otherwise('/index');

        $stateProvider
            .state('dian', {
                url: "/dian",
                template: 'dian',
                controller: 'DianController'
            })

        $locationProvider.html5Mode(true);

    }
]);


// angular.module('ngApp', ['HomeCtrl']);
angular.module('ngApp', ['ui.router', 'appRoutes', 'HomeCtrl', 'DianCtrl']);