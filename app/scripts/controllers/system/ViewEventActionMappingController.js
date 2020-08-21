(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventActionMappingController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService) {
		  
		    scope.eventactions = [];      
	        scope.PermissionService =  PermissionService; 

	        resourceFactory.EventActionMappingResource.getDetails({id: routeParams.id} , function(data) {
	            scope.eventactions = data;                                                
	        });
	        
	        scope.deleteEventAction = function (){
	            resourceFactory.EventActionMappingResource.delete({id: routeParams.id} , {} , function(data) {
	                  location.path('/mappingconfig');      
	            });
	          };
	  
	  }
  });
  mifosX.ng.application.controller('ViewEventActionMappingController', [
        '$scope', 
        '$routeParams', 
        '$route', 
        '$location', 
        'ResourceFactory', 
        '$http',
        'PermissionService', 
  mifosX.controllers.ViewEventActionMappingController]).run(function($log) {
	    $log.info("ViewEventActionMappingController initialized");
  });
}(mifosX.controllers || {}));