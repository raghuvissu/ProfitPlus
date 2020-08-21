(function(module) {
	mifosX.controllers = _.extend(module, {
		CreatePropertyController : function(scope,location,$uibModal,route, webStorage,resourceFactory,PermissionService,http,dateFilter,API_VERSION,$rootScope,filter) {
			
			
			
			
		}
	});
	mifosX.ng.application.controller('CreatePropertyController',[ 
	    '$scope',
	    '$location',
	    '$uibModal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    'PermissionService',
	    '$http', 
        'dateFilter',
        'API_VERSION',
        '$rootScope',
        '$filter',
	    mifosX.controllers.CreatePropertyController 
	    ]).run(function($log) {
	    	$log.info("CreatePropertyController initialized");
	    });
}(mifosX.controllers || {}));

