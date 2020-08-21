(function(module) {
  mifosX.controllers = _.extend(module, {
    EditItemController: function(scope, routeParams, resourceFactory, location,$rootScope,webStorage,$uibModal) {
        scope.itemClassDatas = [];
        scope.unitDatas = [];
        scope.chargesDatas = [];
        scope.formData = {};
        scope.removeItemPrices = [];
        scope.supplierDatas = [];
        scope.configurationData = [];
        scope.totalItem=routeParams.totalItem;
        scope.itemPricesFormData = [];
        
         resourceFactory.itemResource.get({itemId: routeParams.id,template:true} , function(data) {
        	scope.itemClassDatas = data.itemClassData;
            scope.unitDatas = data.unitData;
            scope.chargesDatas = data.chargesData;
            scope.formData=data;
            scope.regionDatas = data.regionDatas;
            scope.itemPrices = data.itemPricesDatas;
            scope.configurationData = data.configurationData;
            scope.supplierDatas = data.supplierData;
            scope.currencyDatas = data.currencyDatas;
            
            if(data.isProvisioning =="Y"){
  				scope.formData.isProvisioning=true;
  			}
            if(data.isSelector =="Y"){
  				scope.formData.isSelector = true;
  			}else{
            	scope.formData.isSelector = false;
            }

        });
         
         scope.reset123 = function(){
        	  webStorage.add("callingTab", {someString: "items" });
         };
        
         scope.addItemPrice = function () {
	           if (scope.itemPricesFormData.regionId && scope.itemPricesFormData.price) {
	        	   
	                scope.itemPrices.push({regionId:scope.itemPricesFormData.regionId, 
	                	price:scope.itemPricesFormData.price
	                });
	              
	                scope.itemPricesFormData.regionId = undefined;
	                scope.itemPricesFormData.price = undefined;
	                
	          	}
	     };
	     scope.removeItemPrice = function (index) {
	    	 console.log(index);
	    	 
	    	 scope.removeItemPrices.push({regionId:scope.itemPrices[index].regionId, 
          	   price:scope.itemPrices[index].price,locale:scope.optlang.code,id:scope.itemPrices[index].id});
           
	    	 scope.itemPrices.splice(index,1);
	     };
	     
	     scope.getBothSup = function (supplierCode, supplierDescription){
	    	return supplierCode+"--"+supplierDescription; 
	     };
	     
	     scope.selectorHelpPopup = function(){
	            $uibModal.open({
	                templateUrl: 'selectorHelpPopup.html',
	                controller: selectorHelpPopupCtrl
	            });
		     };
		     
		     function selectorHelpPopupCtrl($scope, $uibModalInstance) {
		    	 	$scope.selector = {};
		    	 	$scope.selectorFun = function(){
		    	 		if($scope.selector == 'selectorService'){
		    	 			scope.formData.selectorDescription = "select b.item_type from b_item_detail a, b_model_provision_mapping b where a.item_model=b.id and a.serial_no='b_item_detail.serialNo'";
		    	 		}else if($scope.selector == 'selectorClient'){
		    	 			scope.formData.selectorDescription = 'selectorClient';
		    	 		}else if($scope.selector == 'selectorCity'){
		    	 			scope.formData.selectorDescription = 'selectorCity';
		    	 		}
		    	 		$uibModalInstance.dismiss('cancel');
		    	 	};
			 };
	     
			 scope.getBothCurrency = function(code,name){
				 return code+"--"+name;
			 }
			 
        scope.submit = function() {	
        	 delete this.formData.id;
        	 delete this.formData.itemClassData;
        	 delete this.formData.unitData;
        	 delete this.formData.chargesData;
        	 delete this.formData.auditDetails;
        	 delete this.formData.regionDatas;
        	 delete this.formData.itemPricesDatas;
        	 delete this.formData.configurationData;
        	 delete this.formData.supplierData;
        	 delete this.formData.supplierCode;
        	 delete this.formData.itemClassName;
        	 delete this.formData.usedItems;
        	 delete this.formData.availableItems;
        	 delete this.formData.totalItems;
        	 delete this.formData.currencyDatas;
        	 delete this.formData.code;
        	 delete this.formData.name;
        	 //this.formData.unitPrice = "0";
        	 scope.formData.itemPrices =new Array();
        	 scope.formData.removeItemPrices = new Array();
        	 if(scope.removeItemPrices.length > 0){
        		 scope.formData.removeItemPrices = scope.removeItemPrices;
        	 }
        	 
        	 if (scope.itemPrices.length > 0) {
                 
                 for (var i in scope.itemPrices) {
                	
                   scope.formData.itemPrices.push({regionId:scope.itemPrices[i].regionId, 
                	   price:scope.itemPrices[i].price,locale:scope.optlang.code,id:scope.itemPrices[i].id});
                 };
              }
        	 this.formData.locale = scope.optlang.code;
               resourceFactory.itemResource.update({'itemId': routeParams.id},this.formData,function(data){
             location.path('/viewitem/' + data.resourceId +'/item/'+ scope.totalItem);

          });
        };
    }
  });
  mifosX.ng.application.controller('EditItemController', ['$scope', '$routeParams', 'ResourceFactory', '$location','$rootScope','webStorage','$uibModal', mifosX.controllers.EditItemController]).run(function($log) {
    $log.info("EditItemController initialized");
  });
}(mifosX.controllers || {}));
