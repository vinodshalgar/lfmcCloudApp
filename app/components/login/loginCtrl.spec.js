/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */
'use strict';
describe('lfmcApp login controller', function() {
    var $scope,
        createController,
        fakeLoginService,
        q

  /**fake login service */
  fakeLoginService={
      login: function(){
          var data={
              recordCount:1,
              results:[{
                  "userName":"vinod.shalgar@oneadvanced.com"
              }]
          }
          return q.when(data);
      }
  };


  beforeEach(function(){
      module('lfmcApp');
        inject(function ($controller, $rootScope, $q) {
            $scope = $rootScope.$new();
            q = $q;

             createController=function(){
            return $controller('LoginCtrl',{
                authService:fakeLoginService
            });
        };
        });
  });

  it('should authenticate valid user', function () {
        var vm = createController();
        // vm.userName='vinod.shalgar@oneadvanced.com';
        // vm.password='ppp';
        $scope.$apply(); //Ensure promises are resolved                                    
        expect(vm.login1()).toEqual(false);
    });

    //  it('should not authenticate user with invalid password', function () {
    //     var vm = createController();
    //     $scope.$apply(); //Ensure promises are resolved             
    //     expect(1).toEqual(1);
    // });

});