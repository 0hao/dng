'use strict';

angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $urlRouterProvider.otherwise("/");

        $stateProvider.state('index', {
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
            template: 'detail <div ng-click="navBack()">back my</div>',
            controller: 'MyDetailController'
        });

        $locationProvider.html5Mode(true);

    }
]);


// angular.module('ngApp', ['HomeCtrl']);
angular.module('ngApp', ['ui.router', 'appRoutes', 'HomeCtrl', 'DianCtrl', 'ItemCtrl', 'MyCtrl', 'MyDetailCtrl', 'crumbService']).run(['$state', '$rootScope', 'crumbs', 'crumbsFoo',
    function($state, $rootScope, crumbs, crumbsFoo) {
        var s_index = 0;

        $rootScope.cv = JSON.stringify(crumbs);

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
                // 表明手动前进
                crumbs.forward = true;
                
                $state.go(target, params, {
                  // location: 'replace'
                });

                setTimeout(function(){
                    crumbsFoo.push(target);
                }, 0)
            }else if(action == 'back'){

            }else if(action == 'replace'){
                $state.go(target, data, {
                  location: 'replace'
                });
            }
        }


        $rootScope.navBack = function(e, backToState) {
            crumbs.back = true;
            var pops;
            if($rootScope.focusBack) {
                // 强制返回

                // 计算位置
                var back_len; //后退步数
                for (var i = 0, len = crumbs.v.length; i < len; i++) {

                    if ($rootScope.focusBack == crumbs.v[i]) {
                        back_len = len - i - 1;
                        break;
                    }
                }
                

                if(!back_len) {
                    // focusBack不在crumb中

                    if(!backToState) {
                        // 非浏览器后退
                        replace_s = {
                            'to': $rootScope.focusBack,
                            'from': $state.current.name
                        }
                        history.go(-1);
                    }
                    
                    pops = 1;
                }else{
                    // toState在crumb中

                    if(backToState) {
                        // 来自浏览器后退
                        event.preventDefault();
                        back_len -=1;
                        stopped = true
                    }
console.log(back_len)
                    replace_s = {
                        'to': $rootScope.focusBack,
                        'from': $state.current.name
                    }

                    if(back_len) {
                        history.go(-back_len);
                    }
                    
                    if(backToState) {
                        pops = back_len + 1;
                    }else{
                        pops = back_len;
                    }
                    
                }
                
            }else{
                // 非强制返回

                if(backToState) {
                    // 来自浏览器后退
                    // $state.go(backToState.name, {}, {
                    //     location: 'replace'
                    // });
                }else{
                    history.go(-1);
                }
                
                pops = 1;
                
            }

            setTimeout(function(){
                crumbsFoo.pop(pops);
            }, 0)
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

            
            var prev_state = crumbs.v[crumbs.v.length-2];
            if(!crumbs.forward && !crumbs.back && !stopped) {
                if(toState.name == prev_state) {
                    // 后退

                    // if($rootScope.focusBack) {
                    //     // 强制后退阻止默认
                    //     event.preventDefault();
                    // }
                    
                    console.log('后退');
                    $rootScope.navBack(event, toState);
                }else{
                    // 前进
                    console.log('前进');
                    crumbsFoo.push(toState.name);
                }
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
                // crumbsFoo.push($state.current.name);
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