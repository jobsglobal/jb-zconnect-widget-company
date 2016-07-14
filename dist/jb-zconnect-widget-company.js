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
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/job-post.html","<div style=\"height: {{jobPost.config.height}}px !important;float: left;overflow: auto;width:100%\"><form class=job_horizontal name=jobPostForm novalidate data-ng-submit=jobPost.saveJobPosts(jobPostForm)><div class=modal-body><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><ul class=job_post_modal_ul><li><p>Vacancy title</p><input type=text data-ng-model=jobPost.jobGroup.name name=groupName data-ng-required=true><div class=registration_error data-ng-show=\"jobPostForm.groupName.$error.required && (jobPostForm.groupName.$touched || jobPostForm.$submitted)\"><h6>Please specify vacancy title.</h6></div></li><li><ul class=job_post_inner_ul><li><p>Start date</p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><p class=input-group><input type=text class=form-control name=dateStart data-uib-datepicker-popup=MM/dd/yyyy data-ng-model=jobPost.jobGroup.date_start data-is-open=dateStart.opened data-datepicker-options=jobPost.dateStartOptions data-ng-required=true data-close-text=Close data-alt-input-formats=altInputFormats> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"dateStart.opened = true\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p><div class=registration_error data-ng-show=\"jobPostForm.dateStart.$error.required && (jobPostForm.dateStart.$touched || jobPostForm.$submitted)\"><h6>Please specify vacancies starting date.</h6></div></div></div></li><li><p>End date</p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><p class=input-group><input type=text class=form-control name=dateEnd data-uib-datepicker-popup=MM/dd/yyyy data-ng-model=jobPost.jobGroup.date_end data-is-open=dateEnd.opened data-datepicker-options=jobPost.dateEndOptions data-ng-required=true data-close-text=Close data-min-date=jobPost.jobGroup.start_date data-alt-input-formats=altInputFormats> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"dateEnd.opened = true\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p><div class=registration_error data-ng-show=\"jobPostForm.dateEnd.$error.required && (jobPostForm.dateEnd.$touched || jobPostForm.$submitted)\"><h6>Please specify vacancies ending date.</h6></div></div></div></li></ul></li><li style=width:100%><p>Description</p><textarea name=jobGroupDescription data-ng-model=jobPost.jobGroup.description></textarea></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><h4 class=company_job_edit_head><i class=\"fa fa-globe\" aria-hidden=true></i>Location</h4></div></div><ul class=job_post_modal_ul><li><p>Industry<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=industry data-ng-options=\"industry.description as industry.description for industry in jobPost.industries\" data-ng-model=jobPost.jobGroup.industry data-ng-required=true><option disabled selected>Select Industry</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.industry.$error.required && (jobPostForm.industry.$touched || jobPostForm.$submitted)\"><h6>Please specify industry</h6></div></div></div></li><li><p>Country<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=country data-ng-model=jobPost.jobGroup.country data-ng-options=\"country as country.nicename for country in jobPost.countries\" data-ng-change=jobPost.getStates(jobPost.jobGroup.country) data-ng-required=true><option disabled selected>Select Country</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.country.$error.required && (jobPostForm.country.$touched || jobPostForm.$submitted)\"><h6>Please specify country</h6></div></div></div></li><li class=state data-ng-show=\"jobPost.jobGroup.country && jobPost.states.length > 0\"><p>State<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=state class=default_input_select data-ng-model=jobPost.jobGroup.state data-ng-change=jobPost.getCities(jobPost.jobGroup.state) data-ng-required=\"jobPost.states && jobPost.states.length\" data-ng-options=\"state as state.name for state in jobPost.states\"><option disabled selected>Select State</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.state.$error.required && (jobPostForm.state.$touched || jobPostForm.$submitted)\"><h6>Please specify state</h6></div></div></div></li><li class=cityDv data-ng-show=\"jobPost.jobGroup.state && jobPost.cities.length > 0\"><p>City</p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=city class=default_input_select data-ng-model=jobPost.jobGroup.city data-ng-required=\"jobPost.cities && jobPost.cities.length\" data-ng-options=\"city as city.name for city in jobPost.cities\"><option disabled selected>Select City</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.city.$error.required && (jobPostForm.city.$touched || jobPostForm.$submitted)\"><h6>Please specify city</h6></div></div></div></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><h4 class=company_job_edit_head><i class=\"fa fa-suitcase\" aria-hidden=true></i>Work Information</h4></div></div><ul class=\"job_post_modal_ul addPosition\" data-ng-repeat=\"job in jobPost.newJobs\"><li><p>Position<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><input id=title name=title{{$index}} type=text class=title data-ng-model=job.job_title data-ng-required=true data-ng-maxlength=125 maxlength=125><div class=registration_error data-ng-show=\"jobPostForm.title{{$index}}.$error.required && (jobPostForm.title{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify position</h6></div></div></div></li><li><p>Experience<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=experience{{$index}} class=yearsofexp data-ng-model=job.experience data-ng-options=\"i as i for i in jobPost.expYears\" data-ng-required=true><option disabled selected>Select Experience</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.experience{{$index}}.$error.required && (jobPostForm.experience{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify experience</h6></div></div></div></li><li><p>Currency<span class=require_star data-ng-show=\"(job.salary > 0)\">*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=currency{{$index}} data-ng-model=job.currency data-ng-required=\"(job.salary > 0)\" data-ng-options=\"currency.currency_code as currency.currency_code for currency in jobPost.currencies\"><option disabled selected>Select currency</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.currency{{$index}}.$error.required && (jobPostForm.currency{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify currency</h6></div></div></div></li><li><p>Salary</p><input name=salary{{$index}} type=number value=0 class=salary data-ng-model=job.salary></li><li><p>Upload Photo</p><img data-ngf-thumbnail=job.image class=job_post_img><div class=job_post_upload_photo data-ng-model=job.image data-name=image{{$index}} data-ngf-pattern=\"\'image/*\'\" data-ngf-accept=\"\'image/*\'\" data-ngf-max-size=5MB data-ngf-min-height=100 data-ngf-min-width=100 data-ngf-max-height=2160 data-ngf-max-width=2160 data-ngf-fix-orientation=true data-ngf-resize=jobPost.resizeOptions($file) data-ngf-resize-if=\"$width > 1024 || $height > 1024\" data-ngf-select><button type=button class=job_post_photo_browse>Select job Photo</button></div></li><li><p>Job Details<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><textarea class=details name=details{{$index}} data-ng-model=job.job_description maxlength=5000 data-ng-required=true></textarea><div class=registration_error data-ng-show=\"jobPostForm.details{{$index}}.$error.required && (jobPostForm.details{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify details</h6></div></div></div></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><a class=add_btn_edit data-ng-click=jobPost.addPosition(jobPostForm)><i class=\"fa fa-plus-circle\"></i>Add Position</a></div></div></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><ul class=\"apply_modal_buttonset button_set_margin\"><li><button type=submit><i class=\"fa fa-envelope\" aria-hidden=true></i>Post</button></li></ul></div></div><zloader data-ng-show=jobPost.loader></zloader></div></form></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/timeline.html","<div style=\"height: {{timeline.config.height}}px !important\"><timeline><timeline-event ng-repeat=\"event in timeline.events\"><timeline-badge class=actor-avatar><img class=img-responsive data-ng-src={{event.actor.avatar}} alt={{event.actor.first_name}}></timeline-badge><timeline-panel class={{event.badgeClass}}><timeline-heading data-ng-switch data-on=event.app><span class=pull-right am-time-ago=\"event.created | amUtc\"></span> <span class=title-header data-ng-switch-when=groups.wall>{{(event.actor.user_id==timeline.currentUser.user_id) ? \"You\" : event.actor.first_name}} posted a status.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.jobpost>{{event.actor.first_name}} posted a job.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.join><ng-pluralize count=event.actors.length when=\"{ \'0\': \'\', \'1\': \'{{event.actors[0].first_name}} has joined the company.\', \'2\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} have joined the company.\', \'one\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and one other have joined the company.\', \'other\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and {} other have joined the company.\' }\" offset=2></ng-pluralize></span> <span class=title-header data-ng-switch-when=videos>{{event.actor.first_name}} posted a video.<br><h5><a data-ng-href={{event.params.video_url}}>Link</a> to video.</h5></span> <span class=title-header data-ng-switch-when=photos>{{event.actor.first_name}} posted a photo.<br><h5><a data-ng-href={{event.params.photo_url}}>Link</a> to photo.</h5></span> <span class=title-header data-ng-switch-when=events>{{event.actor.first_name}} posted an event.<br><h5><a data-ng-href={{event.params.event_url}}>Link</a> to event.</h5></span></timeline-heading><p data-ng-bind-html=event.content></p></timeline-panel></timeline-event></timeline></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html","<div><ol class=dashbord_top_jobs><li><ul class=dashbord_top_jobs_ul-1><li class=\"col-lg-8 col-sm-8 col-xs-8\"><h4>Position</h4></li><li class=\"col-lg-4 col-sm-4 col-xs-4\"><h4>Applicants</h4></li></ul></li><li style=\"height: {{topJobs.config.height}}px !important;overflow: auto\"><ul class=dashbord_top_jobs_ul-2 data-ng-repeat=\"job in topJobs.data\"><li class=\"col-lg-8 col-sm-8 col-xs-8\"><p data-ng-bind=job.job_title></p></li><li class=\"col-lg-4 col-sm-4 col-xs-4\"><p class=text-center data-ng-bind=job.total></p></li></ul></li></ol></div>");}]);


angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', 'currentUser', function(config, jobService, jbWidget, ngZconnected, currentUser) {
    var topJobs = this;
    topJobs.data = [];
    topJobs.config = config;
    jobService.getMostApplied(currentUser.user_id, jbWidget.company.id, jbWidget.limit).then(function(resp) {
        if (ngZconnected._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
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



angular.module('jb-zconnect-widget-company')
    .controller('JobPostCtrl', ['resourceService', 'userService', 'jobService', '$q', 'ngZconnected', 'jbWidget', 'companyService', 'employerService',
      function JobPostCtrl(resourceService, userService, jobService, $q, ngZconnected, jbWidget, companyService, employerService) {
        var vm = this;
        var defaultImage = "/components/com_media/img/job-default-img.png";
        vm.loader = true;
        vm.jobImages = [];
        vm.baseUrl = ngZconnected.baseUrl;
        vm.companyId = jbWidget.company.id;
        vm.newJobs = [];
        vm.expYears = _.range(0, 51);
        vm.jobGroup = {
          start_date: new Date()
        };
        vm.dateStartOptions = {
          maxDate: new Date(2020, 5, 22),
          minDate: new Date()
        };

        vm.dateEndOptions = {
          maxDate: new Date(2020, 5, 22),
        };
        $q.when(userService.getCurrentUser()).then(function (currentUser) {
          if (ngZconnected._DEBUG)
            console.log(currentUser);
          vm.currentUser = currentUser;
          return companyService.company.get(vm.currentUser.user_id, vm.companyId);
        }).then(function (company) {
          if (ngZconnected._DEBUG)
            console.log(company);
          vm.company = company;
          vm.addPosition();
          vm.loader = false;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error)
          }
        });
        resourceService.currencyList.get().then(function (resp) {
          vm.currencies = resp;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error);
          }

        });
        resourceService.industryList.get().then(function (resp) {
          vm.industries = resp;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error);
          }
        });
        resourceService.countryList.get().then(function (resp) {
          vm.countries = resp;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error);
          }
        });
        vm.uploadJobPhoto = function (file, job) {
          var deferred = $q.defer();
          jobService.uploadPhoto(vm.currentUser.user_id, vm.companyId, job.id, job.image)
            .then(function (resp) {
              job.image = resp.data.data;
              deferred.resolve(resp);
            }, function (error) {
              if (ngZconnected._DEBUG) {
                console.log(error);
              }
              deferred.reject(error);
            });
          return deferred.promise;
        };
        vm.resizeOptions = function (file) {
          console.log(file);
        };
        vm.saveJobPosts = function (form) {
          if (form.$valid) {
            vm.loader = true;
            $q.when(employerService.jobGroup.save(vm.currentUser.user_id, vm.companyId, vm.jobGroup))
              .then(function (resp) {
                vm.jobGroup.id = resp.data;
                var promises = [];
                console.log(vm.newJobs);
                vm.newJobs.forEach(function (job) {
                  job.job_group_id = vm.jobGroup.id;
                  promises.push(jobService.save(vm.currentUser.user_id, vm.companyId, job));
                });
                $q.all(promises).then(function (resps) {
                    console.log(resps);
                    var proms = [];
                    for (var x = 0; x < resps.length; x++) {
                      var job = vm.newJobs[x];
                      var resp = resps[x];
                      job.id = resp.data;
                      var file = job.image;
                      if (file)
                        proms.push(vm.uploadJobPhoto(file, job));
                    }
                    return $q.all(proms);
                  })
                  .then(function (resp) {
                    if (ngZconnected._DEBUG)
                      console.log(resp);
                    ngZconnected.helpers.showSystemMessage('Succesfully posted job/s.', 'message');
                    vm.newJobs = [];
                    vm.addPosition();
                    vm.loader = false;
                    angular.element('#jobPostModal').modal('hide');
                    location.reload();

                  }, function (errors) {
                    if (ngZconnected._DEBUG) {
                      console.log(errors);
                    }
                  });
              });


          } else {
            if (ngZconnected._DEBUG) {
              console.log(form.$error);
            }
          }
        };
        vm.getStates = function (country) {

          resourceService.stateList.get(country.id).then(function (resp) {
            vm.states = resp;
          }, function (error) {
            if (ngZconnected._DEBUG) {
              console.log(error);
            }
          });
        };
        vm.getCities = function (state) {

          resourceService.cityList.get(vm.jobGroup.country.id, state.id).then(function (resp) {
            vm.cities = resp;
          }, function (error) {
            if (ngZconnected._DEBUG) {
              console.log(error);
            }
          });
        };
        vm.addPosition = function (form) {
          var newPosition = {};
          if (form && form.$valid) {
            vm.newJobs.push(newPosition);
          } else {
            vm.newJobs.push(newPosition);
          }
        };
        vm.cancelJobPost = function () {
          vm.newJobs = [];
          vm.addPosition();
        };
        vm.dateStartChanged = function () {
          vm.dateEndOptions.minDate = vm.jobGroup.start_date;
        };
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