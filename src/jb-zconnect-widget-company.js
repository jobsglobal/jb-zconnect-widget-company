'use strict';

angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3', 'ngDropzone', 'slick', 'ngSanitize'])
    .config(function(dashboardProvider) {
        Dropzone.autoDiscover = false;
        var widgetConfig = {
            height: 225,
            _DEBUG: false
        };
        var widget = {
            collapse: false,
            frameless: false,
            styleClass: "",
            reload: true,
            resolve: {}
        };
        dashboardProvider
            .widget('general-stats', angular.extend(widget, {
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html',
                controller: 'GeneralStatsCtrl',
                controllerAs: 'generalStats',
                config: angular.extend(widgetConfig, {})
            }))
            .widget('top-jobs', angular.extend(widget, {
                title: 'Company Top Jobs',
                description: 'Widget for showing most applied jobs from company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html',
                controller: 'TopJobsCtrl',
                controllerAs: 'topJobs',
                config: angular.extend(widgetConfig, {})

            }))
            .widget('drop-cv', angular.extend(widget, {
                title: 'Company CV Dropzone',
                description: 'Widget that provides a dropzone area for uploading applicants cv.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/drop-cv.html',
                controller: 'DropCvCtrl',
                controllerAs: 'dropCv',
                reload: false,
                config: angular.extend(widgetConfig, {})

            }))
            .widget('ads', angular.extend(widget, {
                title: 'Advertisements',
                description: 'Widget that shows advertisements.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/ads.html',
                controller: 'AdsCtrl',
                controllerAs: 'ads',
                config: angular.extend(widgetConfig, {})

            }))
            .widget('timeline', angular.extend(widget, {
                title: 'Timeline',
                description: 'Widget that shows company timeline/activities.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/timeline.html',
                controller: 'TimelineCtrl',
                controllerAs: 'timeline',
                config: angular.extend(widgetConfig, {})
            }));
    });
