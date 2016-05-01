'use strict';

angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'topJobsService', 'jbWidget', function TopJobsCtrl(config, topJobsService, jbWidget) {
    var topJobs = this;
    topJobs.data = [];
    topJobs.config = config;
    topJobsService.mostApplied(jbWidget.user.user_id, jbWidget.company.id, jbWidget.limit).then(function(resp) {
        if (jbWidget._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
        if (jbWidget._DEBUG)
            console.log(error);
    })
}]);
