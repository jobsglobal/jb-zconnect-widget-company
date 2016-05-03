angular.module('jb-zconnect-widget-company').service('joomlaModuleService', ['$http', '$q', 'dashboard', 'jbWidget', function($http, $q, dashboard, jbWidget) {
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.getModules = function() {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/module?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    self.getModule = function(moduleName) {

        var deferred = $q.defer();
        $http.get(apiRoot + '/module?name=' + moduleName, {
            headers: {
                "Content-Type": 'text/html'
            }
        }).then(function(resp) {
            deferred.resolve(resp.data.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
}]);
