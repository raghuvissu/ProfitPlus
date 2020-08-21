(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateItemDetailsController: function(scope,webStorage, resourceFactory, routeParams, location,$rootScope) {
    	 scope.formData = [];
    	 scope.grnIds = [];
    	 scope.itemDetailsData=[];
    	 scope.inventoryGrnDatas=[];
    	 scope.qualityDatas=[];
    	 scope.statusDatas=[];
    	 scope.pageItems=[];
    	 scope.modelProvisionMappingData=[];
    	 
	        resourceFactory.itemDetailTemplateResource.get({grnId: routeParams.id === undefined ? "":routeParams.id} ,function(data) {
	        	scope.formData = data;
	            scope.inventoryGrnDatas = data.inventoryGrnDatas;
	            scope.qualityDatas=data.qualityDatas;
	            scope.statusDatas=data.statusDatas;
	            scope.pageItems = data.pageItems;
	            scope.modelProvisionMappingData = angular.copy(data.modelProvisionMappingData);
	            
	            for(var i in scope.qualityDatas){
	            	if(scope.qualityDatas[i].mCodeValue=="Good"){
	            		scope.itemDetailsData.quality=scope.qualityDatas[i].mCodeValue;
	            	}
	            }
	        });
        
            scope.changeGrn = function(testId) {
            	scope.formData.isPairing = false;scope.pageItems = [];
            	resourceFactory.grnResource.get({grnId: testId}, function(data) {
            		scope.itemDetailsData = angular.copy(data);
            		resourceFactory.itemDetailTemplateResource.get({grnId: routeParams.id === undefined ? "":routeParams.id} ,function(data) {
        	            for(var i in scope.qualityDatas){
        	            	if(scope.qualityDatas[i].mCodeValue=="Good"){
        	            		scope.itemDetailsData.quality=scope.qualityDatas[i].mCodeValue;
        	            	}
        	            }
        	        });
            	});
            };
        
          scope.isPairedChecked = function(){
        	  scope.pageItems = [];
        	  if(scope.formData.isPairing)
        		  resourceFactory.itemDropdownResource.query({}, function(data) {
        			  scope.pageItems = angular.copy(data);
        			  for(var i in scope.pageItems){
        				  if(scope.pageItems[i].id == scope.itemDetailsData.itemMasterId){
        					  scope.pageItems.splice(i,1);break;
        					}
        			  }
        		  });
          };
        
          scope.getBoth =function(mrnId,description){
	        	return mrnId+"--"+description;
	       };
            
	       scope.getBothItem = function(itemCode, itemDescription){
	        	return itemCode+"--"+itemDescription;
	        };
	        
	       scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "itemDetails" });
	       };
	       
	       scope.submit = function() {
        		if(scope.formData.isPairing==true){
        			scope.formData.isPairing = 'Y';
        		}else if(scope.formData.isPairing==false){
        			scope.formData.isPairing = 'N';
        		}
        	
	        	this.formData.locale = scope.optlang.code;
	        	this.formData.grnId = scope.itemDetailsData.id;//scope.grnIds.id;
	        	this.formData.serialNumber = scope.itemDetailsData.serialNumber;
	        	this.formData.quality = scope.itemDetailsData.quality === undefined?'Good':scope.itemDetailsData.quality;
	        	this.formData.provisioningSerialNumber = scope.itemDetailsData.provisioningSerialNumber;
	        	this.formData.status = scope.itemDetailsData.status === undefined?'New':scope.itemDetailsData.status;
	        	this.formData.remarks = scope.itemDetailsData.remarks;
	        	this.formData.itemMasterId = scope.itemDetailsData.itemMasterId;
	            delete this.formData.purchaseDate;
	            delete this.formData.inventoryGrnDatas;
	            delete this.formData.qualityDatas;
	            delete this.formData.statusDatas;
	            delete this.formData.modelProvisionMappingData;
	        	resourceFactory.itemDetailsResource.save(this.formData,function(data){
	        		location.path("/inventory");
	        	});
	       };
	       
    }
  });
  mifosX.ng.application.controller('CreateItemDetailsController', ['$scope','webStorage', 'ResourceFactory','$routeParams','$location','$rootScope', mifosX.controllers.CreateItemDetailsController]).run(function($log) {
    $log.info("CreateItemDetailsController initialized");
  });
}(mifosX.controllers || {}));
