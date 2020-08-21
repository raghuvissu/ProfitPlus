(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewGrnController: function(scope, routeParams , resourceFactory ,location,webStorage) {
			  scope.grn = [];
			  
			  scope.selectedGRN=function(){
		        	webStorage.add("callingTab", {someString: "grn" });
		        };
	        resourceFactory.grnResource.get({grnId: routeParams.id} , function(data) {
	        	scope.grn = data;
	        });
	        
	        	scope.deleteItem = function(){
	            resourceFactory.itemResource.delete({itemId: routeParams.id},{},function(data){
	                location.path('/inventory');

	        });
	        };
	    }
	  });
	  mifosX.ng.application.controller('ViewGrnController', ['$scope', '$routeParams','ResourceFactory', '$location','webStorage',mifosX.controllers.ViewGrnController]).run(function($log) {
	    $log.info("ViewGrnController initialized");
	  });
	}(mifosX.controllers || {}));
