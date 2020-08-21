(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewContractController: function(scope, routeParams , location,resourceFactory, $uibModal) {
        scope.contractperiod = [];
        //scope.PermissionService = PermissionService;
        
        resourceFactory.contractResource.get({subscriptionId: routeParams.id} , function(data) {
            scope.contractPeriod = data;
           
        });

        scope.deleteContract = function (){
        	$uibModal.open({
	                templateUrl: 'approve.html',
	                controller: approve,
	                resolve:{}
	            });
        };
        
    	function  approve($scope, $uibModalInstance) {
    		$scope.approve = function () {
            	resourceFactory.contractResource.remove({subscriptionId: routeParams.id} , {} , function() {
                  location.path('/contract');
            });
            	$uibModalInstance.dismiss('delete');
         };
            $scope.cancel = function () {
            	$uibModalInstance.dismiss('cancel');
          };
        }
    }
  });
  mifosX.ng.application.controller('ViewContractController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    '$uibModal',
    mifosX.controllers.ViewContractController]).run(function($log) {
    $log.info("ViewContractController initialized");
  });
}(mifosX.controllers || {}));
