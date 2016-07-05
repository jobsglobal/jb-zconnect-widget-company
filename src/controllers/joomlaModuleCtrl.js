'use strict';

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
