(function(module) {
  mifosX.controllers = _.extend(module, {
	  TaxMappingController: function(scope,routeParams, resourceFactory,location) {
        scope.taxmappings = [];
        scope.chargeCode = routeParams.chargeCode;
        scope.chargeId = routeParams.chargeId;
        scope.chargeCodeId = routeParams.chargeCodeId;
        
        resourceFactory.taxmappingResource.query({chargeCode: routeParams.chargeCode}, function(data) {
            scope.taxmappings = data;
            scope.chargeId = routeParams.chargeId;
        });
        scope.routeTo = function(id){
            location.path('/viewtaxmapping/'+ id+'/'+routeParams.chargeId);
        };
    }
  });
  mifosX.ng.application.controller('TaxMappingController', [
       '$scope', 
       '$routeParams',
       'ResourceFactory',
       '$location',
       mifosX.controllers.TaxMappingController
       ]).run(function($log) {
    	   $log.info("TaxMappingController initialized");
       });
}(mifosX.controllers || {}));
