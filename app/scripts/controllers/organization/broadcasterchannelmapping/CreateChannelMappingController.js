(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateChannelMappingController: function(scope, resourceFactory, location,webStorage) {
			
			 scope.formdata={};
		     scope.productDatas = {};
		     scope.channelDatas = {};
		     
		     resourceFactory.channelMappingTemplateResource.gettemplate(function(data) {
				  scope.productDatas = data.productDatas;
				  scope.channelDatas = data.channelDatas;
			});
		     
		     scope.reset123 = function(){
		          location.path('/broadcasterchannelmapping');
		          webStorage.add("callingTab", {someString: "channelmapping" });
		  	 };
		  	 
		  	scope.submit = function(){
	     		
	     		resourceFactory.channelMappingResource.save(scope.formData,function(data){
	     			location.path('/broadcasterchannelmapping');
	     			webStorage.add("callingTab", {someString: "channelmapping" });
	     		});	
	     	};  	 
		}
	});
	mifosX.ng.application.controller('CreateChannelMappingController', [
	 '$scope', 
	 'ResourceFactory', 
	 '$location',
	 'webStorage',
	mifosX.controllers.CreateChannelMappingController]).run(function($log) {
	   $log.info("CreateChannelMappingController initialized");
	});	
}(mifosX.controllers || {}));