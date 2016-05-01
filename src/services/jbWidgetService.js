'use strict';

angular.module('jb-zconnect-widget-company').provider('jbWidget', function() {
    var self = this;
    var apiRoot = '//jobsglobal.dev/api/v1';
    var user = {};
    var company = {};
    var _DEBUG = false;
    self.setDebugMode = function(value) {
        _DEBUG = value;
    }
    self.setUser = function(value) {
        user = value;
    };
    self.setCompany = function(value) {
        company = value;
    };
    self.setApiRoot = function(value) {
        apiRoot = value;
    };

    self.$get = [function() {
        return {
            apiRoot: apiRoot,
            user: user,
            company: company,
            _DEBUG: _DEBUG
        }
    }];
});
