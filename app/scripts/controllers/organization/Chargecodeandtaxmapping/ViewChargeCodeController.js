(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewChargeCodeController: function(scope, routeParams, resourceFactory) {
        scope.chargecode = {};
        //scope.PermissionService = PermissionService;
        
        resourceFactory.chargecodeResource.get({chargeCodeId: routeParams.id}, function(data) {
            scope.chargecode = data;
            scope.chargeId =  routeParams.id;
        });
    }
  });
  mifosX.ng.application.controller('ViewChargeCodeController', [
        '$scope', 
        '$routeParams',
        'ResourceFactory',
        mifosX.controllers.ViewChargeCodeController
        ]).run(function($log) {
        	$log.info("ViewChargeCodeController initialized");
        });
}(mifosX.controllers || {}));
