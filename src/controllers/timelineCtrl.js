'use strict';

angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', ['config', 'timelineService', 'jbWidget', function TimelineCtrl(config, timelineService, jbWidget) {
    var timeline = this;
    timeline.config = config;
    timeline.currentUser = jbWidget.user;

    timeline.animateElementIn = function($el) {
        $el.removeClass('hidden');
        $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
    };

    timeline.animateElementOut = function($el) {
        $el.addClass('hidden');
        $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
    };
    timelineService.getTimelineHtml(jbWidget.user.user_id, jbWidget.company.id).then(function(resp) {
        if (jbWidget._DEBUG)
            console.log(resp);
        timeline.events = resp.data;
    }, function(error) {
        if (jbWidget._DEBUG)
            console.log(error);
    })
}]);
