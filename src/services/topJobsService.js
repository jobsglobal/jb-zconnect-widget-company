'use strict';

angular.module('jb-zconnect-widget-company').factory('topJobsService', ['$http', '$q',
    function topJobsService($http, $q) {
        return {
            mostApplied: function(apiRoot, userId, companyId, $limit, $from, $to) {
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
        };
    }
]);
