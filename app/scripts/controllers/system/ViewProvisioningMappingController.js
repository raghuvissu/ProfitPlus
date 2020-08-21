(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewProvisioningMappingController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService,$uibModal,webStorage) {
		  
		  scope.provisiongdata = {}; 
		  scope.commandParameters  = [];
	        scope.PermissionService =  PermissionService;
	        resourceFactory.provisioningMappingResource.get({provisioningId: routeParams.id} , function(data) {
	            scope.provisiongdata = data;
	            scope.commandParameters = data.commandParameters;
	        });     
	        
	        scope.deleteProvisioning = function (){
	          	 $uibModal.open({
	  	                templateUrl: 'provision.html',
	  	                controller: approve,
	  	                resolve:{}
	  	        });
	          };
	          
	      	function  approve($scope, $uibModalInstance) {
	      		$scope.approve = function () {
	      			 resourceFactory.provisioningMappingResource.remove({provisioningId: routeParams.id} , {} , function() {
	      				webStorage.add("callingTab", {someString: "provisioningCommandTab" }); 
	      				location.path('/mappingconfig'); 
	              });
	              	 $uibModalInstance.dismiss('delete');
	           };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	            };
	          }   
		  
	   }
  });
  mifosX.ng.application.controller('ViewProvisioningMappingController', [
         '$scope', 
         '$routeParams', 
         '$route', 
         '$location', 
         'ResourceFactory', 
         '$http',
         'PermissionService', 
         '$uibModal',
         'webStorage',
   mifosX.controllers.ViewProvisioningMappingController]).run(function($log) {
         $log.info("ViewProvisioningMappingController initialized");
   });
}(mifosX.controllers || {}));