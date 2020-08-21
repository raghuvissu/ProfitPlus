(function(module) {
	mifosX.controllers = _.extend(module, {
		EditChannelMappingController: function(scope, routeParams, resourceFactory, location,webStorage) {
			
			scope.formData = {};
	        scope.channelmappingId=routeParams.id;
	        
	        resourceFactory.channelMappingResource.get({channelmappingId: routeParams.id, template: 'true'} , function(data) {
	    		  scope.productDatas = data.productDatas;
	    		  scope.channelDatas = data.channelDatas;
	    		  
	    		  scope.formData = {
	    				   productId:data.productId,
	            		   channelId:data.channelId,
	              };
	        });
	        scope.reset123 = function(){
	        	  webStorage.add("callingTab", {someString: "channelmapping" });
	        };
	        scope.submit = function() {
	              resourceFactory.channelMappingResource.update({channelmappingId: routeParams.id},scope.formData,function(data){
	              location.path('/ViewChannelMapping/' + data.resourceId);
	             });
	        };     
		}
	});
	mifosX.ng.application.controller('EditChannelMappingController', [
	 '$scope', 
	 '$routeParams', 
	 'ResourceFactory', 
	 '$location', 
	 'webStorage',
	mifosX.controllers.EditChannelMappingController]).run(function($log) {
		$log.info("EditChannelMappingController initialized");
	});
}(mifosX.controllers || {}));