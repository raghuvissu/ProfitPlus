(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventPriceController: function(scope, routeParams, location, resourceFactory, PermissionService, $uibModal) {		
        scope.pricedata = [];     
        scope.PermissionService = PermissionService;
        resourceFactory.eventPriceEditResource.geteventpricedetail({id: routeParams.id} , function(data) {
        	scope.eventId = data.eventId;
            scope.pricedata = data;  
           // scope.clientTypes=data.clientTypes;
            for(var i = 0; i < scope.pricedata.clientTypes.length; i++){
            	if(scope.pricedata.clientTypes[i].id == scope.pricedata.clientTypeId){
            		scope.clientTypeValue = scope.pricedata.clientTypes[i].type;
            	}
            }
        });

          /**
         	 * Delete EventPrice
         	 * */
        scope.deleteEventPrice = function (id){
        	scope.eventId = id;
        	$uibModal.open({
    	                templateUrl: 'deletePopupForEventPrice.html',
    	                controller: approve,
    	                resolve:{}
    	        });
        };
            
        function  approve($scope, $uibModalInstance) {
        		$scope.approve = function () {
                	resourceFactory.eventpriceResource.remove({eventId: routeParams.id} , {} , function(data) {
                		location.path('/viewEventPrices/'+ scope.eventId); 
                	});
                	$uibModalInstance.dismiss('delete');
        		};
              $scope.cancel = function () {
            	  $uibModalInstance.dismiss('cancel');
              };
          }
    
    }
  });
  mifosX.ng.application.controller('ViewEventPriceController', [
      '$scope', 
      '$routeParams',
      '$location',
      'ResourceFactory',
      'PermissionService', 
      '$uibModal',
      mifosX.controllers.ViewEventPriceController
      ]).run(function($log) {
    	  $log.info("ViewEventPriceController initialized");
  });
}(mifosX.controllers || {}));