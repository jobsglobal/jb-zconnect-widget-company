'use strict';

angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'adsService', function AdsCtrl(config, adsService) {
    var ads = this;
    ads.config = config;
    adsService.getAll().then(function(resp) {
        if (config._DEBUG)
            console.log(resp);
        ads.list = resp;
    }, function(error) {
        if (config._DEBUG)
            console.log(error);
    });
}]);
