'use strict';

angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $urlRouterProvider.otherwise("/");

        $stateProvider.state('index', {
            url: "/index",
            template: 'index <div ng-click="swipe()">go dian</div>',
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
            template: 'detail <div ng-click="navBack()">back my</div>',
            controller: 'MyDetailController',
            data: {}
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

        $rootScope.route = {
            /*
             * 点击切换
             */
            focusBack: '',

            /*
             * 点击切换
             */
            swipe: function(action, options) {
                var target = options.target,
                    params = options.params || {};

                // 接受指定的back目标
                navBackTarget = options.focusBack ? (target + '>>' + options.focusBack) : ''; 

                

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
                    $state.go(target, params, {
                      location: 'replace'
                    });
                }
            },

            /*
             * 标记左上角返回按钮目标
             */
            markBack: function(subBack) {
                this.focusBack = $state.current.data.focusBack || subBack;
            },

            /*
             * 导航返回（包括左上角）
             */
            navBack: function(e, backToState) {
                var _this = this;

                crumbs.back = true;
                var pops, sub_crumb;
                if(_this.focusBack) {
                    // 强制返回

                    // 计算位置
                    var back_len; //后退步数
                    for (var i = 0, len = crumbs.v.length; i < len; i++) {

                        if (_this.focusBack == crumbs.v[i]) {
                            back_len = len - i - 1;
                            break;
                        }
                    }
                    

                    if(!back_len) {
                        // focusBack不在crumb中

                        if(!backToState) {
                            // 非浏览器后退

                            if(crumbs.v.length <=1) {
                                // 没有可后退记录，则replace
                                console.log(back_len);
                                _this.swipe('replace', {
                                    target: _this.focusBack
                                });
                            }else{
                                // 
                                replace_s = {
                                    'to': _this.focusBack,
                                    'from': $state.current.name
                                }
                                history.go(-1);
                            }
                            
                        }

                        // 要替换面包屑
                        sub_crumb = _this.focusBack;

                        pops = 1;
                    }else{
                        // toState在crumb中

                        if(backToState) {
                            // 来自浏览器后退：已执行一次history.go(-1)

                            // 剩余路径减一
                            back_len -=1;
                        }
                        console.log(back_len)
                        if(back_len && backToState) {
                            // 还有剩余的后退记录

                            // 防止重复stateChange
                            stopped = true;

                            // 更新state的from项
                            // replace_s = {
                            //     'to': _this.focusBack,
                            //     'from': backToState.name
                            // }
                        }
                        
                        // 点击后退
                        replace_s = {
                            'to': _this.focusBack,
                            'from': $state.current.name
                        }
                        

                        if(back_len) {
                            // 执行剩余后退，进入stateChange监听
                            history.go(-back_len);
                        }else{
                            // 不会再执行stateChange 所以需要重置标记
                            replace_s = {
                                'to': '',
                            }
                            stopped = false;

                            _this.swipe('replace', {
                                target: _this.focusBack
                            });
                        }
                        
                        if(backToState) {
                            // 因为执行过 history.go(-1) ，所以面包屑回删增加一条
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
                    crumbsFoo.pop(pops, sub_crumb);
                }, 0)
                // console.log($rootScope.focusBack);
                // history.go(-1);
                // var gohome = $state.go('home');
                
                // console.log($state.go('home'))

            }
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
console.log(JSON.stringify(replace_s) +' '+fromState.name)
            if (replace_s.to && fromState.name == replace_s.from && !stopped) {
                stopped = true;
                console.warn('prev & replace')
                event.preventDefault();

                var to = replace_s.to;

                replace_s = {
                    'to': ''
                };
                

                $state.go(to, {}, {
                    location: 'replace'
                });

                stopped = false;

                console.log('gogogogo');
                return
            }

            console.warn(stopped)
            var prev_state = crumbs.v[crumbs.v.length-2];
            if(!crumbs.forward && !crumbs.back && !stopped) {
                if(toState.name == prev_state) {
                    // 后退

                    if($rootScope.route.focusBack) {
                        // 强制后退阻止默认
                        event.preventDefault();
                    }
                    
                    console.log('后退');
                    $rootScope.route.navBack(event, toState);
                }else{
                    // 前进
                    console.log('前进');
                    crumbsFoo.push(toState.name);
                }

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
                // crumbsFoo.push($state.current.name);
            }
            s_index++;

            if(navBackTarget) {
                var nbt_arr = navBackTarget.split('>>');

                if(toState.name == nbt_arr[0]) {
                    // $rootScope.focusBack = nbt_arr[1];

                    toState.data.focusBack = nbt_arr[1];
                }else{
                    // $rootScope.focusBack = '';
                }
            }else{
                // $rootScope.focusBack = '';
            }

        });
    }
]);

window.onpopstate = function(e) {
    console.log(e);
}