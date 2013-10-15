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
		

		$scope.tabs = {
			selectedIndex : 0
		};

		$scope.tabClick = function(index){
			$scope.tabs.selectedIndex = index;

			if(index==0){
				//dispatch event from here to load appropriate data in the selected view
			}
		}

		$scope.getSelectedTabIndex = function(){
			return $scope.tabs.selectedIndex;
		}
	}])
	.controller('TopSellersCtrl',['$scope','sharedSrv','getTopSellersSrv',function($scope,sharedSrv,getTopSellersSrv){
		$scope.label = "The Top Sellers";
		$scope.popularItems = {};
		$scope.items = {};

		$scope.subNav = {
			selectedIndex: 0
		}

		$scope.subNavClick = function(index){
			$scope.subNav.selectedIndex = index;

			$scope.updateData();
		}

		$scope.getSelectedSubNav = function(){
			return $scope.subNav.selectedIndex;
		}

		$scope.$on('selected-marketplace-changed', function(){
			console.log("handled broadcast");
			$scope.fetch();
		});

		$scope.fetch = function(){

			getTopSellersSrv.get(sharedSrv.selectedMarketplace,function(result){
				$scope.popularItems = result.popular;
				$scope.updateData();
				
			});
		}

		$scope.updateData = function(){
			if($scope.subNav.selectedIndex==0){
				$scope.items = $scope.popularItems["items_last_week"];
			}else if($scope.subNav.selectedIndex==1){
				$scope.items = $scope.popularItems["items_last_three_months"];
				
			}
			console.log("marketplace data transfered to UI successfully");
		}
	}])


	;