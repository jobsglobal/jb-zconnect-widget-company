angular.module('jb-zconnect-widget-company').factory('generalStatsService', ['$http', '$q', function generalStatsService($http, $q) {

    return {
        job: function(apiRoot, userId, companyId) {
            var deferred = $q.defer();
            $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/stats?callback=JSON_CALLBACK').then(function(resp) {
                deferred.resolve(resp.data);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        applicant: function(apiRoot, userId, companyId) {
            var deferred = $q.defer();
            $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/applicant/stats?callback=JSON_CALLBACK').then(function(resp) {
                deferred.resolve(resp.data);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
}])
