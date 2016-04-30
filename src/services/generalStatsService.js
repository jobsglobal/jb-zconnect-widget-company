angular.module('jb-zconnect-widget-company').service('generalStatsService', ['$http', '$q', 'jbWidget', function($http, $q, jbWidget) {
    var self = this;
    var apiRoot = jbWidget.apiRoot;
    self.job = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/stats?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    self.applicant = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/applicant/stats?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
}])
