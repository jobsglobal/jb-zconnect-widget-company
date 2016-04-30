(function(window, undefined) {'use strict';


angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3'])
    .config(["dashboardProvider", function(dashboardProvider) {
        var widgetConfig = {
            height: 225,
            apiRoot: '/api/v1',
            _DEBUG: false,
            user: {
                user_id: 0
            },
            company: {
                id: 0
            }
        };
        var widget = {
            collapse: false,
            frameless: true,
            styleClass: "",
            reload: true,
            resolve: {}
        };
        dashboardProvider
            .widget('general-stats', angular.extend({
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html',
                controller: 'GeneralStatsCtrl',
                controllerAs: 'generalStats',
                config: angular.extend({}, widgetConfig)
            }, widget))
            .widget('top-jobs', angular.extend({
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html',
                controller: 'TopJobsCtrl',
                controllerAs: 'topJobs',
                config: angular.extend({}, widgetConfig)

            }, widget));
    }]);

angular.module("jb-zconnect-widget-company").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html","<div class=general-stats style=\"height: {{topJobs.config.height}}px !important;overflow: auto\"><nvd3 options=generalStats.options data=generalStats.data></nvd3></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html","<div class=top-jobs style=\"height: {{topJobs.config.height}}px !important;overflow: auto\"><table class=\"table table-striped table-responsive\"><tr><th>Position</th><th>Applicants</th></tr><tr data-ng-repeat=\"job in topJobs.data | limitTo: topJobs.limit\"><td data-ng-bind=\"job.job_title | limitTo: 20\"></td><td class=text-center data-ng-bind=job.total></td></tr></table></div>");}]);


angular.module('jb-zconnect-widget-company').factory('topJobsService', ['$http', '$q',
    function topJobsService($http, $q) {
        return {
            mostApplied: function(apiRoot, userId, companyId, $limit, $from, $to) {
                var deferred = $q.defer();
                var url = apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/listWithApplicants?callback=JSON_CALLBACK';
                if ($limit)
                    url += '&limit=' + $limit;
                $http.jsonp(url).then(function(resp) {
                    deferred.resolve(resp.data);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    }
]);

angular.module('jb-zconnect-widget-company').factory('generalStatsService', ['$http', '$q', function generalStatsService($http, $q) {

    return {
        job: function(apiRoot, userId, companyId) {
            var deferred = $q.defer();
            $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/stats?callback=JSON_CALLBACK').then(function(resp) {
                deferred.resolve(resp.data);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        applicant: function(apiRoot, userId, companyId) {
            var deferred = $q.defer();
            $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/applicant/stats?callback=JSON_CALLBACK').then(function(resp) {
                deferred.resolve(resp.data);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
}])



angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'topJobsService', function TopJobsCtrl(config, topJobService) {
    var topJobs = this;
    topJobs.data = [];
    topJobs.config = config;
    topJobService.mostApplied(config.apiRoot, config.user.user_id, config.company.id, config.limit).then(function(resp) {
        if (config._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
        if (config._DEBUG)
            console.log(error);
    })
}]);



angular.module('jb-zconnect-widget-company').controller('GeneralStatsCtrl', ['generalStatsService', 'config',
    function GeneralStatsCtrl(generalStatsService, config) {
        var generalStats = this;
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
        generalStatsService.applicant(config.apiRoot, config.user.user_id, config.company.id).then(function(resp) {
            if (config._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Applicants',
                values: resp.data
            });
        }, function(error) {
            if (config._DEBUG)
                console.log(error);
        });
        generalStatsService.job(config.apiRoot, config.user.user_id, config.company.id).then(function(resp) {
            if (config._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Jobs',
                values: resp.data
            });
        }, function(error) {
            if (config._DEBUG)
                console.log(error);
        });
    }
]);
})(window);