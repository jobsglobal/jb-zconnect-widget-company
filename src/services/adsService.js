angular.module('jb-zconnect-widget-company').service('adsService', ['$http', '$q', 'ngZconnected', function($http, $q, ngZconnected) {
    var apiRoot = ngZconnected.apiRoot;
    var self = this;
    self.getAll = function() {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/ads?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
}]);
