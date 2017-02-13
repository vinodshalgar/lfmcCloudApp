(function () {

    var injectParams = ['$location', '$routeParams'];

    var MenuCtrl = function ($location, $routeParams) {
        vm.role = null;
        vm.menuLeft = null;
        vm.menuRight = null;

        vm.getMenu =  function(role) {
            switch (role) {
                case "Admin": {
                    vm.menuLeft = [

                    ];
                    vm.menuRight = [

                    ];
                } break;
                case "User": {
                    vm.menuLeft = [
                        {
                            "Item": "Forms",
                            "Value": "/forms"
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
                            "Item": "Profile",
                            "Value": "/profile"
                        }
                    ];
                } break;
                case "Login": {
                    vm.menuLeft = [

                    ];
                    vm.menuRight = [
                        {
                            "Item": "Register",
                            "Value": "/register"
                        }
                    ];
                } break;
                case "Register": {
                    vm.menuLeft = [

                    ];
                    vm.menuRight = [
                        {
                            "Item": "Login",
                            "Value": "/login"
                        }
                    ];
                } break;
                default: {
                    vm.menuLeft = [

                    ];
                    vm.menuRight = [
                        {
                            "Item": "Login",
                            "Value": "/login"
                        },
                        {
                            "Item": "Register",
                            "Value": "/register"
                        }
                    ];
                }
            }
        }
    };

    MenuCtrl.$inject = injectParams;

    angular.module('lfmcApp')
        .controller('MenuCtrl', MenuCtrl);

}());