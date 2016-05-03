'use strict';

angular.module('jb-zconnect-widget-company').service('jbWidget', function() {
    var self = this;
    self.apiRoot = '//jobsglobal.dev/api/v1';
    self.user = {};
    self.company = {};
    self._DEBUG = false;
    self.siteName = 'jobsglobal.dev';
    self.setSiteName = function(siteName) {
        self.siteName = siteName;
        return self;
    };
    self.setDebugMode = function(debugMode) {
        self._DEBUG = debugMode;
        return self;
    };
    self.setUser = function(user) {
        self.user = user;
        return self;
    };
    self.setCompany = function(company) {
        self.company = company;
        return self;
    };
    self.setApiRoot = function(apiRoot) {
        self.apiRoot = apiRoot;
        return self;
    };

    return self;
});
