(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewSalesCatalogeController: function(scope, routeParams , location,resourceFactory,$uibModal,PermissionService) {
			scope.salescataloge = [];
	        scope.PermissionService = PermissionService;
	        
	        resourceFactory.salescatalogeResource.get({salescatalogeId: routeParams.id} , function(data) {
	            scope.selectedPlans = data.selectedPlans;
	            scope.salesCatalogeData = data.salesCatalogeData;
	                   
	        });
	        scope.deletesalescataloge=function(){
	        	$uibModal.open({
	                templateUrl: 'approve.html',
	                controller: Approve,
	                resolve:{}
	            });
	        };
	        
	        function Approve($scope, $uibModalInstance) {

	            $scope.approve = function () {
	                scope.approveData = {};
	                resourceFactory.salescatalogeResource.remove({salescatalogeId:routeParams.id},{},function(){
	                    location.path('/salescataloges');
	                });
	                $uibModalInstance.close('delete');
	            };
	            $scope.cancel = function () {
	            	$uibModalInstance.dismiss('cancel');
	            }	
	        };
		
		 }
    });
	mifosX.ng.application.controller('ViewSalesCatalogeController', [
        '$scope', 
        '$routeParams',                                                 
        '$location',
        'ResourceFactory',
        '$uibModal',
        'PermissionService',
    mifosX.controllers.ViewSalesCatalogeController]).run(function($log) {
    $log.info("ViewSalesCatalogeController initialized");
	});
}(mifosX.controllers || {}));