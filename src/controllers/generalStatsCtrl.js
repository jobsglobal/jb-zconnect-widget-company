'use strict';

angular.module('jb-zconnect-widget-company').controller('GeneralStatsCtrl', ['companyService', 'config', 'jbWidget', 'ngZconnected', 'currentUser',
  function (companyService, config, jbWidget, ngZconnected, currentUser) {
    var generalStats = this;
    generalStats.config = config;
    generalStats.options = {
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
        }

      }
    };
    generalStats.data = [];
    companyService.job.getApplicantGeneralStats(currentUser.user_id, jbWidget.company.id).then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      generalStats.data.push({
        key: 'Applicants',
        values: resp.data
      });
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    });
    companyService.job.getJobGeneralStats(currentUser.user_id, jbWidget.company.id).then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      generalStats.data.push({
        key: 'Jobs',
        values: resp.data
      });
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    });
  }
]);
