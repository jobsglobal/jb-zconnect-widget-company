'use strict';

angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'topJobsService', function TopJobsCtrl(config, topJobService) {
    var topJobs = this;
    topJobs.data = [];
    topJobService.mostApplied(config.apiRoot, config.user.user_id, config.company.id, config.limit).then(function(resp) {
        if (config._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
        if (config._DEBUG)
            console.log(error);
    })
}]);
