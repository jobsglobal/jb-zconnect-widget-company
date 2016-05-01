'use strict';

angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', ['config', 'timelineService', function TimelineCtrl(config, timelineService) {
    var timeline = this;
    timeline.config = config;
    timelineService.getTimelineHtml(config.user.user_id, config.company.id).then(function(resp) {
        if (config._DEBUG)
            console.log(resp);
        timeline.events = resp.data;
    }, function(error) {
        if (config._DEBUG)
            console.log(error);
    })
}]);
