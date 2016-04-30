'use strict';

angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3'])
    .config(function(dashboardProvider) {
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
    });
