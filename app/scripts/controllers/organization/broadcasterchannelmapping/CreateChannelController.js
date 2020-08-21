(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateChannelController: function(scope, resourceFactory, location,webStorage) {
			scope.formdata={};
	    	scope.broadcasterDatas = {};
	    	scope.channelCategorys = ["English News","English Entertainment","English Movies","English Music","English Sports",
	    	                          "Hindi News","Hindi Entertainment","Hindi Movies","Hindi Music","Hindi Sports",
	    	                          "Telugu News","Telugu Entertainment","Telugu Movies","Telugu Music","Telugu Sports",
	    	                          "Other News","Other Entertainment","Other Movies","Other Music","Other Sports","Gujarathi Entertainment",
	    	                          "Kanada Entertainment","Marathi Entertainment","Bangla Entertainment","MP Entertainment","Odia Entertainment",
	    	                          "Bihar Enterainment","Rajasthan Entertainment","Urdu Entertainment","UP Entertainment","Punjabi Entertainment"];
	    	scope.channelTypes = ["Pay", "FTA"];
	    	
	    	resourceFactory.channelTemplateResource.get(function(data) {
				  scope.broadcasterDatas = data.broadcasterDatas;
			});
	    	
	         
	         scope.reset123 = function(){
	          	location.path('/broadcasterchannelmapping');
	          	webStorage.add("callingTab", {someString: "channel" });
	  	       };
	    	
	    	scope.submit = function(){
	    		
	    		resourceFactory.channelResource.save(scope.formData,function(data){
	    			location.path('/broadcasterchannelmapping');
	    			webStorage.add("callingTab", {someString: "channel" });
	    		});
	    		
	    	};
	    
		}
		
	});
	 mifosX.ng.application.controller('CreateChannelController', [
	  	'$scope', 
	    'ResourceFactory', 
	    '$location',
	    'webStorage',
	 mifosX.controllers.CreateChannelController]).run(function($log) {
	 $log.info("CreateChannelController initialized");
	});
}(mifosX.controllers || {}));