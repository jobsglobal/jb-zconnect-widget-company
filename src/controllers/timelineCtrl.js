'use strict';

angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', [
  'config',
  'companyService',
  'jbWidget',
  'ngZconnected',
  'currentUser',
  function (config, companyService, jbWidget, ngZconnected, currentUser) {
    var vm = this;
    vm.config = config;
    vm.currentUser = currentUser;

    vm.animateElementIn = function ($el) {
      $el.removeClass('timeline-hidden');
      $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
    };

    vm.animateElementOut = function ($el) {
      $el.addClass('timeline-hidden');
      $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
    };
    companyService.company.getTimelineHtml(vm.currentUser.user_id, jbWidget.company.id).then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      vm.events = resp.data;
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    })
  }]);
