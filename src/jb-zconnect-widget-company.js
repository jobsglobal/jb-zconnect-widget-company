'use strict';

angular.module('jb-zconnect-widget-company', [
        'adf.provider',
        'nvd3',
        'ngDropzone',
        'ngSanitize',
        'angular-timeline',
        'angularMoment',
        'ngAnimate',
        'ngFileUpload',
        'ngResource',
        'angular-underscore',
        'ngZconnected',
        'ui.bootstrap'
    ])
    .config(function(dashboardProvider) {
        Dropzone.autoDiscover = false;
        var widgetTemplatesPath = '{widgetsPath}/jb-zconnect-widget-company/src/templates/';
        var widgetConfig = {
            height: 225,
            _DEBUG: false
        };
        var widget = {
            collapse: false,
            frameless: false,
            styleClass: "",
            reload: true,
            resolve: {
                currentUser: ['userService', function(userService) {
                    return userService.getCurrentUser();
                }]
            }
        };
        dashboardProvider
            .widget('general-stats', angular.extend(widget, {
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: widgetTemplatesPath + 'general-stats.html',
                controller: 'GeneralStatsCtrl',
                controllerAs: 'generalStats',
                styleClass: 'general-stats',
                config: angular.extend(widgetConfig, {})
            }))
            .widget('top-jobs', angular.extend(widget, {
                title: 'Company Top Jobs',
                description: 'Widget for showing most applied jobs from company.',
                templateUrl: widgetTemplatesPath + 'top-jobs.html',
                controller: 'TopJobsCtrl',
                controllerAs: 'topJobs',
                styleClass: 'top-jobs',
                config: angular.extend(widgetConfig, {})
            }))
            .widget('drop-cv', angular.extend(widget, {
                title: 'Company CV Dropzone',
                description: 'Widget that provides a dropzone area for uploading applicants cv.',
                templateUrl: widgetTemplatesPath + 'drop-cv.html',
                controller: 'DropCvCtrl',
                controllerAs: 'dropCv',
                styleClass: 'drop-cv',
                reload: false,
                config: angular.extend(widgetConfig, {})

            }))
            .widget('ads', angular.extend(widget, {
                title: 'Advertisements',
                description: 'Widget that shows advertisements.',
                templateUrl: widgetTemplatesPath + 'ads.html',
                controller: 'AdsCtrl',
                controllerAs: 'ads',
                styleClass: 'ads',
                config: angular.extend(widgetConfig, {})

            }))
            .widget('timeline', angular.extend(widget, {
                title: 'Timeline',
                description: 'Widget that shows company timeline/activities.',
                templateUrl: widgetTemplatesPath + 'timeline.html',
                controller: 'TimelineCtrl',
                controllerAs: 'timeline',
                styleClass: 'timeline',
                config: angular.extend(widgetConfig, {})
            }))
            .widget('job-post-form', angular.extend(widget, {
                title: 'Job Post',
                description: 'Widget that shows a form for job posting.',
                templateUrl: widgetTemplatesPath + 'job-post.html',
                controller: 'JobPostCtrl',
                controllerAs: 'jobPost',
                styleClass: 'job-post-form',
                config: angular.extend(widgetConfig, {})
            }))
            .widget('applicant-stats', angular.extend(widget, {
                title: 'Applicant Stats',
                description: 'Widget that shows visual statistics for total applicants of company.',
                templateUrl: widgetTemplatesPath + 'applicant-stats.html',
                controller: 'ApplicantStatsCtrl',
                controllerAs: 'applicantStats',
                styleClass: 'applicant-stats',
                config: angular.extend(widgetConfig, {})
            }));
    }).provider('jbWidget', function() {
        var self = this;
        var apiRoot = '//jobsglobal.dev/api/v1';
        var user = {};
        var company = {};
        var siteName = 'jobsglobal.dev';
        self.setSiteName = function(_siteName) {
            siteName = _siteName;
            return self;
        };
        self.setUser = function(_user) {
            user = _user;
            return self;
        };
        self.setCompany = function(_company) {
            company = _company;
            return self;
        };
        self.setApiRoot = function(_apiRoot) {
            apiRoot = _apiRoot;
            return self;
        };
        self.$get = function() {
            return {
                apiRoot: apiRoot,
                user: user,
                company: company,
                siteName: siteName
            }
        };
        return self;
    });
