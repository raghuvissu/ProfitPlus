(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewServicesController: function(scope, routeParams, location, resourceFactory,$uibModal) {
        scope.service = [];
        scope.serviceDetailDatas = [];
        //scope.PermissionService = PermissionService; 
        scope.serviceId = routeParams.id;
    
        resourceFactory.serviceResource.get({serviceId: routeParams.id} , function(data) {
            scope.service = data;
            scope.serviceDetailDatas = data.serviceDetailDatas;
        });
        
        scope.deleteservices = function (){
        	$uibModal.open({
				 templateUrl: 'deleteservices.html',
				 controller: deleteServicesController,
				 resolve:{}
			 });
          };
          
         function deleteServicesController($scope, $uibModalInstance) {
      	  	
        	  $scope.approveDeleteServices = function () {
        		  
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
  mifosX.ng.application.controller('ViewServicesController', [
                                                             '$scope', 
                                                             '$routeParams', 
                                                             '$location', 
                                                             'ResourceFactory',
                                                             '$uibModal',
                                                             mifosX.controllers.ViewServicesController]).run(function($log) {
    $log.info("ViewServicesController initialized");
  });
}(mifosX.controllers || {}));
