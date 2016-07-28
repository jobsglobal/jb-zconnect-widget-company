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
        'ui.bootstrap',
        'ngMap'
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
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('top-jobs', angular.extend(widget, {
                title: 'Company Top Jobs',
                description: 'Widget for showing most applied jobs from company.',
                templateUrl: widgetTemplatesPath + 'top-jobs.html',
                controller: 'TopJobsCtrl',
                controllerAs: 'topJobs',
                styleClass: 'top-jobs',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('drop-cv', angular.extend(widget, {
                title: 'Company CV Dropzone',
                description: 'Widget that provides a dropzone area for uploading applicants cv.',
                templateUrl: widgetTemplatesPath + 'drop-cv.html',
                controller: 'DropCvCtrl',
                controllerAs: 'dropCv',
                styleClass: 'drop-cv',
                reload: false,
                config: angular.extend(angular.copy(widgetConfig), {})

            }))
            .widget('ads', angular.extend(widget, {
                title: 'Advertisements',
                description: 'Widget that shows advertisements.',
                templateUrl: widgetTemplatesPath + 'ads.html',
                controller: 'AdsCtrl',
                controllerAs: 'ads',
                styleClass: 'ads',
                config: angular.extend(angular.copy(widgetConfig), {})

            }))
            .widget('timeline', angular.extend(widget, {
                title: 'Timeline',
                description: 'Widget that shows company timeline/activities.',
                templateUrl: widgetTemplatesPath + 'timeline.html',
                controller: 'TimelineCtrl',
                controllerAs: 'timeline',
                styleClass: 'timeline',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('job-post-form', angular.extend(widget, {
                title: 'Job Post',
                description: 'Widget that shows a form for job posting.',
                templateUrl: widgetTemplatesPath + 'job-post.html',
                controller: 'JobPostCtrl',
                controllerAs: 'jobPost',
                styleClass: 'job-post-form',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('applicant-stats', angular.extend(widget, {
                title: 'Applicant Stats',
                description: 'Widget that shows visual statistics for total applicants of company.',
                templateUrl: widgetTemplatesPath + 'applicant-stats.html',
                controller: 'ApplicantStatsCtrl',
                controllerAs: 'applicantStats',
                styleClass: 'applicant-stats',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('notifications', angular.extend(widget, {
                title: 'Notifications',
                description: 'Widget that shows notifications of the company.',
                templateUrl: widgetTemplatesPath + 'notifications.html',
                controller: 'NotificationsCtrl',
                controllerAs: 'notifications',
                styleClass: 'notifications',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('messages', angular.extend(widget, {
                title: 'Messages',
                description: 'Widget that shows messages of the company.',
                templateUrl: widgetTemplatesPath + 'messages.html',
                controller: 'NotificationsCtrl',
                controllerAs: 'notifications',
                styleClass: 'notifications',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('followers', angular.extend(widget, {
                title: 'Recent Followers',
                description: 'Widget that shows followers of the company.',
                templateUrl: widgetTemplatesPath + 'followers.html',
                controller: 'FollowersCtrl',
                controllerAs: 'followers',
                styleClass: 'followers',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('status', angular.extend(widget, {
                title: 'Status',
                description: 'Widget that shows status of the company.',
                templateUrl: widgetTemplatesPath + 'status.html',
                controller: 'StatusCtrl',
                controllerAs: 'status',
                styleClass: 'status',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('insights', angular.extend(widget, {
                title: 'Insights',
                description: 'Widget that shows insights of the company.',
                templateUrl: widgetTemplatesPath + 'insights.html',
                controller: 'InsightsCtrl',
                controllerAs: 'insights',
                styleClass: 'insights',
                config: angular.extend(angular.copy(widgetConfig), {
                    linkSref: "",
                    linkText: "See all insights"
                })
            }))
            .widget('link', angular.extend(widget, {
                title: 'Link',
                description: 'Widget that shows link of the company.',
                templateUrl: widgetTemplatesPath + 'link.html',
                controller: 'LinkCtrl',
                controllerAs: 'link',
                styleClass: 'link',
                frameless: true,
                config: angular.extend(angular.copy(widgetConfig), {
                    imageType: "image", //or icon
                    sref: "/",
                    imageSource: "", //for icon use glyph or fa classess
                    text: "Home",


                })
            }))
            .widget('company-map', angular.extend(widget, {
                title: 'Company Map',
                description: 'Widget that shows a location of the company in a map.',
                templateUrl: widgetTemplatesPath + 'company-map.html',
                controller: 'CompanyMapCtrl',
                controllerAs: 'map',
                styleClass: 'company-map',
                frameless: true,
                config: angular.extend(angular.copy(widgetConfig), {
                    apiKey: '',
                    longhitude: '',
                    latitude: '',
                    zoom: ''
                })
            }))
            .widget('company-details', angular.extend(widget, {
                title: 'Company Details',
                description: 'Widget that shows the company in a details.',
                templateUrl: widgetTemplatesPath + 'company-details.html',
                controller: 'CompanyDetailsCtrl',
                controllerAs: 'details',
                styleClass: 'company-details',
                frameless: true,
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('email', angular.extend(widget, {
                title: 'Email',
                description: 'Widget that shows the list.',
                templateUrl: widgetTemplatesPath + 'email.html',
                styleClass: 'email',
                frameless: true,
                config: angular.extend(angular.copy(widgetConfig), {})
            }));
    })
    .provider('jbWidget', function() {
        var self = this;
        var apiRoot = '//jobsglobal.dev/api/v1';
        var company = {};
        var siteName = 'jobsglobal.dev';
        self.setSiteName = function(_siteName) {
            siteName = _siteName;
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
                company: company,
                siteName: siteName
            }
        };
        return self;
    });
