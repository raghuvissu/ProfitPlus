(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewChannelController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal,webStorage) {
		
			scope.channel = [];
	        scope.PermissionService = PermissionService;
	        
	        scope.gobroadcasterchannelmapping = function(){
	        	webStorage.add("callingTab", {someString: "channel"});
	        };
	        resourceFactory.channelResource.get({channelId: routeParams.id} , function(data) {
	            scope.channel = data;
	           
	        });
	        scope.deleteChannel = function(id) {
	        	console.log("hi");
	        	scope.channelId=id;
	        	$uibModal.open({
	        		templateUrl: 'channel.html',
	        		controller:channelDelete,
	        		resolve:{}
	        	});
	        };
	        function channelDelete($scope,$uibModalInstance) {
	        	$scope.approve = function (){
	        		resourceFactory.channelResource.remove({channelId:routeParams.id}, {} ,function(){
	        			location.path('/channel');
	        		});
	        		$uibModalInstance.dismiss('delete');
	        	};
	        	$scope.cancel = function (){
	        		
	        		$uibModalInstance.dismiss('cancel');
	        	};
	        }
	        
		}
	});
	mifosX.ng.application.controller('ViewChannelController', [
	 '$scope', 
	 '$routeParams', 
	 '$location',
	 'ResourceFactory',
	 'PermissionService',
	 '$uibModal',
	 'webStorage',
	mifosX.controllers.ViewChannelController]).run(function($log) {
	 $log.info("ViewChannelController initialized");
	});
}(mifosX.controllers || {}));