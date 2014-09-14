angular.module('MtopService', []).factory('mtop', ['$rootScope', '$q',
    function($rootScope, $q) {

        var lib_mtop = lib.mtop,
            exe = function(d) {
                if (d.ret[0] && d.ret[0].indexOf("SUCCESS") != -1 && d.data) {
                    return d.data;
                }
                return null;
            };
        return {
            request: function(param) {
                var deferred = $q.defer();
                lib_mtop.request({
                    api: param.api,
                    v: param.v,
                    data: param.data
                }, function(resJson, retType) {
                    //d = exe(d);
                    deferred.resolve(resJson, retType);
                    //$rootScope.$apply();
                }, function(resJson, retType) {
                    deferred.reject(resJson, retType);
                    //$rootScope.$apply();
                });
                return deferred.promise;
            }
        };

    }
]);