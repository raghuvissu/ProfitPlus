(function(module) {
	mifosX.controllers = _.extend(module,{
		EventActionController : function(scope, $uibModal, location, resourceFactory, paginatorService, PermissionService) {
			
				scope.PermissionService = PermissionService;
				scope.eventactionDatas = [];
				scope.formData = {};
				
				// for GET
				
				scope.eventActionAllData = function(offset, limit, callback) {
					resourceFactory.eventActionResource.get({offset: offset, limit: limit} , callback);
				};
				scope.eventactionDatas = paginatorService.paginate(scope.eventActionAllData, 14);
				
				
				scope.formData.source = 'all';
				scope.eventActionAllData = function(offset, limit, callback) {
					if (scope.formData.statusType == 'all') {
						resourceFactory.eventActionResource.get({offset : offset, limit : limit}, callback);
					} else {					
						resourceFactory.eventActionResource.get({offset : offset, statusType : scope.formData.statusType, 
							limit : limit}, callback);		
					}			
				};
				
				scope.eventActionSearchData = function(offset, limit, callback) {
					if (scope.formData.statusType == 'all') {
						resourceFactory.eventActionResource.get({offset : offset, limit : limit, sqlSearch : scope.filterText}, callback);
					} else {					
						resourceFactory.eventActionResource.get({offset : offset, statusType : scope.formData.statusType,  
							sqlSearch : scope.filterText, limit : limit}, callback);		
					}			
				};
		
				scope.getEventAction = function() {	
					scope.formData.statusType = 'all';
					scope.eventactionDatas = paginatorService.paginate(scope.eventActionAllData, 14);			
				};
			
				scope.getEventActionForProcessed = function() {	
					scope.formData.statusType = 'Y';
					scope.eventactionDatas = paginatorService.paginate(scope.eventActionAllData, 14);				
				};
				
				scope.getEventActionForUnProcessed = function() {	
					scope.formData.statusType = 'N';
					scope.eventactionDatas = paginatorService.paginate(scope.eventActionAllData, 14);				
				};
				
				scope.getEventActionForCanceled = function(){
					scope.formData.statusType = 'C';
					scope.eventactionDatas = paginatorService.paginate(scope.eventActionAllData, 14);	
				};
				
				scope.getEventActionForFailed = function(){
					scope.formData.statusType = 'F';
					scope.eventactionDatas = paginatorService.paginate(scope.eventActionAllData, 14);	
				};
				
				scope.searchEventActions = function(filterText,statusType) {
					scope.formData.statusType = statusType;
					scope.eventactionDatas = paginatorService.paginate(scope.eventActionSearchData, 14);				
				};
				
				//change source
				
				scope.changeSource = function(source) {				
					scope.eventactionDatas = paginatorService.paginate(scope.changeSourceData, 14);				
				};
							
				scope.changeSourceData = function(offset, limit, callback) {	
					if (scope.formData.source == 'all') {
						resourceFactory.eventActionResource.get({ offset : offset, limit : limit}, callback);						
					} else {		
						resourceFactory.eventActionResource.get({ offset : offset, limit : limit, 
							source : scope.formData.source}, callback);					
					}			
				};
				
				
				
				
				
				/* eventAction  data*/
			       scope.getEventActionMappingData=function(){
			        	
			        	resourceFactory.EventActionMappingResource.query(function(data) {
			           	 scope.datas=data; 
			           });
			         };
			         
			         scope.isDeletedEventAction=function(id,value){
			       	  
			       	     resourceFactory.EventActionMappingResource.remove({id: id} , {} , function() {
			                    location.path('/eventaction');
			                    scope.getEventActionMappingData();
			           });
			         };
				
			/****   message pop up start   ****/ 
				
			      scope.messagePopup = function(json){
			    	  scope.jsonData = json;
			    	  $uibModal.open({
			              templateUrl: 'message.html',
			              controller: MessageController,
			              resolve:{}
			          });	
			      };
			      
			      var MessageController = function($scope,$uibModalInstance){
			    	  
			    	  $scope.message = {};
			    	  $scope.messageData = [];
			    	  
			    	  for (var i in scope.jsonData){	
			    		 if(scope.jsonData){
			    			 var obj  = JSON.parse(scope.jsonData);
			    			 $scope.message = obj;
			    	    	  for (var key in $scope.message) {
			    	    			  $scope.messageData.push({
			    	    			  						"key" : key,
			    	    			  						"value" : $scope.message[key],
			    	    			  });	
			    	    	  };
			   	    		break;
			    		 };
			    	  }
			    	  
					  $scope.cancel = function(){
						  $uibModalInstance.dismiss('cancel');
					  };
			      };
			/**** message pop up end ****/ 
										
			}					
	});
	
	mifosX.ng.application.controller('EventActionController', [ 
	'$scope',
	'$uibModal', 
	'$location', 
	'ResourceFactory', 
	'PaginatorService', 
	'PermissionService', 
	mifosX.controllers.EventActionController 
	]).run(function($log) {						
		$log.info("EventActionController initialized");					
	});
}(mifosX.controllers || {}));
