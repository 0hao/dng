'use strict';

angular.module('crumbService', []).value('crumbs', {
    v: [],
    forward: false,
    event: false,
    back: false
}).service('crumbsFoo', function(crumbs) {
    

    this.push = function(target) {
        crumbs.v.push(target);
        crumbs.forward = false;
        console.log(crumbs);
        // return thisIsPrivate;
    };

    this.pop = function(len) {
        for (var i = 0; i < len; i++) {
            crumbs.v.pop();
        }
        crumbs.back = false;
        console.log(crumbs);
    };

    this.replace = function(options) {

    };

})
