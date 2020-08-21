(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateHardwarePlanMappingController: function(scope, webStorage, resourceFactory, location) {
			  
			  scope.itemClassDatas = [];
			  //scope.itemDatas = [];
		      // scope.planDatas = [];
		        
		     resourceFactory.hardwaretemplateMappingResource.getTemplateData(function(data) {
		    	scope.itemClassDatas = data.itemClassData;
	            //scope.itemDatas = data.itemDatas;
	           // scope.planDatas = data.planDatas;
	            scope.provisioning = data.provisioning;
	            scope.formData = {
		            		
		         };
		     });
		     
		     scope.getBothItem = function(itemCode, itemDescription){
		        	return itemCode+"--"+itemDescription;
		        };
		        
	        scope.reset123 = function(){
	       	    webStorage.add("callingTab", {someString: "hardwarePlanMapping" });
	          };
	        scope.submit = function() {  
	        	webStorage.add("callingTab", {someString: "hardwarePlanMapping" });
	            resourceFactory.hardwareMappingResource.save(this.formData, function(data){
	            		location.path('/mappingconfig');
	            	
	            });
	        };
			  
		}
  });
  mifosX.ng.application.controller('CreateHardwarePlanMappingController', [
      '$scope',
      'webStorage',
      'ResourceFactory',
      '$location', 
  mifosX.controllers.CreateHardwarePlanMappingController ]).run(function($log) {
       $log.info("CreateHardwarePlanMappingController initialized");
  });
}(mifosX.controllers || {}));