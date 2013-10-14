'use strict';

/* Controllers */

angular.module('marketWatchApp.controllers')
	/*syntax -  .controller('name',[resources...,func(resources...){}])*/
	.controller(
		'SwitcherCtrl', 
		['$scope','getMarketplacesSrv', 'sharedSrv', function($scope,getMarketplacesSrv,sharedSrv) {
			console.log("in controller");
			getMarketplacesSrv.get(function(result){
				$scope.marketplaces = result.marketplaces;
				$scope.selectedMarketplace = $scope.marketplaces[0];

				$scope.onMarketplaceChange();
			});

			$scope.init = function (){
				console.log("Init function for the the SwitcherCtrl");
			};

			$scope.onMarketplaceChange = function(){
				sharedSrv.changeMarketplace($scope.selectedMarketplace);
			}
		}
	])
	.controller('MainAreaCtrl', ['$scope','sharedSrv', function($scope,sharedSrv) {
		$scope.$on('selected-marketplace-changed', function(){
			console.log("handled broadcast");
			$scope.selectedMarketplace = sharedSrv.selectedMarketplace;
		});

		$scope.tabs = {
			selectedIndex : 0
		};

		$scope.tabClick = function(index){
			$scope.tabs.selectedIndex = index;
		}

		$scope.getSelectedTabIndex = function(){
			return $scope.tabs.selectedIndex;
		}
	}]);