(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewCurrencyController: function(scope, routeParams , location, resourceFactory) {
		  
		scope.currency = [];
        
        resourceFactory.currencyConfigResource.get({currencyId: routeParams.id}, function(data) {
            scope.currency = data;
        });
        
    }
  });
  mifosX.ng.application.controller('ViewCurrencyController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    mifosX.controllers.ViewCurrencyController]).run(function($log) {
    $log.info("ViewCurrencyController initialized");
  });
}(mifosX.controllers || {}));
