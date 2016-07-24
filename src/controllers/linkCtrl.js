angular
    .module('jb-zconnect-widget-company')
    .controller('LinkCtrl', ['config', function(config) {
        var vm = this;
        vm.test = 'Rafeeq';
        vm.config = config;
    }])
