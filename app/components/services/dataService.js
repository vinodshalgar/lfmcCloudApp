/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */
(function(){
    'use strict'

    var injectParams =['lfmcService'];

    var dataService =function(lfmcService){
        return lfmcService;
    };

    dataService.$inject= injectParams;

    angular.module('lfmcApp').factory('dataService',dataService);

}());