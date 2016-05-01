'use strict';

angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'adsService', 'jbWidget', function AdsCtrl(config, adsService, jbWidget) {
    var ads = this;
    ads.config = config;
    adsService.getAll().then(function(resp) {
        if (jbWidget._DEBUG)
            console.log(resp);
        ads.list = resp;
    }, function(error) {
        if (jbWidget._DEBUG)
            console.log(error);
    });
}]);
