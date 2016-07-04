'use strict';

angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'resourceService', 'ngZconnected', 'userService', function AdsCtrl(config, resourceService, ngZconnected, userService) {
  var ads = this;
  ads.config = config;
  userService.getCurrentUser().then(function (currentUser) {
    console.log(currentUser);
  }, function (error) {
    console.log(error);
  });
  resourceService.adList().then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    ads.list = resp;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  });
}]);
