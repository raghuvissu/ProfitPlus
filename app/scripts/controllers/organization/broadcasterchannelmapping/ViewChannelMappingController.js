(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewChannelMappingController: function(scope, routeParams , location,resourceFactory ,PermissionService,$uibModal,webStorage) {
			
			scope.channelMapping = [];
			scope.PermissionService = PermissionService;
			
			scope.gobroadcasterchannelmapping = function(){
	        	webStorage.add("callingTab", {someString: "channelmapping"});
	        };
	        resourceFactory.channelMappingResource.get({channelmappingId: routeParams.id} , function(data) {
	            scope.channelMapping = data;
	        });
	        scope.deleteChannelMapping = function(id) {
	        	console.log("hi");
	        	scope.channelmappingId=id;
	        	$uibModal.open({
	        		templateUrl: 'ChannelMapping.html',
	        		controller:channelMappingDelete,
	        		resolve:{}
	        	});
	        };

	        function channelMappingDelete($scope,$uibModalInstance) {
	        	$scope.approve = function (){
	        		resourceFactory.channelMappingResource.remove({channelmappingId:routeParams.id}, {} ,function(){
	        			location.path('/broadcasterchannelmapping');
	        			webStorage.add("callingTab", {someString: "channelmapping"});
	        		});
	        		$uibModalInstance.dismiss('delete');
	        	};
	        	$scope.cancel = function (){
	        		
	        		$uibModalInstance.dismiss('cancel');
	        	};
	        }      
		}
	});
	mifosX.ng.application.controller('ViewChannelMappingController', [
	  '$scope', 
	  '$routeParams', 
	  '$location',
	  'ResourceFactory',
	  'PermissionService',
	  '$uibModal',
	  'webStorage',
   mifosX.controllers.ViewChannelMappingController]).run(function($log) {
	  $log.info("ViewChannelMappingController initialized");
   });	
}(mifosX.controllers || {}));