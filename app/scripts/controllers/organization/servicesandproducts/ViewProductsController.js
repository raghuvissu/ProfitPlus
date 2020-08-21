(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewProductsController: function(scope, routeParams, location, resourceFactory,$uibModal) {
        scope.product = [];
        scope.serviceDetailDatas = [];
        //scope.PermissionService = PermissionService; 
        scope.productId = routeParams.id;
    
        resourceFactory.productResource.get({productId: routeParams.id} , function(data) {
            scope.product = data;
            scope.serviceDetailDatas = data.productDetailDatas;
        });
        
        scope.deleteproducts = function (){
        	$uibModal.open({
				 templateUrl: 'deleteproducts.html',
				 controller: deleteProductsController,
				 resolve:{}
			 });
          };
          
         function deleteProductsController($scope, $uibModalInstance) {
      	  	
        	  $scope.approveDeleteProducts = function () {
        		  
        		  resourceFactory.productResource.remove({productId: scope.productId} , {} , function() {
        			  $uibModalInstance.close('delete');
                      location.path('/services');
                });
              };
              $scope.cancel = function () {
            	  $uibModalInstance.dismiss('cancel');
              };
          };
    }
  });
  mifosX.ng.application.controller('ViewProductsController', [
                                                             '$scope', 
                                                             '$routeParams', 
                                                             '$location', 
                                                             'ResourceFactory',
                                                             '$uibModal',
                                                             mifosX.controllers.ViewProductsController]).run(function($log) {
    $log.info("ViewProductsController initialized");
  });
}(mifosX.controllers || {}));
