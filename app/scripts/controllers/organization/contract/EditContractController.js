(function(module) {
  mifosX.controllers = _.extend(module, {
    EditContractController: function(scope, routeParams, resourceFactory, location) {
        scope.formData = {};
    	scope.allowedperiods={};
    	scope.contractId=routeParams.id;

        resourceFactory.contractResource.get({subscriptionId: scope.contractId, template: 'true'} , function(data) {
        	 scope.allowedperiods= data.allowedperiods;
              scope.formData = {
        		  subscriptionPeriod:data.subscriptionPeriod,
        		  subscriptionType:data.subscriptionType,
        		  units:data.units
             };
        });
        
        scope.submit = function() {
            resourceFactory.contractResource.update({'subscriptionId': scope.contractId},this.formData,function(data){
             location.path('/viewContract/' + data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('EditContractController', [
  '$scope', 
  '$routeParams', 
  'ResourceFactory', 
  '$location', 
   mifosX.controllers.EditContractController]).run(function($log) {$log.info("EditContractController initialized");
  });
}(mifosX.controllers || {}));
