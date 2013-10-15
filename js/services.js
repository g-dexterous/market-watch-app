'use strict';
/* Services */
/*syntax - .module('name','requires','config function')*/
angular.module('marketWatchApp.services')



.service("getMarketplacesSrv",
	['$resource','$http',function($resource, $http){
		console.log("Registering service");
		var _self = this;
		_self.get = function(callback){
			_self.resource = $resource('data/marketplaces.json');
			_self.resource.get(
				function(result){
					console.log("Appears that service request is successful: "+result);
					callback(result);
				}
			);
		}
	}
])

.service("getTopSellersSrv",
	['$resource', '$http', function($resource, $http){
		console.log("Registering getTopSellersSrv");
		var _self = this;
		_self.get = function(selectedMarketplace,callback){
			var url = PROXY_URL + encodeURIComponent("popular:"+selectedMarketplace.codename+".json");
			console.log(url);
			_self.resource = $resource(url);
			_self.resource.get(
				function(result){
					console.log("Response from envato API: "+result);
					callback(result);
				}
			);
		}
	}
])


.factory("sharedSrv", ['$rootScope',function($rootScope){
	var sharedObject = {};
	sharedObject.selectedMarketplace = {};

	sharedObject.changeMarketplace = function (marketplaceObj){
		console.log("changeMarketplace function of shared service");
		this.selectedMarketplace = marketplaceObj;

		this.dispatchMessage("selected-marketplace-changed");
	}

	sharedObject.dispatchMessage = function (msg){
		console.log("broadcast the message");
		$rootScope.$broadcast(msg);
	}

	return sharedObject;
}]);

var PROXY_URL = "data/proxy.php?req=http://marketplace.envato.com/api/edge/";