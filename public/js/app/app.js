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
angular.module('ngApp', ['ui.router', 'appRoutes', 'HomeCtrl', 'DianCtrl', 'ItemCtrl', 'MyCtrl', 'MyDetailCtrl', 'crumbService']).run(['$state', '$rootScope', 'crumbsFoo',
    function($state, $rootScope, crumbsFoo) {
        var s_index = 0;

        var stopped = false;

        var navBackTarget = '';

        $rootScope.rootSwipe = function(action, options) {
            var target = options.target,
                params = options.params || {};

            navBackTarget = options.navBack || undefined; // 指定新state的back目标

            if(action == 'push') {
                crumbsFoo.push(target);
                $state.go(target, params, {
                  // location: 'replace'
                });
            }else if(action == 'back'){

            }else if(action == 'replace'){
                $state.go(target, data, {
                  location: 'replace'
                });
            }
        }


        $rootScope.navBack = function(e) {
            // location.href = '/dian';
            history.go(-1);
            // var gohome = $state.go('home');
            
            // console.log($state.go('home'))

        }


        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            // console.log(toState)
            // console.log(fromParams)


            console.log('stateChangeStart: '+'\n'+'toState: ' + toState.name + '\n' + 'fromState: ' + fromState.name);
            // event.preventDefault();

            // if (fromState.name == 'dian' && toState.name == 'home' && !stopped) {
            //     console.log('prev')
            //     event.preventDefault();
            // }

            // if (fromState.name == 'mydetail' && toState.name == 'item' && !stopped) {
            //     stopped = true;
            //     console.log('prev')
            //     event.preventDefault();

            //     $state.go('my', {}, {
            //         location: 'replace'
            //     });

            //     stopped = false;
            // }

            // if (fromState.name == 'my' && toState.name == 'dian' && !stopped) {
            //     stopped = true;
            //     console.log('prev')
            //     event.preventDefault();

            //     $state.go('index', {}, {
            //         location: 'replace'
            //     });

            //     stopped = false;
            // }

        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            // 初始化首个路径
            console.log('stateChangeSuccess')
            if(s_index === 0) {
                crumbsFoo.push($state.current.name);
            }
            s_index++;

            $rootScope.focusBack = navBackTarget;
            navBackTarget = '';

            // console.log(event);
        });
    }
]);

window.onpopstate = function(e) {
    console.log(e);
}