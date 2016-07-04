angular.module('jb-zconnect-widget-company').service('applicantStatsService', ['$http', '$q', 'dashboard', 'jbWidget', function($http, $q, dashboard, jbWidget) {
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.getStats = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/applicant/stats?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    self.getCount = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/applicant/count?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
}]);
