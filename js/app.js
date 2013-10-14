'use strict';

//First declare the modules
angular.module('marketWatchApp.services',['ngResource']);
angular.module('marketWatchApp.controllers', []);

//declare the global module (app) and load the other required modules:
angular.module('marketWatchApp', 
	[ 'marketWatchApp.controllers' , 'marketWatchApp.services'])
  
  /*
    'marketWatchApp.filters', 
    'marketWatchApp.services', 
    'marketWatchApp.directives',
*/

  ;