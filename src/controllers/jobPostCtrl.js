'use strict';

angular.module('jb-zconnect-widget-company')
    .controller('JobPostCtrl', ['resourceService', 'currentUser', 'jobService', '$q', 'ngZconnected', 'jbWidget', 'companyService', 'employerService',
      function JobPostCtrl(resourceService, currentUser, jobService, $q, ngZconnected, jbWidget, companyService, employerService) {
        var vm = this;
        var defaultImage = "/components/com_media/img/job-default-img.png";
        vm.loader = true;
        vm.jobImages = [];
        vm.baseUrl = ngZconnected.baseUrl;
        vm.companyId = jbWidget.company.id;
        vm.newJobs = [];
        vm.expYears = _.range(0, 51);
        vm.currentUser = currentUser;
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
        $q.when(companyService.company.get(vm.currentUser.user_id, vm.companyId))
          .then(function (company) {
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
