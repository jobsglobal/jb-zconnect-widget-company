'use strict';

angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'resourceService', 'ngZconnected', function (config, resourceService, ngZconnected) {
  var ads = this;
  ads.config = config;
  resourceService.adList().then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    ads.list = resp;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  });
}]);
