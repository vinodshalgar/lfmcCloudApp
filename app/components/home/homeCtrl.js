/**
 * home Controller
 * @namespace Login
 * @desc contains logic for login controller
 */
(function () {
    'use strict'
    var injectParams = ['$location', '$routeParams', '$rootScope', 'authService'];

    var HomeCtrl = function ($location, $routeParams, $rootScope, authService) {
        var vm = this,
            path = '/';
        vm.menuLeft = null;
        vm.menuRight = null;

        function init() {
            vm.menuLeft = [
                {
                    "Item": "Forms",
                    "Value": "#/category"
                },
                {
                    "Item": "Updates",
                    "Value": "/updates"
                },
                {
                    "Item": "Search",
                    "Value": "/search"
                }
            ];
            vm.menuRight = [
                {
                    "Item": "Logout",
                    "Value": "#/login"
                }
            ];
            $rootScope.menuLeft = vm.menuLeft;
            $rootScope.menuRight = vm.menuRight;

        }
        init();


    };

    HomeCtrl.$inject = injectParams;

    angular.module('lfmcApp')
        .controller('HomeCtrl', HomeCtrl);

} ());