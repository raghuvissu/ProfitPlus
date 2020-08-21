(function(module) {
  mifosX.controllers = _.extend(module, {
	  MessageController: function(scope, resourceFactory,location,PermissionService,$uibModal,route) {
	        scope.message = [];
	        scope.PermissionService = PermissionService;
	        resourceFactory.messageSaveResource.query(function(data) {
	            scope.message = data;
	        });
	        scope.routeTo = function(id){
	            location.path('/viewmessage/'+ id);
	          };
	          
	          /**
	          * Delete message template 
	         * */
	        scope.deletemessage = function (id){
	          	scope.msgId=id;
	           	 $uibModal.open({
	   	                templateUrl: 'messagetemplate.html',
	   	                controller: messagetemplate,
	   	                resolve:{}
	   	        });
	           };
	           
	       	function  messagetemplate($scope, $uibModalInstance) {
	       		$scope.messagetemplate = function () {
	       			resourceFactory.messageSaveResource.remove({messageId: scope.msgId} , {} , function() {
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
  mifosX.ng.application.controller('MessageController', [
    '$scope', 
    'ResourceFactory',
    '$location',
    'PermissionService',
    '$uibModal',
    '$route',
    mifosX.controllers.MessageController]).run(function($log) {
    $log.info("MessageController initialized");
  });
}(mifosX.controllers || {}));