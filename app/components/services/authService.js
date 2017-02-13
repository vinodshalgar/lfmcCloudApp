(function(){

    var injectParams = ['$http', '$rootScope','$window','$cookies'];

    var authFactory = function ($http, $rootScope,$window,$cookies){
         
         var serviceBase = 'http://localhost:55814/api/dataservice/',
             tokenServiceBase='http://localhost:55814/token',
         factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null,
                    userName:null
                }
            };

        factory.login = function(email,password)
        {
            var data ="grant_type=password&email="+ email +"&password="+ password +"&username="+ email +"";            
            return $http.post(tokenServiceBase, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function(response)
            {
                //set cookie
                $cookies.put('token', response.access_token);
                //$window.sessionStorage.setItem('token', response.access_token);                                   
                factory.user.isAuthenticated=true;
                factory.user.userName=email; 

            }).error(function(err,status){
                 //remove token
                $cookies.remove('token');
                //$window.sessionStorage.removeItem('token');   
                factory.user.isAuthenticated=false;              
                factory.user.userName='';
            });
            return ;
        };


         factory.login1 = function (email, password) {           
            return $http.post(serviceBase + 'login', { userLogin: { userName: email, password: password } }).then(
                function (results) {
                    var loggedIn = results.data.status;;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

         function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }        
        return factory;
    };

    authFactory.$inject = injectParams;
    angular.module('lfmcApp').factory('authService', authFactory);
}());