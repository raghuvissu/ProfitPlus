(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewHardwarePlanMappingController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService) {
		  
		    scope.hardwareplans = []; 
	        scope.PermissionService = PermissionService;
	        resourceFactory.hardwareMappingResource.getDetails({hardwaremapId: routeParams.id,template: 'true'} , function(data) {
	        	scope.hardwareplans = data;                                                
	        });
	  }
   });
  mifosX.ng.application.controller('ViewHardwarePlanMappingController', [
        '$scope', 
        '$routeParams', 
        '$route', 
        '$location', 
        'ResourceFactory', 
        '$http',
        'PermissionService', 
  mifosX.controllers.ViewHardwarePlanMappingController]).run(function($log) {
	    $log.info("ViewHardwarePlanMappingController initialized");
  });
}(mifosX.controllers || {}));
