'use strict';

angular.module('jb-zconnect-widget-company').service('jbWidget', function() {
    var self = this;
    self.apiRoot = '//jobsglobal.dev/api/v1';
    self.user = {};
    self.company = {};
    self._DEBUG = false;
    self.setDebugMode = function(value) {
        self._DEBUG = value;
    };
    self.setUser = function(value) {
        self.user = value;
    };
    self.setCompany = function(value) {
        self.company = value;
    };
    self.setApiRoot = function(value) {
        self.apiRoot = value;
    };

    return self;
});
