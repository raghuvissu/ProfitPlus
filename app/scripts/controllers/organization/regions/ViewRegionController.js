(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewRegionController : function(scope, routeParams, location,
				resourceFactory, $uibModal, route) {
			scope.region = [];
			//scope.PermissionService = PermissionService;
			resourceFactory.regionResource.get({ regionId : routeParams.id }, function(data) {
				scope.region = data;
			});

			scope.deleteRegion = function() {
				$uibModal.open({
					templateUrl : 'deleteregion.html',
					controller : RegionDeleteCtrl
				});
			};

			var RegionDeleteCtrl = function($scope, $uibModalInstance) {

				$scope.regionDelete = function() {
					resourceFactory.regionResource.remove({ regionId : routeParams.id }, {}, function(data) {
					//	route.reload();
						location.path('/regions');				
					});
					$uibModalInstance.close('delete');
				};

				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};

		}
	});
	mifosX.ng.application.controller('ViewRegionController', [ 
	'$scope', 
	'$routeParams', 
	'$location', 
	'ResourceFactory',
	'$uibModal', 
	'$route',
	mifosX.controllers.ViewRegionController ]).run(
			function($log) {
				$log.info("ViewRegionController initialized");
			});

}(mifosX.controllers || {}));