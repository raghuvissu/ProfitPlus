(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServicesController: function(scope, resourceFactory,location,$uibModal,route,$rootScope,paginatorService) {
        
          scope.services = [];
         // scope.PermissionService = PermissionService; 
          
          scope.serviceFetchFunction = function(offset, limit, callback) {
        	  resourceFactory.serviceResource.get({offset: offset, limit: limit} , callback);
  		  };
  		  scope.services = paginatorService.paginate(scope.serviceFetchFunction, 19);
          /*resourceFactory.serviceResource.query(function(data){
              scope.services = data;
          });*/
          scope.routeTo = function(id){
              location.path('/viewservice/'+ id);
           };
           
	      scope.deleteservice = function (serviceId){
	    	  scope.serviceId = serviceId;
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
        			  route.reload();
	             });
	           };
	           $scope.cancel = function () {
	        	   $uibModalInstance.dismiss('cancel');
	           };
	       };
	            
     }
  });
  mifosX.ng.application.controller('ServicesController', [
                                                          '$scope',
                                                          'ResourceFactory',
                                                          '$location',
                                                          '$uibModal',
                                                          '$route',
                                                          '$rootScope',
                                                          'PaginatorService',
                                                          mifosX.controllers.ServicesController]).run(function($log) {
    $log.info("ServicesController initialized");
  });
}(mifosX.controllers || {}));
