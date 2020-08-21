(function(module) {
  mifosX.controllers = _.extend(module, {
	  SalesCatalogeController: function(scope, resourceFactory,location,$uibModal,route,paginatorService) {
		  
		  scope.salescataloges = [];
		  
		  scope.salescatalogeFetchFunction = function(offset, limit, callback) {
        	  resourceFactory.salescatalogeResource.get({offset: offset, limit: limit} , callback);
  		  };
  		  
  		 scope.salescataloges = paginatorService.paginate(scope.salescatalogeFetchFunction, 19);
  		 
  		scope.routeTo = function(id){
            location.path('/viewsalescataloge/'+ id);
         };
        
         scope.deletesalescataloge=function(salescatalogeId){
       	  scope.salescatalogeId=salescatalogeId;
       	  $uibModal.open({
                 templateUrl: 'deletesalescataloge.html',
                 controller: SalesCatalogeDelete,
                 resolve:{}
             });
         };
         
         function SalesCatalogeDelete($scope,$uibModalInstance){
				$scope.approve = function () {
					resourceFactory.salescatalogeResource.remove({salescatalogeId: scope.salescatalogeId}, {} ,function (){
						route.reload();
					});
					$uibModalInstance.dismiss('delete');
				};
				$scope.cancel = function (){
					$uibModalInstance.dismiss('cancel');
				};
			}
         /*scope.deletesalescataloge = function (salescatalogeId){
	    	  scope.salescatalogeId = serviceId;
	    	  $uibModal.open({
				 templateUrl: 'deletesalescataloge.html',
				 controller: deleteSalesCatalogeController,
				 resolve:{}
			 });
	       };
	       function deleteSalesCatalogeController($scope, $uibModalInstance) {
		   	  	
		     	  $scope.approveDeleteSalesCataloge = function () {
		     		  
		     		  resourceFactory.salescatalogeResource.remove({salescatalogeId: scope.salescatalogeId} , {} , function() {
		     			 $uibModalInstance.close('delete');
	        			  route.reload();
		             });
		           };
		           $scope.cancel = function () {
		        	   $uibModalInstance.dismiss('cancel');
		           };
		       };*/
    }
  });
  mifosX.ng.application.controller('SalesCatalogeController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$uibModal',
     '$route', 
     'PaginatorService',
     mifosX.controllers.SalesCatalogeController]).run(function($log) {
    $log.info("SalesCatalogeController initialized");
  });
}(mifosX.controllers || {}));
