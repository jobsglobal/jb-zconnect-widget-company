angular
    .module('jb-zconnect-widget-company')
    .controller('CompanyMapCtrl', ['config', 'jbWidget', function(config, jbWidget) {
        var vm = this;
        vm.test = 'Rafeeq';
        vm.config = config;
        vm.company = jbWidget.company;
    }])
