(function(module) {
	mifosX.controllers = _.extend(module, {
		EditChannelController: function(scope, routeParams, resourceFactory, location,webStorage) {
			
			scope.formData = {};
	    	scope.channelId=routeParams.id;
	    	scope.channelCategorys = ["English News","English Entertainment","English Movies","English Music","English Sports",
	    	                          "Hindi News","Hindi Entertainment","Hindi Movies","Hindi Music","Hindi Sports",
	    	                          "Telugu News","Telugu Entertainment","Telugu Movies","Telugu Music","Telugu Sports",
	    	                          "Other News","Other Entertainment","Other Movies","Other Music","Other Sports","Gujarathi Entertainment",
	    	                          "Kanada Entertainment","Marathi Entertainment","Bangla Entertainment","MP Entertainment","Odia Entertainment",
	    	                          "Bihar Enterainment","Rajasthan Entertainment","Urdu Entertainment","UP Entertainment","Punjabi Entertainment"];
	    	scope.channelTypes = ["Pay", "FTA"];
	    	
	    	 resourceFactory.channelResource.get({channelId: routeParams.id, template: 'true'} , function(data) {
	    		 
	    		 scope.broadcasterDatas = data.broadcasterDatas;
	    		  scope.formData = {
	            		   channelName:data.channelName,
	            		   channelCategory:data.channelCategory,
	            		   channelType:data.channelType,
	            		   isLocalChannel:data.isLocalChannel,
	            		   isHdChannel:data.isHdChannel,
	            		   channelSequence:data.channelSequence,
	            		   broadcasterId:data.broadcasterId,
	              };
	    	 });
	    	 scope.reset123 = function(){
	        	  webStorage.add("callingTab", {someString: "channel" });
	         };
	         scope.submit = function() {
	             resourceFactory.channelResource.update({channelId: routeParams.id},scope.formData,function(data){
	              location.path('/viewChannel/' + data.resourceId);
	             });
	         };     
	         
		}
	});
	 mifosX.ng.application.controller('EditChannelController', [
	  '$scope', 
	  '$routeParams', 
	  'ResourceFactory', 
	  '$location', 
	  'webStorage',
	 mifosX.controllers.EditChannelController]).run(function($log) {
		 $log.info("EditChannelController initialized");
	 });
}(mifosX.controllers || {}));