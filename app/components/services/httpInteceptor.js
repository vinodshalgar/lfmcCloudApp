(function () {   
  angular.module("AuthInterceptorService", [])
  .factory("authInterceptor", function($q,$window,$cookies) {  
    return {
      request: function(config) {
        config.headers = config.headers || {};
            if ($cookies.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookies.get('token');                    
            }             
        //alert('Request intercepted.');
        return config || $q.when(config);
      }
    };
  });

}());