'use strict';

angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3', 'ngDropzone', 'slick', 'ngSanitize', 'angular-timeline', 'angularMoment', 'ngAnimate', 'ngFileUpload', 'ngResource', 'angular-underscore', 'ngZconnected'])
  .config(function (dashboardProvider) {
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
      resolve: {
        currentUser: ['userService', function( userService){
          return userService.getCurrentUser();
        }]
      }
    };
    dashboardProvider
      .widget('general-stats', angular.extend(widget, {
        title: 'Company General Stats',
        description: 'Widget for showing general information for company.',
        templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html',
        controller: 'GeneralStatsCtrl',
        controllerAs: 'generalStats',
        styleClass: 'general-stats',
        config: angular.extend(widgetConfig, {})
      }))
      .widget('top-jobs', angular.extend(widget, {
        title: 'Company Top Jobs',
        description: 'Widget for showing most applied jobs from company.',
        templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html',
        controller: 'TopJobsCtrl',
        controllerAs: 'topJobs',
        styleClass: 'top-jobs',
        config: angular.extend(widgetConfig, {})

      }))
      .widget('drop-cv', angular.extend(widget, {
        title: 'Company CV Dropzone',
        description: 'Widget that provides a dropzone area for uploading applicants cv.',
        templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/drop-cv.html',
        controller: 'DropCvCtrl',
        controllerAs: 'dropCv',
        styleClass: 'drop-cv',
        reload: false,
        config: angular.extend(widgetConfig, {})

      }))
      .widget('ads', angular.extend(widget, {
        title: 'Advertisements',
        description: 'Widget that shows advertisements.',
        templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/ads.html',
        controller: 'AdsCtrl',
        controllerAs: 'ads',
        styleClass: 'ads',
        config: angular.extend(widgetConfig, {})

      }))
      .widget('timeline', angular.extend(widget, {
        title: 'Timeline',
        description: 'Widget that shows company timeline/activities.',
        templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/timeline.html',
        controller: 'TimelineCtrl',
        controllerAs: 'timeline',
        styleClass: 'timeline',
        config: angular.extend(widgetConfig, {})
      }))
      .widget('job-post-form', angular.extend(widget, {
        title: 'Job Post',
        description: 'Widget that shows a form for job posting.',
        templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/job-post.html',
        controller: 'JobPostCtrl',
        controllerAs: 'jobPost',
        styleClass: 'job-post-form',
        config: angular.extend(widgetConfig, {})
      }))
      .widget('applicant-stats', angular.extend(widget, {
        title: 'Applicant Stats',
        description: 'Widget that shows visual statistics for total applicants of company.',
        templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/applicant-stats.html',
        controller: 'ApplicantStatsCtrl',
        controllerAs: 'applicantStats',
        styleClass: 'applicant-stats',
        config: angular.extend(widgetConfig, {})
      }));
    // .widget('job-post-form', angular.extend(widget, {
    //     title: 'Joomla Module',
    //     description: 'Widget that shows a module from specific list of modules.',
    //     templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module.html',
    //     controller: 'JoomlaModuleCtrl',
    //     controllerAs: 'joomlaModule',
    //     edit: {
    //         controller: "JoomlaModuleEditCtrl",
    //         controllerAs: "joomlaModuleEdit",
    //         templateUrl: "{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module-edit.html",
    //         resolve: {

    //             "joomlaModuleList": ['joomlaModuleService', function(joomlaModuleService) {
    //                 return joomlaModuleService.getModules();
    //             }]
    //         },
    //         reload: true,
    //         immediate: true
    //     },
    //     resolve: {},
    //     config: angular.extend(widgetConfig, {})
    // }));
  }).provider('jbWidget', function () {
  var self = this;
  var apiRoot = '//jobsglobal.dev/api/v1';
  var user = {};
  var company = {};
  var siteName = 'jobsglobal.dev';
  self.setSiteName = function (_siteName) {
    siteName = _siteName;
    return self;
  };
  self.setUser = function (_user) {
    user = _user;
    return self;
  };
  self.setCompany = function (_company) {
    company = _company;
    return self;
  };
  self.setApiRoot = function (_apiRoot) {
    apiRoot = _apiRoot;
    return self;
  };
  self.$get = function () {
    return {
      apiRoot: apiRoot,
      user: user,
      company: company,
      siteName: siteName
    }
  };
  return self;
});

