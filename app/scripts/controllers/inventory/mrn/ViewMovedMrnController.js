(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMovedMrnController: function(scope, routeParams , resourceFactory) {
        scope.mrn = [];
        
        resourceFactory.moveMrnSaveResource.getMovedMrnResource({mrnId: routeParams.id} , function(data) {
        	scope.mrn = data;
        });
       
    }
  });
  mifosX.ng.application.controller('ViewMovedMrnController', ['$scope', '$routeParams','ResourceFactory',mifosX.controllers.ViewMovedMrnController]).run(function($log) {
    $log.info("ViewMovedMrnController initialized");
  });
}(mifosX.controllers || {}));
