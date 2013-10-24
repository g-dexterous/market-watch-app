'use strict';

/* Filters */
angular.module('marketWatchApp.filters')

.filter("CostInDollars", function(){
	return function(item){
		return "$"+ parseInt(item.cost);
	}
})

.filter("SalesPerDay",function(){
	return function(item){
		var salesPerday = "";
		
		//first find out today
		var today = new Date().getTime();
		//find the the date when item was uploaded
		var uploadDate = new Date(item.uploaded_on).getTime();

		var daysElapsed = Math.floor((today-uploadDate)/(1000*60*60*24));

		salesPerday = Math.round(parseInt(item.sales)/daysElapsed*100)/100;

		return salesPerday;
	}
})

.filter("DollarsPerDay",function(){
	return function(item, commRate){
		var dollarsPerDay = "";
		
		//first find out today
		var today = new Date().getTime();
		//find the the date when item was uploaded
		var uploadDate = new Date(item.uploaded_on).getTime();

		var daysElapsed = Math.floor((today-uploadDate)/(1000*60*60*24));

		dollarsPerDay = Math.round(parseInt(item.sales)*parseInt(item.cost)*commRate/daysElapsed*100)/100;

		return dollarsPerDay;
	}
})

;
