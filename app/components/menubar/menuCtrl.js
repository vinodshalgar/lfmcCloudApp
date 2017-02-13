(function () {

    var injectParams = ['$location', '$routeParams', 'authService','dataService','$scope'];

    var MenuCtrl = function ($location, $routeParams, authService,dataService,$scope) {
        var vm = this;               
        vm.user =authService;

        vm.isLoggedIn = false;        
        console.log(vm);

        vm.logout = function(){       
                console.log(vm.user.userName);  
                authService.userName='';              
                vm.isLoggedIn = true;                
                return true;
        }
        
        /** */


        

       
       /** */
       function init()
       {        
           
       }
       
       /** */
       init();
       
       $scope.$watch('user.userName', function (newVal) {
            console.log(vm.user.userName);
            //console.log(newVal);
        if(newVal === '') {
             console.log('newVal is blank');
             console.log(newVal );
        } else {
           console.log('newVal not is blank');
            console.log(newVal );
        }
      });
    };




    MenuCtrl.$inject = injectParams;
    angular.module('lfmcApp')
        .controller('MenuCtrl', MenuCtrl);

} ());