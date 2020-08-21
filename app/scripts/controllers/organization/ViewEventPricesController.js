(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventPricesController: function(scope, routeParams, location, resourceFactory, $uibModal, route) {		
        scope.pricing = [];      
        resourceFactory.eventpriceResource.getprice({eventId: routeParams.id} , function(data) {        	   	
            scope.pricing = data; 
            scope.eventId = routeParams.id;
        });
        scope.routeTo = function(id){
    		location.path('/viewEventPrice/'+ id);
        };
     
        /**
       	 * Delete EventPrice
       	 * */
      scope.deleteEventPrice = function (id){
      	scope.eventPriceId = id;
      	$uibModal.open({
  	                templateUrl: 'deletePopupForEventPrice.html',
  	                controller: approve,
  	                resolve:{}
  	        });
      };
          
      function  approve($scope, $uibModalInstance) {
      		$scope.approve = function () {
              	resourceFactory.eventpriceResource.remove({eventId: scope.eventPriceId}, {}, function(data) {
              		route.reload();
              	});
              	$uibModalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
            	$uibModalInstance.dismiss('cancel');
            };
      }
    }
  });
  mifosX.ng.application.controller('ViewEventPricesController', [
      '$scope', 
      '$routeParams',
      '$location',
      'ResourceFactory',
      '$uibModal',
      '$route',
      mifosX.controllers.ViewEventPricesController
      ]).run(function($log) {
    	  $log.info("ViewPriceController initialized");
  });
}(mifosX.controllers || {}));