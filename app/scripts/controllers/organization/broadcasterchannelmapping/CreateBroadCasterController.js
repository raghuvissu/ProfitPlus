(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateBroadCasterController: function(scope, resourceFactory, location,webStorage) {
			
			scope.formData = {};
			scope.reset123=function(){
	    		location.path('/broadcasterchannelmapping');
	        	webStorage.add("callingTab", {someString: "broadcaster" });
	        };
	        
	        scope.submit = function() {   
	        	scope.formData.locale = "en";
	            resourceFactory.broadCasterResource.save(scope.formData,function(data){
	            	location.path('/broadcasterchannelmapping');
	        		webStorage.add("callingTab", {someString: "broadcaster" });
	          });
	        };
	}			
});
	mifosX.ng.application.controller('CreateBroadCasterController', [
	'$scope', 
	'ResourceFactory', 
	'$location',
	'webStorage',
	mifosX.controllers.CreateBroadCasterController]).run(function($log) {
	$log.info("CreateBroadCasterController initialized");
 });	
}(mifosX.controllers || {}));