'use strict';

angular.module('jb-zconnect-widget-company').provider('jbWidget', function() {
    var self = this;
    var apiRoot = '//jobsglobal.dev/api/v1';
    self.setApiRoot = function(value) {
        apiRoot = value;
    }
    self.$get = [function() {
        return {
            apiRoot: apiRoot
        }
    }];
});
