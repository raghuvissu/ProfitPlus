(function(module) {
	  mifosX.controllers = _.extend(module, {
	    MoveMrnController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,$rootScope) {
	    	 scope.mrnIds = [];
	    	 scope.first = {};
	    	 scope.first.date = new Date();
	        resourceFactory.moveMrnResource.get(function(data) {
	        	scope.mrnIds = data.mrnIds;
	        	scope.formData = data;
	        	scope.itemIds=data.itemsaleIds;
	        });
	        
	        
	        scope.getSerialNumbers = function(itemId){
	        	 resourceFactory.moveMrnResource.get({mrnId: itemId},function(data) {
	        		 scope.serialNumbers = data.serialNumber;
	 	        });
	        };
	        scope.getSerialNumbersForItems = function(saleId){
	        	 resourceFactory.moveMrnResource.get({itemsaleId: saleId},function(data) {
	        		 scope.serialNumbers1 = data.serialNumber;
	 	        });
	        };
	        scope.getBoth =function(mrnId,description){
	        	return mrnId+"--"+description;
	        };
	        
	        scope.reset123 = function(){
		    	   webStorage.add("callingTab", {someString: "mrn" });
		       };
		       scope.mrnSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
		        	delete scope.formData.mrnIds;
		        	delete scope.formData.itemsaleIds;
		        	//delete this.formData.type;
		        	delete this.formData.itemId;
		        	scope.formData.movedDate = reqDate;
		        	resourceFactory.moveMrnSaveResource.save(this.formData,function(data){
		        		/*location.path('/viewmovemrn/'+data.resourceId);*/
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/inventory');
		          });
		        	
		        };
		        
		    	scope.saleSubmit = function() {        	
		        	scope.formData.locale = scope.optlang.code;
		        	scope.type=this.formData.type;
		        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
		        	delete scope.formData.mrnIds;
		        	delete scope.formData.itemsaleIds;
		        	//delete this.formData.type;
		        	delete this.formData.mrnId;
		        	scope.formData.movedDate = reqDate;
		        	resourceFactory.moveItemSaleSaveResource.save(this.formData,function(data){
		        		/*location.path('/viewmovemrn/'+data.resourceId);*/
		        		if(PermissionService.showMenu('READ_MRN'))
		        			location.path('/viewmovedmrn/'+data.resourceId);
		        		else
		        			location.path('/inventory');
		          });
		        	
		    	};
	    }
	  });
	  mifosX.ng.application.controller('MoveMrnController', ['$scope','webStorage', 'ResourceFactory','$location','dateFilter','PermissionService','$rootScope', mifosX.controllers.MoveMrnController]).run(function($log) {
	    $log.info("MoveMrnController initialized");
	  });
	}(mifosX.controllers || {}));
