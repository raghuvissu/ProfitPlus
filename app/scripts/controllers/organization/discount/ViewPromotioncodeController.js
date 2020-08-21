(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPromotioncodeController: function(scope, routeParams , location, resourceFactory, webStorage, $uibModal, PermissionService) {
		 
        scope.promotiondata = {};   
        scope.PermissionService =  PermissionService;
        resourceFactory.promotionResource.getPrmotioncodeDetails({promotioncodeId: routeParams.id} , function(data) {
            scope.promotiondata = data;                                                
        });

        scope.promotionTab=function(){
        	 webStorage.add("callingTab", {someString: "Promotioncode"});
        };
        
      scope.deletePromotion = function (){
    	    $uibModal.open({
    		  	templateUrl: 'approve.html',
              	controller: Approve,
              	resolve:{}
          	});
      };
      function Approve($scope, $uibModalInstance) {
    	  $scope.approve = function (act) {
    		  scope.approveData = {};
              resourceFactory.promotionResource.remove({promotioncodeId: routeParams.id} , {} , function(data) {
            	  webStorage.add("callingTab", {someString: "Promotioncode" });
                  location.path('/discounts');
              });
              $uibModalInstance.close('delete');
          };
          $scope.cancel = function () {
        	  $uibModalInstance.dismiss('cancel');
          };
      };
      
   }
    
  });
  mifosX.ng.application.controller('ViewPromotioncodeController', [
      '$scope', 
      '$routeParams', 
      '$location', 
      'ResourceFactory',
      'webStorage',
      '$uibModal',
      'PermissionService',
  mifosX.controllers.ViewPromotioncodeController ]).run(function($log) {
      $log.info("ViewPromotioncodeController initialized");
  });
}(mifosX.controllers || {}));