'use strict';

angular.module('jb-zconnect-widget-company').controller('ApplicantStatsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', 'currentUser', function (config, jobService, jbWidget, ngZconnected, currentUser) {
  var vm = this;
  vm.config = config;
  vm.options = {
    "chart": {
      "type": "lineChart",
      "height": config.height,
      "margin": {
        "top": 20,
        "right": 20,
        "bottom": 40,
        "left": 55
      },
      "useInteractiveGuideline": true,
      "duration": 1000,
      "clipEdge": true,
      "stacked": false,
      "dispatch": {},
      "xAxis": {
        "axisLabel": "Date (MM-DD-YYYY)",
        showMaxMin: false,
        staggerLabels: true,
        tickFormat: function (d) {
          return moment.unix(d).format("MM-DD-YYYY");
        }
      },
      "yAxis": {
        "axisLabel": "Count",
        "axisLabelDistance": -10
      },
      "x": function (data) {
        return moment(data.date).unix();
      },
      "y": function (data) {
        return parseInt(data.count);
      },

    }
  };
  vm.data = [];
  vm.currentUser = currentUser;
  jobService.applicants.getStats(vm.currentUser.user_id, jbWidget.company.id).then(function (resp) {
    vm.data.push({
      key: 'Applicants',
      values: resp.data
    });
    if (ngZconnected._DEBUG)
      console.log(resp);
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  });
}]);
