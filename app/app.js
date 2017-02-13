/** */
(function(){
    'use strict';
    /** */
    var app =angular.module('lfmcApp',['ngRoute','AuthInterceptorService','ngCookies']);
    /** */
    app.config(function($httpProvider, $routeProvider) {
          var viewBase ='/components/';
                $httpProvider.interceptors.push("authInterceptor");   
           $routeProvider
           /** */
           .when('/category', {
                controller: 'CategoryCtrl',
                templateUrl: viewBase + 'Category/Category.html',
                controllerAs: 'vm',
                secure:true
            })
             /** */
           .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: viewBase + 'login/login.html',
                controllerAs: 'vm'
            })
           /** */
           .when('/home', {    
                controller: 'HomeCtrl',           
                templateUrl: viewBase + 'home/home.html',
                controllerAs: 'vm',
                secure:true                
            })
            .when('/form', {    
                controller: 'FormCtrl',           
                templateUrl: viewBase + 'Forms/form.html',
                controllerAs: 'vm',
                secure:true                
            })
            .when('/form/:param1', {    
                controller: 'FormCtrl',           
                templateUrl: viewBase + 'Forms/form.html',
                controllerAs: 'vm',
                secure:true                
            })
           /** */
          .otherwise({ redirectTo: '/login' });
      });
    
    /** */  
    app.run(['$rootScope', '$location', 'authService','$window','$cookies',
        function ($rootScope, $location, authService,$window,$cookies) { 
         $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next && next.$$route && next.$$route.secure) {                   
                   if (!authService.user.isAuthenticated) {
                        $rootScope.$evalAsync(function () {   
                            /** redirect to login if nothing is there in session storage*/ 
                                         
                            if($cookies.get('token').length==0)
                            {
                                $location.path('/login');
                            } 
                        });
                    }
                }
            });  
    }]);
}());


