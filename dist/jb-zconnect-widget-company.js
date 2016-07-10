(function(window, undefined) {'use strict';


angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3', 'ngDropzone', 'slick', 'ngSanitize', 'angular-timeline', 'angularMoment', 'ngAnimate', 'ngFileUpload', 'ngResource', 'angular-underscore', 'ngZconnected'])
  .config(["dashboardProvider", function (dashboardProvider) {
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
        currentUser: ['userService', function( userService){
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
    // .widget('job-post-form', angular.extend(widget, {
    //     title: 'Joomla Module',
    //     description: 'Widget that shows a module from specific list of modules.',
    //     templateUrl: widgetTemplatesPath + 'joomla-module.html',
    //     controller: 'JoomlaModuleCtrl',
    //     controllerAs: 'joomlaModule',
    //     edit: {
    //         controller: "JoomlaModuleEditCtrl",
    //         controllerAs: "joomlaModuleEdit",
    //         templateUrl: widgetTemplatesPath + "joomla-module-edit.html",
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
  }]).provider('jbWidget', function () {
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


angular.module("jb-zconnect-widget-company").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/ads.html","<div style=\"height: {{ads.config.height}}px !important\"><slick slides-to-show=1 data=ads.list slides-to-scroll=1 autoplay=false autoplayspeed=2 arrows=true centermode=true dots=true init-onload=true><div data-ng-repeat=\"ad in ads.list\" class=\"text-center container\"><a data-ng-href={{ad.link}}><img class=img-responsive data-ng-src={{ad.image}} alt={{ad.title}}> <span class=ad-message>{{ad.message}}</span></a></div></slick></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/applicant-stats.html","<div style=\"height: {{applicantStats.config.height}}px !important;overflow: auto\"><nvd3 options=applicantStats.options data=applicantStats.data></nvd3></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/drop-cv.html","<div><form class=dropzone method=post enctype=multipart/form-data ng-dropzone dropzone=dropCv.dropzone dropzone-config=dropCv.dropzoneConfig event-handlers=\"{ \'addedfile\': dropCv.dzAddedFile, \'error\': dropCv.dzError }\" style=\"min-height: {{dropCv.config.height}}px\"><div class=dz-message>Drop CV here or click to upload</div></form></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html","<div style=\"height: {{generalStats.config.height}}px !important;overflow: auto\"><nvd3 options=generalStats.options data=generalStats.data></nvd3></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/job-post.html","<div style=\"height: {{jobPost.config.height}}px !important;float: left;overflow: auto;width:100%\"><div data-ng-bind-html=\"jobPost.moduleHtml | html\"></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module-edit.html","<form role=form name=joomlaModuleEditForm><div class=form-group><label for=module>Joomla Module</label><select name=module data-ng-model=config.module data-ng-options=\"module as module for module in joomlaModuleEdit.modules\"><option disabled selected data-ng-required=true>Select Module</option></select></div></form>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module.html","<div><div class=\"alert alert-info\" ng-if=!config.module>Please select a module in the widget configuration</div><div class=joomla-module data-ng-bind-html=joomlaModule.renderedHtml data-ng-if=config.module></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/timeline.html","<div style=\"height: {{timeline.config.height}}px !important\"><timeline><timeline-event ng-repeat=\"event in timeline.events\"><timeline-badge class=actor-avatar><img class=img-responsive data-ng-src={{event.actor.avatar}} alt={{event.actor.first_name}}></timeline-badge><timeline-panel class={{event.badgeClass}}><timeline-heading data-ng-switch data-on=event.app><span class=pull-right am-time-ago=\"event.created | amUtc\"></span> <span class=title-header data-ng-switch-when=groups.wall>{{(event.actor.user_id==timeline.currentUser.user_id) ? \"You\" : event.actor.first_name}} posted a status.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.jobpost>{{event.actor.first_name}} posted a job.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.join><ng-pluralize count=event.actors.length when=\"{ \'0\': \'\', \'1\': \'{{event.actors[0].first_name}} has joined the company.\', \'2\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} have joined the company.\', \'one\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and one other have joined the company.\', \'other\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and {} other have joined the company.\' }\" offset=2></ng-pluralize></span> <span class=title-header data-ng-switch-when=videos>{{event.actor.first_name}} posted a video.<br><h5><a data-ng-href={{event.params.video_url}}>Link</a> to video.</h5></span> <span class=title-header data-ng-switch-when=photos>{{event.actor.first_name}} posted a photo.<br><h5><a data-ng-href={{event.params.photo_url}}>Link</a> to photo.</h5></span> <span class=title-header data-ng-switch-when=events>{{event.actor.first_name}} posted an event.<br><h5><a data-ng-href={{event.params.event_url}}>Link</a> to event.</h5></span></timeline-heading><p data-ng-bind-html=event.content></p></timeline-panel></timeline-event></timeline></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html","<div style=\"height: {{topJobs.config.height}}px !important;overflow: auto\"><table class=\"table table-striped table-responsive\"><tr><th>Position</th><th class=text-center>Applicants</th></tr><tr data-ng-repeat=\"job in topJobs.data\"><td data-ng-bind=job.job_title></td><td class=text-center data-ng-bind=job.total></td></tr></table></div>");}]);


angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', 'currentUser', function (config, jobService, jbWidget, ngZconnected, currentUser) {
  var topJobs = this;
  topJobs.data = [];
  topJobs.config = config;
  jobService.getMostApplied(currentUser.user_id, jbWidget.company.id, jbWidget.limit).then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    topJobs.data = resp.data;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  })
}]);



angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', ['config', 'companyService', 'jbWidget', 'ngZconnected', function (config, companyService, jbWidget, ngZconnected) {
  var timeline = this;
  timeline.config = config;
  timeline.currentUser = jbWidget.user;

  timeline.animateElementIn = function ($el) {
    $el.removeClass('hidden');
    $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
  };

  timeline.animateElementOut = function ($el) {
    $el.addClass('hidden');
    $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
  };
  companyService.company.getTimelineHtml(jbWidget.user.user_id, jbWidget.company.id).then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    timeline.events = resp.data;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  })
}]);



angular.module('jb-zconnect-widget-company').controller('JoomlaModuleCtrl', ['config', 'resourceService', 'ngZconnected', function (config, resourceService, ngZconnected) {
  var joomlaModule = this;
  if (config.module) {
    resourceService.modules.getByName(config.module).then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      joomlaModule.renderedHtml = resp;
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    });
  }
}]).controller('JoomlaModuleEditCtrl', ['joomlaModuleList', function (joomlaModuleList) {
  console.log(joomlaModuleList);
  var joomlaModuleEdit = this;
  joomlaModuleEdit.modules = joomlaModuleList;
}]);



angular.module('jb-zconnect-widget-company').controller('JobPostCtrl', ['resourceService', 'ngZconnected', '$sce',
  function (resourceService, ngZconnected, $sce) {
    var jobPost = this;
    jobPost.moduleHtml= '';
    resourceService.modules.getByName('mod_job_post').then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      jobPost.moduleHtml= resp;
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    });
  }
]);



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



angular.module('jb-zconnect-widget-company').controller('DropCvCtrl', ['config', 'employerService', 'jbWidget', function (config, employerService, jbWidget) {
  var dropCv = this;
  dropCv.config = config;
  var apiRoot = jbWidget.apiRoot;
  dropCv.dzAddedFile = function (file) {
    if (jbWidget._DEBUG)
      console.log(file);
  };

  dropCv.dzError = function (file, error) {
    if (jbWidget._DEBUG) {
      console.log(error);
      console.log(file);
    }
    var $file = angular.element(file.previewElement);
    $file.find('.dz-error-message').html(error.message);
  };


  dropCv.dzSuccess = function () {
    console.log(argument);
  };
  dropCv.dropzoneConfig = {
    init: function () {
      console.log('init');
    },
    parallelUploads: 1,
    maxFileSize: 5,
    url: apiRoot + '/signup/upload/cv',
    method: 'post',
    filesizeBase: 1024,
    paramName: 'fileToUpload',
    uploadMultiple: false,
    addRemoveLinks: true,
    clickable: true,
    createImageThumbnails: true,
    maxThumbnailFilesize: .5,
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    dictDefaultMessage: null,
    dictFallbackMessage: null,
    dictFallbackText: null,
    dictInvalidFileType: null,
    dictFileTooBig: null,
    dictResponseError: null,
    dictCancelUpload: "Cancel",
    dictCancelUploadConfirmation: "Are you sure you want to cancel upload?",
    dictRemoveFile: "Remove",
    dictMaxFilesExceeded: null,
    acceptedFiles: "application/pdf,application/msword,"
  };

  var init = function (argument) {
    /* body... */
  }
}]);



angular.module('jb-zconnect-widget-company').controller('ApplicantStatsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', 'currentUser', function (config, jobService, jbWidget, ngZconnected, currentUser) {
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
  };
  applicantStats.data = [];
  jobService.applicants.getStats(currentUser.user_id, jbWidget.company.id).then(function (resp) {
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



angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'resourceService', 'ngZconnected', function (config, resourceService, ngZconnected) {
  var ads = this;
  ads.config = config;
  resourceService.adList().then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    ads.list = resp;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  });
}]);
})(window);