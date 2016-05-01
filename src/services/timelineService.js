angular.module('jb-zconnect-widget-company').service('timelineService', ['$http', '$q', 'dashboard', 'jbWidget', function($http, $q, dashboard, jbWidget) {
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.getTimelineHtml = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/activities?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
}]);
