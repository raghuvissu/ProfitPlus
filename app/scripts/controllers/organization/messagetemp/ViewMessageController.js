(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMessageController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService, $uibModal) {
        scope.messaging = [];
        scope.PermissionService = PermissionService;
        
        resourceFactory.messageSaveResource.get({messageId: routeParams.id} , function(data) {
            scope.messaging = data;                                                
        });
        
        /**
         * Delete message template 
        * */
       scope.deletemessage = function (){
    	   $uibModal.open({
  	                templateUrl: 'messagetemplate.html',
  	                controller: messagetemplate,
  	                resolve:{}
  	        });
          };
          
      	function  messagetemplate($scope, $uibModalInstance) {
      		$scope.messagetemplate = function () {
      			resourceFactory.messageSaveResource.remove({messageId: routeParams.id} , {} , function() {
      				 location.path('/message');      
              });
      			$uibModalInstance.dismiss('delete');
           };
            $scope.cancel = function () {
            	$uibModalInstance.dismiss('cancel');
            };
          }                          
    }
  });
  mifosX.ng.application.controller('ViewMessageController', [
     '$scope', 
     '$routeParams', 
     '$route', 
     '$location', 
     'ResourceFactory', 
     '$http',
     'PermissionService',
     '$uibModal',
     mifosX.controllers.ViewMessageController]).run(function($log) {
    $log.info("ViewMessageController initialized");
  });
}(mifosX.controllers || {}));
