(function(module) {
  mifosX.controllers = _.extend(module, {
	  CatalogeMappingController: function(scope, resourceFactory,location,$uibModal,route,paginatorService,webStorage) {
		  scope.salescataloges = [];
		  scope.usercataloges = [];
		  
		  var callingTab = webStorage.get('callingTab',null);
	        if(callingTab === null){
	        	callingTab="";
	        }else{
		  		  scope.displayTab=callingTab.someString;
			 		 
				  if(scope.displayTab == "salescataloge"){
					  scope.salescatalogeTab =  true;
					  webStorage.remove('callingTab');
				  }else if(scope.displayTab == "usercataloge"){ 
					  scope.usercatalogeTab =  true;
					  webStorage.remove('callingTab');
				  }else{
					  webStorage.remove('callingTab');
			       }
	        }
	        
	        scope.routeTo = function(id){
	            location.path('/viewsalescataloge/'+ id);
	        };
	        
	        scope.routeToUserCataloge = function(userId){
	            location.path('/viewusercataloge/'+ userId);
	        };
	        
	        scope.salescatalogeFetchFunction = function(offset, limit, callback) {
	        	  resourceFactory.salescatalogeResource.get({offset: offset, limit: limit} , callback);
	  		};
	        
	        scope.usercatalogeFetchFunction = function(offset, limit, callback) {
	        	  resourceFactory.usercatalogeResource.get({offset: offset, limit: limit} , callback);
	  	    };
	        
	        scope.salescataloges = paginatorService.paginate(scope.salescatalogeFetchFunction, 19);
	        
	        scope.usercataloges = paginatorService.paginate(scope.usercatalogeFetchFunction, 19);
	         
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
		   }
	  
	  }
  });
  mifosX.ng.application.controller('CatalogeMappingController', [
           '$scope', 
           'ResourceFactory',
           '$location',
           '$uibModal',
           '$route',
           'PaginatorService',
           'webStorage',
      mifosX.controllers.CatalogeMappingController]).run(function($log) {
    	  $log.info("CatalogeMappingController initialized");
      });
}(mifosX.controllers || {}));