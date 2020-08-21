(function(module) {
	  mifosX.controllers = _.extend(module, {
		  AllocateHardwareOneTimeSaleController: function(scope, webStorage,routeParams , location, resourceFactory,$rootScope,API_VERSION,http) {
			  scope.formData = {};
			  scope.clientId=routeParams.clientId || "";
			  scope.itemcode=routeParams.itemcode || "";
			  scope.quantity=routeParams.quantity || 1;
			  scope.itemDatas=[];
			  
			  var clientData = webStorage.get('clientData') || [];
			  
			  	scope.hwSerialNumber=clientData.hwSerialNumber;
	            scope.displayName=clientData.displayName;
	            scope.statusActive=clientData.statusActive;
	            scope.accountNo=clientData.accountNo;
	            scope.officeName=clientData.officeName;
	            scope.balanceAmount=clientData.balanceAmount;
	            scope.currency=clientData.currency;
	            scope.imagePresent=clientData.imagePresent;
	            scope.categoryType=clientData.categoryType;
	            scope.email=clientData.email;
	            scope.phone=clientData.phone;
	            scope.officeId = clientData.officeId || "";
	          
	            resourceFactory.itemResource.get(function(data) {
	            	scope.itemDatas=data.pageItems;
	            	for(var i in scope.itemDatas){
	            		if(scope.itemDatas[i].itemCode == scope.itemcode){
	            			scope.formData.itemId = scope.itemDatas[i].id;
	            		}
	            	}
	            });
	        
		        scope.getData = function(query){
		        	 
		        	 return http.get($rootScope.hostUrl+ API_VERSION+'/itemdetails/'+scope.formData.itemId+'/'+scope.officeId, {
		        	      params: {
		        	    	  		query: query
		        	      		  }
		        	    }).then(function(res){
		        	    						itemDetails = [];
							        	        for(var i in res.data.serialNumbers){
							        	    	   itemDetails.push(res.data.serialNumbers[i]);
							        	    	   if(i == 7)
							        	    		   break;
							        	        }
							        	        return itemDetails;
		        	    });
	            };
	        	
	        scope.getNumber = function(num) {
	        	var i = parseInt(num);
	             return new Array(i);   
	         };
	         
	         scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "Sale" });
	           };
	         
	        scope.submit = function() {
	        	
	        	scope.formData.quantity = scope.quantity;
	        	scope.formData.serialNumber = [];
	        	$("input[name='serialNumber']").each(function(){
	        								scope.formData.serialNumber.push({
	        															 serialNumber 	: $(this).val(),
	        															 orderId 		: routeParams.saleId,
	        															 clientId 		: scope.clientId,
	        															 status 		: "allocated",
	        															 itemMasterId 	: scope.formData.itemId, 
	        															 isNewHw 		: "Y", 
	        								});
	        	});
	        	
	            resourceFactory.allocateHardwareResource.save(scope.formData,function(data){
	            	webStorage.add("callingTab", {someString: "Sale" });
	            	location.path('/viewclient/' + scope.clientId);
	            });
	        };
	    }
	  });
	  mifosX.ng.application.controller('AllocateHardwareOneTimeSaleController', [
	                                                                             '$scope', 
	                                                                             'webStorage',
	                                                                             '$routeParams', 
	                                                                             '$location', 
	                                                                             'ResourceFactory',
	                                                                             '$rootScope',
	                                                                             'API_VERSION',
	                                                                             '$http',
	                                                                             mifosX.controllers.AllocateHardwareOneTimeSaleController]).run(function($log) {
        $log.info("AllocateHardwareOneTimeSaleController initialized");
    });
}(mifosX.controllers || {}));
