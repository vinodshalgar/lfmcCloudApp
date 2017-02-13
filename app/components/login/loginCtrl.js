/**
 * Login Controller
 * @namespace Login
 * @desc contains logic for login controller
 */
(function () {
    'use strict'
    var injectParams = ['$location', '$routeParams', '$rootScope', 'authService'];

    var LoginCtrl = function ($location, $routeParams, $rootScope, authService) {
        var vm = this,
            path = '/';

        vm.email = null;
        vm.password = null;
        vm.errorMessage = null;
        vm.menuLeft = null;
        vm.menuRight = null;

        //init functions
        function init() {
            vm.menuLeft = [];
            vm.menuRight = [
                        {
                            "Item": "Register",
                            "Value": "/register"
                        }
                    ];
            $rootScope.menuLeft = vm.menuLeft;
            $rootScope.menuRight = vm.menuRight;

        }

        init();


        /**
        * @name login
        * @desc check for valid user
        * @param {String} vm.email User Id as email
        * @param {String} vm.password user password
        * @returns 
        * @memberOf 
        */
        vm.login = function () {
            authService.login(vm.email, vm.password)
                .then(function (status) {
                    //$routeParams.redirect will have the route
                    //they were trying to go to initially
                    if (!status) {
                        vm.errorMessage = 'Unable to login';
                        return;
                    }

                    if (status && $routeParams && $routeParams.redirect) {
                        path = path + $routeParams.redirect;
                    }

                    $location.path('/category');


                }, function (err) {
                    console.log(err.statusText);
                    vm.errorMessage = 'Username or password is incorrect';
                });
        };
    };

    LoginCtrl.$inject = injectParams;

    angular.module('lfmcApp')
        .controller('LoginCtrl', LoginCtrl);

} ());