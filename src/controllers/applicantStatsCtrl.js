'use strict';

angular.module('jb-zconnect-widget-company').controller('ApplicantStatsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', function (config, jobService, jbWidget, ngZconnected) {
  var applicantStats = this;
  applicantStats.config = config;
  applicantStats.options = {
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
  }
  applicantStats.data = [];
  jobService.applicants.getStats(jbWidget.user.user_id, jbWidget.company.id).then(function (resp) {
    applicantStats.data.push({
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
