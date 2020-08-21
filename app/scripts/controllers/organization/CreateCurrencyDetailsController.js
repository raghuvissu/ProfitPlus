(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateCurrencyDetailsController : function(scope, resourceFactory,location, dateFilter, $rootScope) {
			
			scope.formData={};
			scope.countryDatas = [];
			scope.currencydatas = [];
			scope.currencystatus = [];
			scope.formData.validFrom = new Date();
			scope.validTo = new Date();
			

			resourceFactory.currencyTemplateResource.get(function(data) {
				scope.countryDatas = data.countryData;
				scope.currencydatas = data.currencydata.currencyOptions;
				scope.currencystatus = data.statusData;
				//scope.formData.status = scope.currencystatus[0].id;
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
				console.log(scope.formData);
				scope.formData.locale = scope.optlang.code;
				scope.formData.dateFormat = "dd MMMM yyyy";
				var reqDate = dateFilter(scope.formData.validFrom,'dd MMMM yyyy');
				scope.formData.validFrom = reqDate;
	        	var reqEndDate = dateFilter(scope.formData.validTo,'dd MMMM yyyy');
	        	scope.formData.validTo = reqEndDate;
				resourceFactory.currencyResource.save(scope.formData, function(data) {
					location.path('/currencydetails');
				});
			};
		}
	});
	mifosX.ng.application.controller('CreateCurrencyDetailsController',[ '$scope', 'ResourceFactory', '$location', 'dateFilter', '$rootScope',mifosX.controllers.CreateCurrencyDetailsController ]).run(function($log) {
	$log.info("CreateCurrencyDetailsController initialized");
 });
}(mifosX.controllers || {}));
