(function(module) {
	mifosX.controllers = _.extend(module, {		
		CodeController : function(scope, resourceFactory, paginatorService, location, PermissionService, $uibModal, route) {			
			scope.codes = [];
			scope.PermissionService = PermissionService;

			scope.codesFetchFunction = function(offset, limit, callback) {
				resourceFactory.codeResources.getData({ offset : offset, limit : limit }, callback);
			};
			
			resourceFactory.codeResources.getAllCodes(function(data) {
				scope.codes = data.pageItems;
			});

			/*if (PermissionService.showMenu('READ_CODE')) {
				resourceFactory.codeResources.getAllCodes(function(data) {
					scope.codes = data.pageItems;
				});
			}*/
			
			scope.delCode = function (id){
				scope.codeId = id;
				$uibModal.open({
                    templateUrl: 'deletecode.html',
                    controller: CodeDeleteCtrl
                });
            };
            
            var CodeDeleteCtrl = function ($scope, $uibModalInstance) {
            	
                $scope.deleteCode = function () {
                    resourceFactory.codeResources.remove({codeId: scope.codeId},{},function(data){
                    	route.reload();
                    });
                    $uibModalInstance.close('delete');
                };
                
                $scope.cancel = function () {
                	$uibModalInstance.dismiss('cancel');
                };
            };

			scope.routeTo = function(id) {
				//if (PermissionService.showMenu('READ_CODEVALUE'))
					location.path('/viewcode/' + id);
			};
		}
	});
	
	mifosX.ng.application.controller('CodeController', [ 
	'$scope', 
	'ResourceFactory', 
	'PaginatorService', 
	'$location',
	'PermissionService', 
	'$uibModal',
	'$route',
	mifosX.controllers.CodeController 
	]).run(function($log) {
		$log.info("CodeController initialized");		
	});
}(mifosX.controllers || {}));
