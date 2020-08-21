(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewCodeController : function(scope, routeParams, resourceFactory, location, $uibModal, PermissionService) {
			scope.codevalues = [];
			scope.PermissionService = PermissionService;
			
			resourceFactory.codeResources.get({codeId : routeParams.id}, function(data) {
				scope.code = data;
			});
			
			resourceFactory.codeValueResource.getAllCodeValues({codeId : routeParams.id}, function(data) {
				scope.codevalues = data;
			});
			
			scope.delCode = function() {
				$uibModal.open({
					templateUrl : 'deletecode.html',
					controller : CodeDeleteCtrl
				});
			};
			
			var CodeDeleteCtrl = function($scope, $uibModalInstance) {

				$scope.deleteCode = function() {
					resourceFactory.codeResources.remove({codeId : routeParams.id }, {}, function(data) {
						location.path('/codes');
					});
					
					$uibModalInstance.close('delete');
				};

				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};

		}
	});
	mifosX.ng.application.controller('ViewCodeController', [ 
	'$scope', 
	'$routeParams', 
	'ResourceFactory', 
	'$location',
	'$uibModal', 
	'PermissionService',
	mifosX.controllers.ViewCodeController 
	]).run(function($log) {		
		$log.info("ViewCodeController initialized");		
	});
}(mifosX.controllers || {}));
