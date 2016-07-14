'use strict';

angular.module('jb-zconnect-widget-company').controller('DropCvCtrl', [
  'config',
  'employerService',
  'jbWidget',
  'ngZconnected',
  'currentUser',
  'registrationService',
  'resourceService',
  '$q',
  function (config, employerService, jbWidget, ngZconnected, currentUser, registrationService, resourceService, $q) {
    var vm = this;
    vm.config = config;
    vm.currentUser = currentUser;
    vm.company = jbWidget.company;
    var apiRoot = jbWidget.apiRoot;
    vm.dzAddedFile = function (file) {
      if (ngZconnected._DEBUG)
        console.log(file);
    };

    vm.dzError = function (file, error) {
      if (ngZconnected._DEBUG) {
        console.log(error);
        console.log(file);
      }
      var $file = angular.element(file.previewElement);
      $file.find('.dz-error-message').html(error.message);
    };


    vm.dzSuccess = function (file, resp, progress) {
      if (resp.success) {
        if (ngZconnected._DEBUG)
        var parsedCv = {};
        parsedCv = preprocessPersonalInfo(angular.fromJson(resp.data.personal), resp.uploadId, resp.path);
        parsedCv.skill = preProcessSkills(angular.fromJson(resp.data.addinfo));
        parsedCv.language = preProcessLanguage(angular.fromJson(resp.data.addinfo));
        parsedCv.education = preprocessEducationInfo(angular.fromJson(resp.data.education));
        parsedCv.experience = preprocessExperience(angular.fromJson(resp.data.workexperience));

        registrationService.parsedCvSignup(parsedCv)
          .then(function(response) {
              if (ngZconnected._DEBUG)
              console.log(response);
          }, function(error) {
              console.log(error);
        });

      } else {
        switch (resp.error) {
          case 4:
          {
            employerService.cv.saveToCompany(vm.currentUser.user_id, vm.company.id, resp.data.id)
              .then(function (resp) {
                if (ngZconnected._DEBUG)
                  console.log(resp);

              }, function (error) {
                if (ngZconnected._DEBUG)
                  console.log(error);
              });
            break;
          }
          default:

        }
      }
    };
    vm.dropzoneConfig = {
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
    };
    var preprocessPersonalInfo = function (pesonalInfoJson, uploadId, path) {
      var processedData = {};
      processedData.jsfirstname = pesonalInfoJson.firstname;
      processedData.jslastname = pesonalInfoJson.lastname;
      if (_.isArray(pesonalInfoJson.email)) {
        var email = pesonalInfoJson.email;
        processedData.jsemail=email[0];
      } else {
        processedData.jsemail=pesonalInfoJson.email;
      }
      if (typeof pesonalInfoJson.phoneNumber != 'undefined') {
        if (_.isArray(pesonalInfoJson.phoneNumber)) {
          processedData.jsmobile=pesonalInfoJson.phoneNumber[0].replace(/\D/g, '');
        } else {
          processedData.jsmobile=pesonalInfoJson.phoneNumber.replace(/\D/g, '');
        }
      }

      if (typeof pesonalInfoJson.address != 'undefined') {
        if (typeof pesonalInfoJson.address.country != 'undefined')
          processedData.country = pesonalInfoJson.address.country.name;
        if (typeof pesonalInfoJson.address.state != 'undefined')
          processedData.state = pesonalInfoJson.address.state;
        if (typeof pesonalInfoJson.address.city != 'undefined')
          processedData.city = pesonalInfoJson.address.city;
      }

      if (typeof pesonalInfoJson.nationality != 'undefined') {
        if (typeof pesonalInfoJson.nationality.name != 'undefined')
          processedData.nationality = pesonalInfoJson.nationality.name;
      }

      processedData.uploadId = uploadId;
      processedData.uploadPath = path;
      
      return processedData;
    }

    var preprocessExperience = function(experienceInfoJson) {
        var position = "";
        var company = "";
        var locationExp = "";
        var experience = [];
        var description = "";
        var expe = {};
        if (_.isArray(experienceInfoJson.phase)) {
            experienceInfoJson.phase.forEach(function (exp, key) {
                if (_.isString(exp.function)) {
                    position = exp.function;
                } else if (_.isArray(exp.function)) {
                    position = exp.function[0];
                } else {
                    position = exp.position.name;
                }
                if (_.isString(exp.company)) {
                    company = exp.company;
                } else if (_.isArray(exp.company)) {
                    if (typeof exp.company[1] == "object") {
                        company = exp.company[0];
                    } else {
                        company = exp.company[1];
                    }
                }
                if (_.isArray(exp.location)) {
                    if (typeof exp.location[1] == "object") {
                        locationExp = exp.location[1].country.name;
                    } else {
                        locationExp = exp.location[0].country.name;
                    }
                } else {
                    if (typeof exp.location !== 'undefined') {
                        locationExp = exp.location.country.name;
                    } else {
                        locationExp = "";
                    }
                }
                if (typeof exp.comments.length != 'undefined') {
                    description = exp.comments.replace(/[.]/g, ".\n");
                }

                expe = {
                    job_company: company,
                    job_title: position,
                    job_start: exp.dateFromFuzzy,
                    job_end: exp.dateToFuzzy,
                    job_detail: description,
                    job_location: locationExp,
                }

                experience.push(expe);

            });
        } else {
            if (typeof experienceInfoJson.phase != 'undefined') {
                if (_.isString(experienceInfoJson.phase.function)) {
                    position = experienceInfoJson.phase.function;
                } else if (_.isArray(experienceInfoJson.phase.function)) {
                    position = experienceInfoJson.phase.function[0];
                } else {
                    position = experienceInfoJson.phase.position.name;
                }

                if (_.isString(experienceInfoJson.phase.company)) {
                    company = experienceInfoJson.phase.company;
                } else if (_.isArray(experienceInfoJson.phase.company)) {
                    if (typeof experienceInfoJson.phase.company[1] == "object") {
                        company = experienceInfoJson.phase.company[0];
                    } else {
                        company = experienceInfoJson.phase.company[1];
                    }
                }

                if (_.isArray(experienceInfoJson.phase.location)) {
                    if (typeof experienceInfoJson.phase.location[1] == "object") {
                        locationExp = experienceInfoJson.phase.location[1].country.name;
                        locationVal = locationExp;
                    } else {
                        locationExp = experienceInfoJson.phase.location[0].country.name;
                        locationVal = locationExp;
                    }
                } else {
                    if (typeof experienceInfoJson.phase.location !== 'undefined') {
                        locationExp = experienceInfoJson.phase.location.country.name;
                        locationVal = locationExp;
                    } else {
                        locationExp = "";
                        locationVal = "";
                    }
                }

                if (typeof experienceInfoJson.phase.comments.length != 'undefined') {
                    description = experienceInfoJson.phase.comments.replace(/[.]/g, ".\n");
                }

                expe = {
                    job_company: company,
                    job_title: position,
                    job_start: wexp.phase.dateFromFuzzy,
                    job_end: wexp.phase.dateToFuzzy,
                    job_detail: description,
                    job_location: locationExp,
                }

                experience.push(expe);

            }
        }

        return JSON.stringify(experience);
    }

    var preprocessEducationInfo = function(educationInfoJson) {
        var tdate = "";
        var fdate = "";
        var education = [];
        var objectTemp = "";
         if (typeof educationInfoJson.phase.length == 'undefined') {
              if (typeof educationInfoJson.phase.dateFromFuzzy != 'undefined') {
                  var efphase = new Date(educationInfoJson.phase.dateFromFuzzy);
                  fdate = efphase.getFullYear();
              }
              if (typeof educationInfoJson.phase.dateToFuzzy != 'undefined') {
                  var etphase = new Date(educationInfoJson.phase.dateToFuzzy);
                  tdate = etphase.getFullYear();
              }

              objectTemp = {
                  school_name: educationInfoJson.phase.schoolname,
                  year_started: fdate,
                  year_ended: tdate,
                  industry: educationInfoJson.phase.graduation,
                  description: educationInfoJson.phase.comments
              }

              education.push(objectTemp);

          } else {
              educationInfoJson.phase.forEach(function (edu, key) {
              if (typeof edu.dateFromFuzzy != 'undefined') {
                  var efphase = new Date(edu.dateFromFuzzy);
                  fdate = efphase.getFullYear();
              }
              if (typeof edu.dateToFuzzy != 'undefined') {
                  var etphase = new Date(edu.dateToFuzzy);
                  tdate = etphase.getFullYear();
              }
              
              objectTemp = {
                  school_name: edu.schoolname,
                  year_started: fdate,
                  year_ended: tdate,
                  industry: edu.graduation,
                  description: edu.comments
              };
              education.push(objectTemp);
          });
        }

        return JSON.stringify(education);
    }

    var preProcessSkills = function(skillInfoJson){
        var i = 1;
        var skill = [];
        var ski = "";
        if (_.isArray(skillInfoJson.undatedSkill)) {
            skillInfoJson.undatedSkill.forEach(function (add, key) {
                ski = {
                  skill : add.name
                }
                skill.push(ski);
            });
        } else {
            if (skillInfoJson.undatedSkill != null) {
                skillInfoJson.undatedSkill.name
            } else {
                if (_.isArray(skillInfoJson.undatedOperationArea)) {
                    skillInfoJson.undatedOperationArea.forEach(function (add, key) {
                        ski = {
                          skill : add.name
                        }
                        skill.push(ski);
                    });
                } else {
                    if (skillInfoJson.undatedOperationArea != null) {
                        ski = {
                          skill : skillInfoJson.undatedOperationArea.name
                        }
                        skill.push(ski);
                    }
                }
            }
        }
        return JSON.stringify(skill);
    }

    var preProcessLanguage = function(langInfoJson){
      var language = [];
      var lang = "";
      if (_.isArray(langInfoJson.language)) {
          langInfoJson.language.forEach(function (lng, key) {
            if (typeof lng.name.length != 'undefined') {
                lang = {
                  language: lng.name
                }
                language.push(lang);
            }
          });
      } else {
        if (typeof langInfoJson.language != 'undefined') {
          lang = {
              language: langInfoJson.language.name
          }
          language.push(lang);
        }
      }
       return JSON.stringify(language);
    }

}]);
