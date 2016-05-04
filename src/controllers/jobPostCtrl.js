'use strict';

angular.module('jb-zconnect-widget-company').controller('JobPostCtrl', ['config', 'jbWidget', '$q', 'jobPostService', '$rootScope', 'resourceService',
    function JobPostCtrl(config, jbWidget, $q, jobPostService, $rootScope, resourceService) {
        var jobPost = this;
        jobPost.config = config;
        jobPost.loader = false;
        jobPost.jobImages = [];
        jobPost.siteName = jbWidget.siteName;
        jobPost.company = jbWidget.company;
        var urlTemplate = 'index.php?option=com_zconjobs&view=jobs&layout=details&company=<%= company %>&id=<%= uniqueId %>';
        var render = $rootScope._(urlTemplate).template();
        jobPost.expRange = $rootScope._(51).range();
        jobPost.expRange.shift();
        jobPost.currentUser = jbWidget.user;
        jobPost.newJobs = [];
        resourceService.currencyList.get().then(function(resp) {
            jobPost.currencies = resp;
        }, function(error) {
            if (jbWidget._DEBUG) {
                console.log(error);
            }

        });
        resourceService.industryList.get().then(function(resp) {
            jobPost.industries = resp;
        }, function(error) {
            if (jbWidget._DEBUG) {
                console.log(error);
            }
        });

        resourceService.countryList.get().then(function(resp) {
            jobPost.countries = resp;
        }, function(error) {
            if (jbWidget._DEBUG) {
                console.log(error);
            }
        });
        jobPost.uploadJobPhoto = function(file, job) {
            jobPostService.uploadPhoto(jobPost.currentUser.user_id, jbWidget.company.id, job.id, job.image)
                .then(function(resp) {
                    job.image = resp.data.data;
                }, function(error) {
                    if (jbWidget._DEBUG) {
                        console.log(error);
                    }
                });
        };
        jobPost.resizeOptions = function(file) {
            console.log(file);
        };
        jobPost.saveJobPosts = function(form) {
            if (form.$valid) {
                jobPost.loader = true;
                var promises = [];
                console.log(jobPost.newJobs);
                jobPost.newJobs.forEach(function(job) {
                    job.industry = jobPost.jobsLocation.industry.description;
                    job.country = jobPost.jobsLocation.country.nicename;
                    if (jobPost.jobsLocation.state) {
                        job.state = jobPost.jobsLocation.state.name || '';
                    }
                    if (jobPost.jobsLocation.city) {
                        job.city = jobPost.jobsLocation.city.name || '';
                    }
                    console.log(job);
                    promises.push(jobPostService.save(jobPost.currentUser.user_id, jbWidget.company.id, job));
                });
                $q.all(promises).then(function(resps) {
                    console.log(resps);
                    promises = [];
                    for (var x = 0; x < resps.length; x++) {
                        var job = jobPost.newJobs[x];
                        var resp = resps[x];
                        job.id = resp.data;
                        var file = jobPost.jobImages[x];
                        jobPost.uploadJobPhoto(file, job);
                    }
                    jobPost.newJobs = [];
                    jobPost.addPosition();
                    jobPost.loader = false;
                    jobPost.newJobs = [{}];
                    jobPost.msg = "Successfully posted job.";
                    jobPost.showMessage = true;
                    //                                location.reload();
                }, function(errors) {
                    if (jbWidget._DEBUG) {
                        console.log(errors);
                    }
                });

            } else {
                if (jbWidget._DEBUG) {
                    console.log(form.$error);
                }
            }
        };
        jobPost.getStates = function(country) {

            resourceService.stateList.get(country.id).then(function(resp) {
                jobPost.states = resp;
            }, function(error) {
                if (jbWidget._DEBUG) {
                    console.log(error);
                }
            });
        };

        jobPost.getCities = function(state) {

            resourceService.cityList.get(jobPost.jobsLocation.country.id, state.id).then(function(resp) {
                jobPost.cities = resp;
            }, function(error) {
                if (jbWidget._DEBUG) {
                    console.log(error);
                }
            });
        };
        jobPost.addPosition = function(form) {
            resourceService.uniqId.get().then(function(resp) {
                if (resp.$resolved) {

                    var uniqueId = resp.data;
                    var url = render({ company: jobPost.companyName, uniqueId: uniqueId });
                    var newPosition = {
                        id: uniqueId,
                        url: url,
                        fullUrl: 'http://' + jobPost.siteName + '/' + url,
                        image: "/components/com_media/img/job-default-logo.png"
                    };
                    if (form && form.$valid) {
                        jobPost.newJobs.push(newPosition);
                    } else {
                        jobPost.newJobs.push(newPosition);
                    }
                }
            }, function(error) {
                jobPost.msg = "Job posting failed. Please try again later.";
                jobPost.showMessage = true;
                jobPost.hasError = true;
                if (jbWidget._DEBUG) {
                    console.log(error);
                }
            });
        };
        jobPost.cancelJobPost = function() {
            jobPost.newJobs = [];
            jobPost.addPosition();
        };
        jobPost.closeMessage = function() {
            jobPost.showMessage = false;
            jobPost.hasError = false;
            jobPost.msg = "";
        }

    }
]);
