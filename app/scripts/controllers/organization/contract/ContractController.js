(function(module) {
  mifosX.controllers = _.extend(module, {
	  ContractController: function(scope, resourceFactory,location,$uibModal,route) {
        scope.contracts = [];
        //scope.PermissionService = PermissionService;
        resourceFactory.contractResource.query(function(data) {
            scope.contracts = data;
        });
        scope.routeTo = function(id){
            location.path('/viewContract/'+ id);
          };
         /**
      	 * Delete contrcat period 
      	 * */
        scope.deleteContract = function (id){
        	scope.contractId=id;
        	$uibModal.open({
 	                templateUrl: 'contract.html',
 	                controller: approve,
 	                resolve:{}
 	        });
         };
         
     	function  approve($scope, $uibModalInstance) {
     		$scope.approve = function () {
             	resourceFactory.contractResource.remove({subscriptionId: scope.contractId} , {} , function() {
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
  mifosX.ng.application.controller('ContractController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$uibModal',
     '$route',
     mifosX.controllers.ContractController]).run(function($log) {
    $log.info("ContractController initialized");
  });
}(mifosX.controllers || {}));
