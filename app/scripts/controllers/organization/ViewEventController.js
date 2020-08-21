(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventController: function(scope, routeParams , location, resourceFactory, PermissionService, $uibModal) {		
        scope.event = [];
        scope.status = [];
        scope.PermissionService = PermissionService;
        resourceFactory.eventEditResource.get({eventId: routeParams.id} , function(data) {
            scope.event = data;
            scope.status = data.statusData;
        });
          
          /**
         	 * Delete Event
         	 * */
           scope.deleteEvent = function (){
           
        	   $uibModal.open({
    	                templateUrl: 'deletePopupForEvent.html',
    	                controller: approve,
    	                resolve:{}
    	        });
           };
            
        	function  approve($scope, $uibModalInstance) {
        		$scope.approve = function () {
                	resourceFactory.eventEditResource.remove({eventId: routeParams.id} , {} , function(data) {
                		location.path('/event');
                	});
                	$uibModalInstance.dismiss('delete');
        		};
              $scope.cancel = function () {
            	  $uibModalInstance.dismiss('cancel');
              };
          }
    
    }
  });
  mifosX.ng.application.controller('ViewEventController', [
      '$scope', 
      '$routeParams', 
      '$location',
      'ResourceFactory',
      'PermissionService',
      '$uibModal',
      mifosX.controllers.ViewEventController
      ]).run(function($log) {
    	  $log.info("ViewEventController initialized");
  });
}(mifosX.controllers || {}));