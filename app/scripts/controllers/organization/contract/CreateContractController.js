(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateContractController: function(scope, resourceFactory, location) {
    	
        scope.subscriptions = [];
        
        resourceFactory.contractTemplateResource.get(function(data) {
            scope.subscriptions = data.allowedperiods;
            scope.formData = {
                subscriptionType : scope.subscriptions[0].durationTypeCode,
            };
        });
        
        scope.submit = function() {   
            resourceFactory.contractResource.save(scope.formData,function(data){
            	  location.path('/contract');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateContractController', [
    '$scope', 
    'ResourceFactory', 
    '$location',
    mifosX.controllers.CreateContractController]).run(function($log) {
    $log.info("CreateContractController initialized");
  });
}(mifosX.controllers || {}));
