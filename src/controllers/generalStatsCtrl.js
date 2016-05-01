'use strict';

angular.module('jb-zconnect-widget-company').controller('GeneralStatsCtrl', ['generalStatsService', 'config', 'jbWidget',
    function GeneralStatsCtrl(generalStatsService, config, jbWidget) {
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
                    tickFormat: function(d) {
                        return moment.unix(d).format("MM-DD-YYYY");
                    }
                },
                "yAxis": {
                    "axisLabel": "Count",
                    "axisLabelDistance": -10
                },
                "x": function(data) {
                    return moment(data.date).unix();
                },
                "y": function(data) {
                    return parseInt(data.count);
                },

            }
        }
        generalStats.data = [];
        generalStatsService.applicant(jbWidget.user.user_id, jbWidget.company.id).then(function(resp) {
            if (jbWidget._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Applicants',
                values: resp.data
            });
        }, function(error) {
            if (jbWidget._DEBUG)
                console.log(error);
        });
        generalStatsService.job(jbWidget.user.user_id, jbWidget.company.id).then(function(resp) {
            if (jbWidget._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Jobs',
                values: resp.data
            });
        }, function(error) {
            if (jbWidget._DEBUG)
                console.log(error);
        });
    }
]);
