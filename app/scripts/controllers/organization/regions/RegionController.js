(function(module) {
	mifosX.controllers = _.extend(module, {
		RegionController : function(scope, resourceFactory, location, $uibModal, route) {
			scope.regions = [];
			//scope.PermissionService = PermissionService;
			resourceFactory.regionResource.getRegion(function(data) {
				scope.regions = data;
			});

			scope.deleteRegion = function(id) {
				scope.regionId = id;
				$uibModal.open({
					templateUrl : 'deleteregion.html',
					controller : RegionDeleteCtrl
				});
			};

			var RegionDeleteCtrl = function($scope, $uibModalInstance) {

				$scope.regionDelete = function() {
					resourceFactory.regionResource.remove({ regionId : scope.regionId }, {}, function(data) {
						route.reload();
					});
					$uibModalInstance.close('delete');
				};

				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};

			scope.routeTo = function(id) {
				location.path('/viewregions/' + id);
			};
		}
	});
	mifosX.ng.application.controller('RegionController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$uibModal', 
	'$route', 
	mifosX.controllers.RegionController ]).run(
		function($log) {
			$log.info("RegionController initialized");
		});
}(mifosX.controllers || {}));
