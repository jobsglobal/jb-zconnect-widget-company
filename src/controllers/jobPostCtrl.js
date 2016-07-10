'use strict';

angular.module('jb-zconnect-widget-company').controller('JobPostCtrl', ['resourceService', 'ngZconnected', '$sce',
  function (resourceService, ngZconnected, $sce) {
    var jobPost = this;
    jobPost.moduleHtml= '';
    resourceService.modules.getByName('mod_job_post').then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      jobPost.moduleHtml= resp;
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    });
  }
]);
