'use strict';

angular.module('jb-zconnect-widget-company').service('topJobsService', ['$http', '$q', 'jbWidget', function apiService($http, $q, jbWidget) {
    var self = this;
    var apiRoot = jbWidget.apiRoot;
    self.mostApplied = function(userId, companyId, $limit, $from, $to) {
        var deferred = $q.defer();
        var url = apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/listWithApplicants?callback=JSON_CALLBACK';
        if ($limit)
            url += '&limit=' + $limit;
        $http.jsonp(url).then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
}]);
