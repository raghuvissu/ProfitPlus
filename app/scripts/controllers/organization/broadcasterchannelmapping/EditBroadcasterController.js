(function(module) {
	mifosX.controllers = _.extend(module, {
		EditBroadcasterController: function(scope, routeParams, resourceFactory, location) {
			
			scope.formData = {};
			scope.broadcasterId=routeParams.id;
			
			resourceFactory.broadCasterResource.get({broadcasterId: routeParams.id, template: 'true'} , function(data) {
				
				scope.formData = {
		            	  broadcasterCode:data.broadcasterCode,
		            	  broadcasterName:data.broadcasterName,
		            	  contactMobile:data.contactMobile,
		            	  contactNumber:data.contactNumber,
		            	  contactName:data.contactName,
		            	  email:data.email,
		            	  address:data.address,
		            	  pin:data.pin,
		        		  
		             };
				});
				scope.submit = function() {   
		            resourceFactory.broadCasterResource.update({'broadcasterId': scope.broadcasterId}, scope.formData,function(data){
		            	location.path('/viewbroadcaster/' + data.resourceId);
		          });
		        };		
		}
	});
	mifosX.ng.application.controller('EditBroadcasterController', [
	 '$scope', 
	 '$routeParams', 
	 'ResourceFactory', 
	 '$location', 
	mifosX.controllers.EditBroadcasterController]).run(function($log) {
	  $log.info("EditBroadcasterController initialized");
	});	
}(mifosX.controllers || {}));