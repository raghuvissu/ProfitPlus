(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePromotionController: function(scope, resourceFactory, location, dateFilter, webStorage, $rootScope) {
			  
	        scope.promotiondatas = [];
	        scope.durationTypes = [];
	        scope.start = {};
	        scope.start.date = new Date();
	        
	        resourceFactory.promotionTemplateResource.get(function(data) {
	            scope.promotiondatas = data.discountTypeData;
	            scope.durationTypes = data.contractTypedata;
	           	scope.formData = {};
	        });
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "Promotioncode" });
	           };
	           
	         scope.submit = function() {  
	        	 this.formData.locale = scope.optlang.code;
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var startdate = dateFilter(scope.start.date,'dd MMMM yyyy');
	             this.formData.startDate = startdate;
	             
	            resourceFactory.promotionResource.save(this.formData, function(data){
	            		location.path('/discounts');
	          });
	           
	            webStorage.add("callingTab", {someString: "Promotioncode" });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreatePromotionController', [
	     '$scope', 
	     'ResourceFactory', 
	     '$location',
	     'dateFilter',
	     'webStorage',
	     '$rootScope',
	  mifosX.controllers.CreatePromotionController ]).run(function($log) {
	    	 $log.info("CreatePromotionController initialized");
	  });
}(mifosX.controllers || {}));