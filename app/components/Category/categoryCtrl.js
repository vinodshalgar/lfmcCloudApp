(function () {


    var injectParams = ['$location', '$routeParams', 'authService','dataService','$rootScope'];

    var CategoryCtrl = function ($location, $routeParams, authService,dataService, $rootScope) {

        var vm = this;
        vm.categoriesandSubCategories=[];
        vm.filter = null;
        vm.accordion = 1;
        
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

            getCategoriesAndSubCategories();
        }
        init();

     
       function getCategoriesAndSubCategories(){           
           dataService.getCategoryAndSubCategory()
           .then(function(results){                
                vm.categoriesandSubCategories=results.data;                                        
           },function(error){

           });
       }
       
       
    };

    CategoryCtrl.$inject = injectParams;

    angular.module('lfmcApp')
        .controller('CategoryCtrl', CategoryCtrl);

} ());