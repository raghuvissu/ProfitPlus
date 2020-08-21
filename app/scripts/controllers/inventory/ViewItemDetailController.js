(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewItemDetailController: function(scope, routeParams , resourceFactory ,location) {
        scope.itemDetailData = [];
        resourceFactory.singleItemDetailResource.get({itemId: routeParams.id} , function(data) {
        	scope.itemDetailData = data;
        });
        
    }
  });
  mifosX.ng.application.controller('ViewItemDetailController', ['$scope', '$routeParams','ResourceFactory', '$location',mifosX.controllers.ViewItemDetailController]).run(function($log) {
    $log.info("ViewItemDetailsController initialized");
  });
}(mifosX.controllers || {}));
