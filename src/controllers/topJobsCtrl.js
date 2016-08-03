'use strict';

angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', 'currentUser', function(config, jobService, jbWidget, ngZconnected, currentUser) {
    var topJobs = this;
    topJobs.data = [];
    topJobs.config = config;
    jobService.getMostApplied(currentUser.user_id, jbWidget.company.id, jbWidget.limit).then(function(resp) {
        if (ngZconnected._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
        if (ngZconnected._DEBUG)
            console.log(error);
    })
}]);
