(function(module) {
  mifosX.controllers = _.extend(module, {
    ChargeCodeController: function(scope, resourceFactory,location) {
        scope.chargecodes = [];
        //scope.PermissionService = PermissionService;
        resourceFactory.chargecodeResource.query(function(data) {
            scope.chargecodes = data;
        });
        scope.routeTo = function(id){
            location.path('/viewchargecode/'+ id);
        };
    }
  });
  mifosX.ng.application.controller('ChargeCodeController', [
      '$scope', 
      'ResourceFactory',
      '$location',
      mifosX.controllers.ChargeCodeController
      ]).run(function($log) {
    	  $log.info("ChargeCodeController initialized");
      });
}(mifosX.controllers || {}));
