/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */
(function () {
    'use strict'
    var injectParams = ['$http', '$q', '$cookies'];

    var lfmcFactory = function ($http, $q, $cookies) {
        var serviceBase = 'http://localhost:55814/api/';
        var factory = {};


        /**Menu */

        /** get category and sub category details */
        factory.getCategoryAndSubCategory = function () {
            /** */
            var authHeader = {};
            authHeader.Authorization = 'Bearer ' + $cookies.get('token');
            return $http({
                method: 'GET',
                url: serviceBase + 'CategoryAndSubCategory'
            })
                .success(function (response) {
                    return response.data;
                }).error(function () {

                });
        };

        factory.getForm = function (formname) {
            var fname = "/contents/data/" + formname + ".json";
            return $http({
                method: 'GET',
                url: fname
            })
                .success(function (response) {
                    return response;
                }).error(function (error) {
                });
        };

        return factory;
    };

    lfmcFactory.$inject = injectParams;
    angular.module('lfmcApp').factory('lfmcService', lfmcFactory);

}());