(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewServiceController: function(scope, routeParams, location, resourceFactory,$uibModal) {
        scope.service = [];
        scope.serviceDetailDatas = [];
        //scope.PermissionService = PermissionService; 
        scope.serviceId = routeParams.id;
    
        resourceFactory.serviceResource.get({serviceId: routeParams.id} , function(data) {
            scope.service = data;
            scope.serviceDetailDatas = data.serviceDetailDatas;
        });
        
        scope.deleteservice = function (){
        	$uibModal.open({
				 templateUrl: 'deleteservice.html',
				 controller: deleteServiceController,
				 resolve:{}
			 });
          };
          
         function deleteServiceController($scope, $uibModalInstance) {
      	  	
        	  $scope.approveDeleteService = function () {
        		  
        		  resourceFactory.serviceResource.remove({serviceId: scope.serviceId} , {} , function() {
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
  mifosX.ng.application.controller('ViewServiceController', [
                                                             '$scope', 
                                                             '$routeParams', 
                                                             '$location', 
                                                             'ResourceFactory',
                                                             '$uibModal',
                                                             mifosX.controllers.ViewServiceController]).run(function($log) {
    $log.info("ViewServiceController initialized");
  });
}(mifosX.controllers || {}));
