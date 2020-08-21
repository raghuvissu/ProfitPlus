(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditHardwarePlanMappingController: function(scope, resourceFactory, location, routeParams) {
		  scope.itemClassDatas = [];
		  //scope.planDatas = [];
	      //scope.itemDatas = [];
	      scope.hardwareId = routeParams.id;

	        resourceFactory.hardwareMappingResource.getDetails({hardwaremapId: routeParams.id, template : 'true'}, function(data) {
	        	scope.itemClassDatas = data.itemClassData;
	            // scope.planDatas = data.planDatas;
	            //scope.itemDatas = data.itemDatas;
	            scope.provisioning = data.provisioning;
	            scope.formData =  data; 
	        });
	        
	        scope.getBothItem = function(itemCode, itemDescription){
	        	return itemCode+"--"+itemDescription;
	        };
	        
	        scope.submit = function() {
	        	delete this.formData.itemClassData;
	        	//delete this.formData.itemDatas;
	        	//delete this.formData.planDatas;
	        	delete this.formData.provisioning;
	        	delete this.formData.provisioningValue;
	        	delete this.formData.id;
	        		
	        	resourceFactory.hardwareMappingResource.update({hardwaremapId: routeParams.id}, this.formData, function(data){
	        		location.path('/viewhardwareplanmapping/'+ data.resourceId);
	        	});
	        
	        };
		  
	     }
     });
  mifosX.ng.application.controller('EditHardwarePlanMappingController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$routeParams',
  mifosX.controllers.EditHardwarePlanMappingController]).run(function($log) {
    	 $log.info("EditHardwarePlanMappingController initialized");
  });
}(mifosX.controllers || {}));