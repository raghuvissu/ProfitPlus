(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewCurrencyDetailsController: function(scope, routeParams , route, location, resourceFactory,PermissionService, $uibModal) {
		
        scope.viewcurrencydetails=[];
        scope.PermissionService = PermissionService;
        
        resourceFactory.currencyResource.get({id: routeParams.id} , function(data) {
            scope.viewcurrencydetails = data; 
            
        });
        
        /**
    	 * Delete currency details 
    	 * */
      scope.deleteCurrency = function (){
    	  $uibModal.open({
	                templateUrl: 'deleteCurrency.html',
	                controller: approve,
	                resolve:{}
	        });
       };
       
   	function  approve($scope, $uibModalInstance) {
   		$scope.approve = function () {
   			resourceFactory.currencyResource.remove({id: routeParams.id} , {} , function(data) {
   			 location.path('/currencydetails');
           });
   			$uibModalInstance.dismiss('delete');
        };
           $scope.cancel = function () {
        	   $uibModalInstance.dismiss('cancel');
         };
       }     
    }
  });
  mifosX.ng.application.controller('ViewCurrencyDetailsController', [
   '$scope', 
   '$routeParams', 
   '$route', 
   '$location', 
   'ResourceFactory', 
   'PermissionService',
   '$uibModal',
   mifosX.controllers.ViewCurrencyDetailsController]).run(function($log) {
    $log.info("ViewCurrencyDetailsController initialized");
  });
}(mifosX.controllers || {}));