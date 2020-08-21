(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewDiscountsController: function(scope, routeParams, location, resourceFactory, PermissionService, $uibModal) {
	
        scope.discounting = [];   
        scope.PermissionService =  PermissionService; 
        
        resourceFactory.discountsResource.getDiscountDetails({discountId: routeParams.id} , function(data) {
            scope.discounting = data; 
            scope.discountDetailDatas=data.discountDetailDatas;
        });
        scope.deletemessage = function (){
            resourceFactory.discountResource.remove({discountId: routeParams.id} , {} , function(data) {
                  location.path('/discounts');
                  // added dummy request param because Content-Type header
					// gets removed
                  // if the request does not contain any data (a request body)
            });
         };
         
         /**
	      * Delete Discount
	      **/
	     scope.deleteDiscount = function (){
	    	 $uibModal.open({
	    		 templateUrl: 'deletePopupForDiscount.html',
	  	         controller: approve,
	  	         resolve:{}
	  	     });
	     };
	          
	     function  approve($scope, $uibModalInstance) {
	    	 $scope.approve = function () {
	    		 resourceFactory.discountResource.remove({discountId: routeParams.id} , {} , function() {
	    			 location.path('/discounts');
	             });
	             $uibModalInstance.dismiss('delete');
	      	 };
	         $scope.cancel = function () {
	        	 $uibModalInstance.dismiss('cancel');
	         };
	     }
	     
      }
  });
  mifosX.ng.application.controller('ViewDiscountsController', [
     '$scope',
     '$routeParams', 
     '$location',
     'ResourceFactory',
     'PermissionService',
     '$uibModal',
     mifosX.controllers.ViewDiscountsController
     ]).run(function($log) {
    	 $log.info("ViewDiscountsController initialized");
     });
}(mifosX.controllers || {}));