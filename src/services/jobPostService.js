'use strict';
angular.module('jb-zconnect-widget-company').service('jobPostService', ['$http', '$q', 'dashboard', 'jbWidget', 'Upload', '$resource', function($http, $q, dashboard, jbWidget, Upload, $resource) {
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.api = $resource(apiRoot + "/employer/:id/company/:companyid/job?social=1");
    self.save = function(id, companyid, job) {
        return this.api.save({ id: id, companyid: companyid }, job).$promise;
    };
    self.uploadPhoto = function(id, companyid, jobid, file) {
        var data = {};
        data['photo'] = file;
        return Upload.upload({
            url: Zconnected.apiUrl + '/employer/' + id + '/company/' + companyid + '/job/' + jobid + '/upload',
            data: data,
        });
    };
}]);
