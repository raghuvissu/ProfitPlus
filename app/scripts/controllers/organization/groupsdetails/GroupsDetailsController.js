(function(module) {
  mifosX.controllers = _.extend(module, {
	  GroupsDetailsController: function(scope, resourceFactory,$uibModal,route,PaginatorService,location) {
		scope.groupsDetails  = [];
		
		scope.getSearchDetails = function(offset, limit, callback) {
	    	  resourceFactory.groupsDetailsResource.get({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchDetails = function(filterText) {
	  			scope.groupsDetails = PaginatorService.paginate(scope.getSearchDetails, 14);
	  		};
	  		scope.routeTo = function(name){
	             //location.path('/viewgroupdetails/'+ name);
	        };
		
		scope.groupsDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.groupsDetailsResource.get({offset: offset, limit: limit} , callback);
		};
		
		scope.groupsDetails =PaginatorService.paginate(scope.groupsDetailsFetchFunction, 14);
		
		scope.addProvision = function(id,name,attr1,attr2,attr3,attr4){
			var provisionData = {};
			provisionData.groupName = name;
			provisionData.attribute1 = attr1;
			provisionData.attribute2 = attr2;
			provisionData.attribute3 = attr3;
			provisionData.attribute4 = attr4;
			resourceFactory.groupsDetailsProvisionResource.save({groupId:id},provisionData,function(data){
   			   route.reload();
   	         });
		};
		
		scope.addGroup = function(){
        	
			$uibModal.open({
	                templateUrl : 'addGroupDetails.html',
	                controller : addGroupDetailsController,
	                resolve : {}
	            });
	        };
	        
	        function  addGroupDetailsController($scope, $uibModalInstance) {
	        	$scope.formData = {};
	        	  $scope.submit = function () {
	        		 resourceFactory.groupsDetailsResource.save($scope.formData,function(data){
	        			 $uibModalInstance.close('delete');
	        			 route.reload();
	        	        });
	              };
	              $scope.cancel = function () {
	            	  $uibModalInstance.dismiss('cancel');
	              };
	          };
		  
	  }
  });
  mifosX.ng.application.controller('GroupsDetailsController', [
	   '$scope', 
	   'ResourceFactory',
	   '$uibModal',
	   '$route',
	   'PaginatorService',
	   '$location',
 mifosX.controllers.GroupsDetailsController]).run(function($log) {
	   $log.info("GroupsDetailsController initialized");
 });
}(mifosX.controllers || {}));