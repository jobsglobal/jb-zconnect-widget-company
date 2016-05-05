angular.module('jb-zconnect-widget-company').service('dropCvService', ['$http', '$q', 'jbWidget', function($http, $q, jbWidget) {
    var self = this;
    var apiRoot = jbWidget.apiRoot;
    self.parseCV = function(fileToUpload) {
        var deferred = $q.defer();
        $http({
                method: 'POST',
                url: apiRoot + '/cv/parse',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    fileToUpload: fileToUpload
                },
                transformRequest: function(data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function(value, key) {
                        formData.append(key, value);
                    });

                    var headers = headersGetter();
                    delete headers['Content-Type'];

                    return formData;
                }

            })
            .success(function(resp) {
                deferred.resolve(resp.data);
            })
            .error(function(error) {
                deferred.rejectd(error);
            });
        return deferred.$promise;
    }
}])
