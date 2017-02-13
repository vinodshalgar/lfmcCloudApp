'use strict';

angular.module('lfmcApp.version', [
  'lfmcApp.version.interpolate-filter',
  'lfmcApp.version.version-directive'
])

.value('version', '0.1');
