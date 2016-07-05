'use strict';

angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', ['config', 'companyService', 'jbWidget', 'ngZconnected', function (config, companyService, jbWidget, ngZconnected) {
  var timeline = this;
  timeline.config = config;
  timeline.currentUser = jbWidget.user;

  timeline.animateElementIn = function ($el) {
    $el.removeClass('hidden');
    $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
  };

  timeline.animateElementOut = function ($el) {
    $el.addClass('hidden');
    $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
  };
  companyService.company.getTimelineHtml(jbWidget.user.user_id, jbWidget.company.id).then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    timeline.events = resp.data;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  })
}]);
