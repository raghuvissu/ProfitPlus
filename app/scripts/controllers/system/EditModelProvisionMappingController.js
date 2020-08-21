(function(module) {
	mifosX.controllers = _.extend(module, {
		EditModelProvisionMappingController: function(scope, routeParams, resourceFactory, location,webStorage) { 
			
			scope.formData = {};
	        scope.modelProvisionMappingId=routeParams.id;
	        scope.itemTypes = ["SD","HD", "PVR"];
	        
	        resourceFactory.modelProvisionMappingResource.get({modelProvisionMappingId: routeParams.id, template: 'true'} , function(data) {
        		scope.provisionDatas = data.provisionDatas;
        		//scope.itemModelDatas = data.itemModelDatas;
	    		  
	    		  scope.formData = {
	    				  provisioningId:data.provisioningId,
	    				  model:data.model,
	    				  itemType: data.itemType,
	    				  make: data.make
	              };
	         });
	    	  
	    	  scope.reset123 = function(){
	        	  webStorage.add("callingTab", {someString: "modelProvisionTab" });
	         };
	    	 
	         scope.submit = function() {
	             resourceFactory.modelProvisionMappingResource.update({modelProvisionMappingId: routeParams.id},scope.formData,function(data){
	              location.path('/inventory');
	              webStorage.add("callingTab", {someString: "modelProvisionTab" });
	             });
	         };
			
		}
	});
	mifosX.ng.application.controller('EditModelProvisionMappingController', [
       	  '$scope', 
       	  '$routeParams', 
       	  'ResourceFactory', 
       	  '$location', 
       	  'webStorage',
    mifosX.controllers.EditModelProvisionMappingController]).run(function($log) {
    	  $log.info("EditModelProvisionMappingController initialized");
    });
}(mifosX.controllers || {}));