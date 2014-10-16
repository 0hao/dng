'use strict';

angular.module('crumbService', []).value('crumbs',{
    v: [],
    forward: true,
    event: true,
    back: false
}).service('crumbsFoo', function(crumbs) {
    console.log(crumbs);
  //   var thisIsPrivate = "Private";
  // function getPrivate() {
  //   return thisIsPrivate;
  // }

  // return {
  //   variable: "This is public",
  //   getPrivate: getPrivate
  // };

  var thisIsPrivate = "Private";
  this.variable = "This is public";
  this.push = function(target) {
    crumbs.v.push(target);
    console.log(crumbs.v)
    // return thisIsPrivate;
  };

  this.back = function(options) {
    return thisIsPrivate;
  };

  this.replace = function(options) {
    return thisIsPrivate;
  };

  // return a * 2;
})/*.service('foo', function() {
  
});*/

// crumb.factory('foo', function() {
//   var thisIsPrivate = "Private";
//   function getPrivate() {
//     return thisIsPrivate;
//   }

//   return {
//     variable: "This is public",
//     getPrivate: getPrivate
//   };
// });