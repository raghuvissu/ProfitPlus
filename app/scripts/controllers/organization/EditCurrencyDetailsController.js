(function(module) {
	mifosX.controllers = _.extend(module, {
		EditCurrencyDetailsController : function(scope, resourceFactory,location, routeParams, dateFilter, $rootScope) {

			scope.countryDatas = [];
			scope.currencydatas = [];
			scope.currencystatus = [];
			scope.date = {};
			
			resourceFactory.currencyResource.get({id : routeParams.id,template : 'true'}, function(data) {
				scope.countryDatas = data.countryData;
				scope.currencydatas = data.currencydata.currencyOptions;
				scope.currencystatus = data.statusData;
				scope.formData = data;
				var validFrom =data.validFrom; 
	            var validTo =data.validTo;
	            
	            scope.date.validFrom = dateFilter(new Date(validFrom),'dd MMMM yyyy');
	            if(validTo){
	            	 scope.date.validTo = dateFilter(new Date(validTo),'dd MMMM yyyy');
	            }
	            
	            for(var i in scope.currencystatus){
		    		 if((scope.currencystatus[i].value).toLowerCase() == "active"){
		    			 scope.formData.status = scope.currencystatus[i].value;
		    		 }
		    	 }
				
			});
			
			scope.getBothcurrency = function(code,name){
	        	return code+"--"+name;
	        };

			scope.submit = function() {
				this.formData.locale = scope.optlang.code;
				scope.formData.dateFormat = "dd MMMM yyyy";
				scope.formData.validFrom = dateFilter(scope.date.validFrom,scope.formData.dateFormat);
	            scope.formData.validTo = dateFilter(scope.date.validTo,scope.formData.dateFormat);
				delete this.formData.countryData;
				delete this.formData.currencydata;
				delete this.formData.statusData;
				delete this.formData.id;
				resourceFactory.currencyResource.update({id : routeParams.id}, this.formData, function(data) {
			      location.path('/viewcurrencydetails/' + data.resourceId);
				});
			};
		}
	});
	mifosX.ng.application.controller('EditCurrencyDetailsController',[ '$scope', 'ResourceFactory', '$location', '$routeParams', 'dateFilter', '$rootScope',mifosX.controllers.EditCurrencyDetailsController ]).run(function($log) {
				$log.info("EditCurrencyDetailsController initialized");
			});
}(mifosX.controllers || {}));


