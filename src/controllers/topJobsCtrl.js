'use strict';

angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'topJobsService', 'jbWidget', 'ngZconnected', function (config, topJobsService, jbWidget, ngZconnected) {
  var topJobs = this;
  topJobs.data = [];
  topJobs.config = config;
  topJobsService.mostApplied(jbWidget.user.user_id, jbWidget.company.id, jbWidget.limit).then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    topJobs.data = resp.data;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  })
}]);
