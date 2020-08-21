(function(module) {
  mifosX.controllers = _.extend(module, {
	  UserCatalogeController: function(scope, resourceFactory,location,$uibModal,route,paginatorService) {
		  scope.usercataloges = [];
		  
		  scope.usercatalogeFetchFunction = function(offset, limit, callback) {
        	  resourceFactory.usercatalogeResource.get({offset: offset, limit: limit} , callback);
  		  };
  		  
  		scope.usercataloges = paginatorService.paginate(scope.usercatalogeFetchFunction, 19);
  		
  		scope.routeTo = function(id){
            location.path('/viewusercataloge/'+ id);
         };
         
         scope.deleteusercataloge = function (usercatalogeId){
	    	  scope.usercatalogeId = usercatalogeId;
	    	  $uibModal.open({
				 templateUrl: 'deleteusercataloge.html',
				 controller: deleteUserCatalogeController,
				 resolve:{}
			 });
	     };
	     
	     function deleteUserCatalogeController($scope, $uibModalInstance) {
		   	  	
	     	  $scope.approveDeleteUserCataloge = function () {
	     		  
	     		  resourceFactory.usercatalogeResource.remove({usercatalogeId: scope.usercatalogeId} , {} , function() {
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
  mifosX.ng.application.controller('UserCatalogeController', [
      '$scope', 
      'ResourceFactory',
      '$location',
      '$uibModal',
      '$route',
      'PaginatorService',
  mifosX.controllers.UserCatalogeController]).run(function($log) {
  $log.info("UserCatalogeController initialized");
  });
}(mifosX.controllers || {}));