(function(module) {
  mifosX.controllers = _.extend(module, {
    CreatePriceController: function(scope, routeParams, resourceFactory, location,$rootScope) {
        
    	scope.chargeDatas = [];
        scope.chargevariants = [];
        scope.discountdatas = [];
        scope.priceRegionDatas = [];
        scope.serviceDatas=[];
        scope.priceDatas = [];
        scope.formData = {};
        scope.prices = [];
        scope.planId = routeParams.id;
        scope.fieldserror = false;
        scope.labelerror = "requiredfields";
        scope.currencyCode = "";
        scope.currencyId = "";
        
        scope.assignCurrencyDetailsToFormData = function(data){
        	
        	scope.currencyId = data.currencyId;
        	for(var i in scope.currencyDatas){
        		if(scope.currencyId == scope.currencyDatas[i].id){
        			scope.currencyCode = scope.currencyDatas[i].code;break;
        		}
        	}
        }
        
        
       /* resourceFactory.priceTemplateResource.get({planId: routeParams.id} , function(data) {
            scope.formData.planCode=data.planCode;
            scope.formData.isPrepaid=data.isPrepaid;
        	scope.chargeDatas = data.chargeData;
            scope.chargevariants = data.chargevariant;
            scope.discountdatas = data.discountdata;
            scope.priceRegionDatas = data.priceRegionData;
            scope.subscriptiondata = data.contractPeriods;
            scope.serviceDatas = data.serviceData;
            scope.serviceDatas.push({"id":0,"serviceCode":"none","serviceDescription":"None"});*/
            
            resourceFactory.priceResource.get({planId: routeParams.id, template: 'true'} , function(data) {
            	
            	scope.formData.planCode=data.planCode;
                scope.formData.isPrepaid=data.isPrepaid;
            	scope.chargeDatas = data.chargeData;
                scope.chargevariants = data.chargevariant;
                scope.discountdatas = data.discountdata;
                scope.priceRegionDatas = data.priceRegionData;
                scope.subscriptiondata = data.contractPeriods;
                scope.serviceDatas = data.serviceData;
                scope.serviceDatas.push({"id":0,"productCode":"none","productDescription":"None"});
            	if(data.pricingData != null){
            		/*console.log("condi")*/
            		scope.priceDatas = data.pricingData;
            	}
            	scope.currencyDatas = data.currencydata.currencyOptions;
            	console.log(scope.priceDatas);
            	scope.assignCurrencyDetailsToFormData(data);
            	
            	for ( var i in scope.priceDatas) {
            		/*Charge Varaint*/
            		for (var j in scope.chargevariants){
            			if(scope.priceDatas[i].chargeVariant == scope.chargevariants[j].value){
            				scope.priceDatas[i].chargevariant = scope.chargevariants[j].id;
            				
            			}
            		}/*Charge Code*/
            		for ( var k in scope.chargeDatas) {
            			if(scope.priceDatas[i].chargeCode == scope.chargeDatas[k].chargeDescription){
            				scope.priceDatas[i].chargeCode = scope.chargeDatas[k].chargeCode;
            			}
            		}/*Price Region*/
            		for ( var l in scope.priceRegionDatas) {
            			if(scope.priceDatas[i].priceregion == scope.priceRegionDatas[l].priceregion){
            				scope.priceDatas[i].priceregion = scope.priceRegionDatas[l].id;
            			}
            		}
            	}
            });
      /*  });*/
        
        scope.addPriceData = function(){
        	if(scope.formData.chargeCode && scope.formData.chargevariant && scope.formData.discountId &&
        			scope.formData.isPrepaid && scope.formData.planCode && scope.formData.price && scope.formData.priceregion ){
        		scope.fieldserror = false;
        		 if(scope.formData.isPrepaid == 'Y'){
        			 if(scope.formData.duration){
        				 scope.priceDatas.push(scope.formData);
        				 var planCode = scope.formData.planCode;
        		        	var isPrepaid = scope.formData.isPrepaid;
        		        	scope.formData = {};
        		        	scope.formData.planCode = planCode;
        		        	scope.formData.isPrepaid = isPrepaid;

        			 }
        		 }else{
        			 scope.priceDatas.push(scope.formData);
        			 var planCode = scope.formData.planCode;
        	        	var isPrepaid = scope.formData.isPrepaid;
        	        	scope.formData = {};
        	        	scope.formData.planCode = planCode;
        	        	scope.formData.isPrepaid = isPrepaid;
        		 }
        	}else{
        	 scope.errorDetails = [];
        	 scope.fieldserror = true;
             scope.labelerror = "fieldserror";
        	}
        };
        
        scope.removePriceData = function (index,priceId) {
            if(priceId !=undefined){/*Delete particular Price of plan */
            	 resourceFactory.deletePriceResource.remove({priceId: priceId} , {} , function() {
            		 scope.priceDatas.splice(index, 1);
            		 //console.log(priceId);
                });
            }else{/*Remove Price Data which was newly added */
            	scope.priceDatas.splice(index, 1);
            }
        };
			 
        priceDataSendingOneByOneFun = function(val){
        	if(scope.priceDatas[val].id){/*update plan price*/
        		scope.planPriceId = scope.priceDatas[val].id;
        		delete scope.priceDatas[val].chargeVariant;
        		delete scope.priceDatas[val].billingFrequency;
        		delete scope.priceDatas[val].contractId;
        		//delete scope.priceDatas[val].currencyId;
        		delete scope.priceDatas[val].currencyCode;
        		resourceFactory.updatePriceResource.update({priceId:scope.planPriceId},scope.priceDatas[val],function(data){
   				 if(val == scope.priceDatas.length-1){
   					 location.path('viewplan/'+routeParams.id);
   				 }else{
   					 val += 1;
   					 priceDataSendingOneByOneFun(val);
   			 	 }
   			 });
        		
        }else{/*create new  plan price*/
        	resourceFactory.priceResource.save({'planId':routeParams.id},scope.priceDatas[val],function(data){
				 if(val == scope.priceDatas.length-1){
					 location.path('viewplan/'+routeParams.id);
				 }else{
					 val += 1;
					 priceDataSendingOneByOneFun(val);
			 	 }
			 });
           }
		 };
        
        scope.submit = function() {
        	for(var i in scope.priceDatas){
        		scope.priceDatas[i].locale = scope.optlang.code;
        		scope.priceDatas[i].currencyId = scope.currencyId;
        		if(i==scope.priceDatas.length-1){
        			priceDataSendingOneByOneFun(0);
        		}
        	}
        	 //this.formData.locale = $rootScope.locale.code;
        	/* resourceFactory.priceResource.save({'planId':routeParams.id},this.formData,function(data){
                 location.path('/viewprice/' + data.resourceId+'/'+routeParams.id);
          });*/
        };
    }
  });
  mifosX.ng.application.controller('CreatePriceController', [
    '$scope', 
    '$routeParams', 
    'ResourceFactory', 
    '$location',
    '$rootScope', 
    mifosX.controllers.CreatePriceController]).run(function($log) {
    $log.info("CreatePriceController initialized");
  });
}(mifosX.controllers || {}));
