'use strict';

angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3'])
    .config(function(dashboardProvider) {
        var widget = {
            reload: true,
            resolve: {},
            edit: {
                templateUrl: '{widgetsPath}/github/src/edit.html'
            },
            config: {
                height: 225,
                apiRoot: '/api/v1',
                _DEBUG: false,
                user: {
                    user_id: 0
                },
                company: {
                    id: 0
                }
            }
        };
        dashboardProvider
            .widget('general-stats', angular.extend({
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html',
                controller: 'GeneralStatsCtrl',
                controllerAs: 'generalStats'
            }, widget))
            .widget('top-jobs', angular.extend({
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html',
                controller: 'TopJobsCtrl',
                controllerAs: 'topJobs'

            }, widget));
    });
