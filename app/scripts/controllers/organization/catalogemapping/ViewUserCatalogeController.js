(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewUserCatalogeController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal,webStorage) {
			
			scope.usercataloge = [];
			scope.PermissionService = PermissionService;
			
			resourceFactory.usercatalogeofUserResource.get({userId: routeParams.userId} , function(data) {
				scope.selectedCatalog = data.selectedCatalog;
				scope.userId = data.userId;
	        });
			
			scope.deleteusercataloge = function(id) {
	        	console.log("hi");
	        	scope.usercatalogeId=id;
	        	$uibModal.open({
	        		templateUrl: 'usercataloge.html',
	        		controller:usercatalogeDelete,
	        		resolve:{}
	        	});
	        };
	        
	        function usercatalogeDelete($scope,$uibModalInstance) {
	        	$scope.approve = function (){
	        		resourceFactory.usercatalogeResource.remove({usercatalogeId:routeParams.id}, {} ,function(){
	        			location.path('/usercataloge');
	        			webStorage.add("callingTab", {someString: "usercataloge"});
	        		});
	        		$uibModalInstance.dismiss('delete');
	        	};
	        	$scope.cancel = function (){
	        		
	        		$uibModalInstance.dismiss('cancel');
	        	};
	        } 
	        
		}
	});
	mifosX.ng.application.controller('ViewUserCatalogeController', [
		  '$scope', 
		  '$routeParams', 
		  '$location',
		  'ResourceFactory',
		  'PermissionService',
		  '$uibModal',
		  'webStorage',
	mifosX.controllers.ViewUserCatalogeController]).run(function($log) {
		  $log.info("ViewUserCatalogeController initialized");
	});	
}(mifosX.controllers || {}));