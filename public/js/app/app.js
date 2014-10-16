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
angular.module('ngApp', ['ui.router', 'appRoutes', 'HomeCtrl', 'DianCtrl', 'ItemCtrl', 'MyCtrl', 'MyDetailCtrl', 'crumbService']).run(['$state', '$rootScope', 'crumbs', 'crumbsFoo',
    function($state, $rootScope, crumbs, crumbsFoo) {
        var s_index = 0;

        var stopped = false;

        var replace_s = {
            'to': '',
            'from': ''
        };

        var navBackTarget = '';

        $rootScope.rootSwipe = function(action, options) {
            var target = options.target,
                params = options.params || {};

            navBackTarget = options.navBack ? (target + '>>' + options.navBack) : ''; // 指定新state的back目标

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


        $rootScope.navBack = function() {
            if($rootScope.focusBack) {
                // 强制返回

                // 计算位置
                var crumb_index;
                for (var i = 0, len = crumbs.v.length; i < len; i++) {

                    if ($rootScope.focusBack == crumbs.v[i]) {
                        crumb_index = len - i + 1;
                        break;
                    }
                }

                if(!crumb_index) {
                    // focusBack不在crumb中
                    replace_s = {
                        'to': $rootScope.focusBack,
                        'from': 'mydetail'
                    }
                    history.go(-1);
                }
                console.log(crumb_index);
            }else{
                // todo 后退
                history.go(-1)
            }
            // console.log($rootScope.focusBack);
            // history.go(-1);
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

            if (replace_s.to && fromState.name == replace_s.from && !stopped) {
                stopped = true;
                console.log('prev')
                event.preventDefault();

                $state.go(replace_s.to, {}, {
                    location: 'replace'
                });

                replace_s = {
                    'to': ''
                };

                stopped = false;
            }

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

            if(navBackTarget) {
                var nbt_arr = navBackTarget.split('>>');

                if(toState.name == nbt_arr[0]) {
                    $rootScope.focusBack = nbt_arr[1];
                }else{
                    $rootScope.focusBack = '';
                }
            }else{
                $rootScope.focusBack = '';
            }

        });
    }
]);

window.onpopstate = function(e) {
    console.log(e);
}