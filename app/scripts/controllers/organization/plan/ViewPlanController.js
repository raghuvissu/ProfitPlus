(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewPlanController: function(scope, routeParams , location,resourceFactory,$uibModal,PermissionService) {
			scope.plan = [];
	        scope.billRuleDatas = [];
	        scope.PermissionService = PermissionService;
	        
	        resourceFactory.planResource.get({planId: routeParams.id} , function(data) {

	            scope.plan = data;
	            scope.billRuleDatas = data.billRuleDatas;
	            
	            for(var i in scope.billRuleDatas){
	            	if(scope.billRuleDatas[i].id == scope.plan.billRule){
	            		scope.plan.billRule=scope.billRuleDatas[i].billruleOptions;
	            	}
	            }
	          	        
	        });
	        
	        scope.deleteplan=function(){
	        	$uibModal.open({
	                templateUrl: 'approve.html',
	                controller: Approve,
	                resolve:{}
	            });
	        };
	        function Approve($scope, $uibModalInstance) {

	            $scope.approve = function () {
	                scope.approveData = {};
	                resourceFactory.planResource.remove({planId:routeParams.id},{},function(){
	                    location.path('/plans');
	                });
	                $uibModalInstance.close('delete');
	            };
	            $scope.cancel = function () {
	            	$uibModalInstance.dismiss('cancel');
	            }	
	        };
	        
		}
	});
	
	 mifosX.ng.application.controller('ViewPlanController', [
	        '$scope', 
            '$routeParams',                                                 
            '$location',
            'ResourceFactory',
            '$uibModal',
            'PermissionService',
    mifosX.controllers.ViewPlanController]).run(function($log) {
     $log.info("ViewPlanController initialized");
    });
}(mifosX.controllers || {}));