(function(module) {
  mifosX.controllers = _.extend(module, {
	  EventController: function(scope, resourceFactory, location, PermissionService, route, $uibModal) {
        scope.eventss = [];
        scope.PermissionService = PermissionService;
        resourceFactory.eventResource.get(function(data) {      	
            scope.events = data;         
        });
        scope.routeTo = function(id){
        		location.path('/viewEvent/'+ id);
        };
        
        /**
       	 * Delete Event
       	 * */
         scope.deleteEvent = function (id){
         	scope.eventId=id;
         	$uibModal.open({
  	                templateUrl: 'deletePopupForEvent.html',
  	                controller: approve,
  	                resolve:{}
  	        });
         };
          
      	function  approve($scope, $uibModalInstance) {
      		$scope.approve = function () {
              	resourceFactory.eventEditResource.remove({eventId: scope.eventId} , {} , function(data) {
                    route.reload();
              	});
              	$uibModalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
            	$uibModalInstance.dismiss('cancel');
            };
        }
        
    }
  });
  mifosX.ng.application.controller('EventController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$route',
     '$uibModal',
     mifosX.controllers.EventController
     ]).run(function($log) {
    	 $log.info("EventController initialized");
  });
}(mifosX.controllers || {}));