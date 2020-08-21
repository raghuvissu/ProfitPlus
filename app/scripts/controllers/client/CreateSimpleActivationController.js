(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateSimpleActivationController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter,PermissionService, dateFilter,$rootScope,API_VERSION) {
		  
		  scope.offices = [];
		  scope.clientCategoryDatas = [];
		  scope.cities = [];
		  scope.formData={};
		  scope.formData.clientServiceDetails =[];
		  scope.clientServiceCollapsed =true;
		  scope.deviceCollapsed = true; 
		  scope.planCollapsed = true;
		  scope.serviceData = [];
		  scope.serviceFormData = [];
		  scope.clientServiceData = [];
		  scope.discountMasterDatas = [];
		  scope.itemDatas = [];
		  scope.contractPeriods = [];
		  scope.pairableItemDetails = [];
		  scope.pairableFormData = {};
		  scope.plandatas = [];
		  scope.subscriptiondatas = [];
	      scope.paytermdatas = [];
	      scope.finalData = {};
	      scope.formData.clientServiceDetails = [];
	      scope.isPairable = false;
	      scope.activationDate = new Date();
	      scope.paramValues = ["true","false"];
	      var reqDate = dateFilter(scope.activationDate,'dd MMMM yyyy');
	      //scope.date.saleDate = new Date();
	      scope.start.date = new Date();
	      scope.saleDate = new Date();
		  
		  
		  resourceFactory.clientTemplateResource.get(function(data) {
              //scope.offices = data.officeOptions;
            scope.clientCategoryDatas=data.clientCategoryDatas;
			 for(var i in scope.clientCategoryDatas){
	          	  if(scope.clientCategoryDatas[i].categoryType == "Normal"){
	          		scope.formData.clientCategory = scope.clientCategoryDatas[i].id;break;
	          	  }
	            }
			  
              scope.cities=data.addressTemplateData.cityData;
              scope.flag=data.loginConfigurationProperty.enabled;
           /*   scope.clientCategoryDatas=data.clientCategoryDatas;
              scope.formData.clientCategory=data.clientCategoryDatas[0].id;*/
              
              for(var i in  scope.clientCategoryDatas){
            	  if(scope.clientCategoryDatas[i].categoryType == "Normal"){
            		  scope.formData.clientCategory = scope.clientCategoryDatas[i].id;break;
            	  }
              }
              
          });
		  
		  scope.groupByOffice = function(externalId, name){
	        	return externalId+"--"+name;
	      };
		  
		  scope.getOfficeData = function(query){
	        	return http.get($rootScope.hostUrl+API_VERSION+'/clients/searching/1/', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(result){
	        	    	scope.officeDetails = [];
		        	      for(var i in result.data.officeOptions){
		        	    	  scope.officeDetails.push(result.data.officeOptions[i]);
		        	    	  if(i == 7)
		        	    		  break;
		        	      }
		        	      
		        	    if(scope.officeDetails.length == 0){
		        	    	delete scope.formData.name;
		        	    	delete scope.formData.nameDecorated;
		        	    	delete scope.formData.externalId;
		        	    }
	        	      return scope.officeDetails;
	        	    });
	        };
		  
		  scope.formName=function(name){
              var mesage_array = new Array();
              mesage_array = (name.split(" "));
           
	           this.formData.firstname=mesage_array[0];
	           this.formData.lastname=mesage_array[1];
	           if(this.formData.lastname == null){
	        	   this.formData.lastname="Mr.";
	           }
          };
		  
		  scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData.state = data.state;
            		scope.formData.country = data.country;
        	  });
          };
		  
		  resourceFactory.clientserviceTemplateResource.get(function(data) {
			  scope.serviceData = data.serviceData;
		  });
		  
		  scope.getBothService = function(serviceCode, serviceDescription){
			  return serviceCode+"--"+serviceDescription;
		  };
		  
		  scope.changeServiceFun = function(){
			  resourceFactory.clientserviceparamResource.get({serviceId: scope.formData.serviceId,paramCategory:"S"}, function(data) {
				  scope.serviceDetail = angular.copy(data);
				  scope.details = data;
			  });
		  };
		  
		  resourceFactory.oneTimeSaleTemplateResource.get({clientId:scope.clientId}, function(data) {
	            scope.clientServiceData = data.clientServiceData;
	            /*for(var i in scope.offices){
	            	if(scope.offices[i].id == officeId){
	            		scope.formData.officeId=scope.offices[i].id;
	            	}
	            }*/
	            scope.discountMasterDatas = data.discountMasterDatas;
	            for(var i in scope.discountMasterDatas){
	                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
	                 scope.discountId = scope.discountMasterDatas[i].id; 
	                }
	               }
	            scope.itemDatas = angular.copy(data.itemDatas);
	            scope.contractPeriods = data.contractPeriods;
	        }); 
		  	
			  /*scope.getData = function(query){
				  for(var i in scope.officeDetails){
		           		if(scope.officeDetails[i].externalId == scope.formData.officeId){
		           			scope.formData.officeId = scope.officeDetails[i].id;
		           		}
		           	}
				  console.log(scope.formData.officeId);
				  return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/0/'+scope.formData.officeId, {
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
	
							        	    if(itemDetails.length == 0){
							        	    	delete scope.formData.itemId;
							        	    	delete scope.formData.chargeCode;
							        	    	delete scope.formData.unitPrice;
							        	    	delete scope.formData.quantity;
							        	    }
		        	      return itemDetails;
		        	    });
	          };
	          
	          scope.getPairableItemDetails = function(){
	            	scope.pairableItemDetails = [];
	            	console.log(scope.itemDetail);
	            	resourceFactory.pairableitemMasterDetailResource.get({serialNo:scope.itemDetail,query:scope.pairableSerialNo},function(data) {
	   				 scope.pairableItemDetails = angular.copy(data.serialNumbers);
	   			 });
	            };
	          
	            scope.getItemData = function(item,model,label){
	            	 scope.isPairable = false;
	            	 console.log(scope.formData.officeId);
		        	if(item || model || label){
		        		var serialNum = item || model || label;
		        		
			        	resourceFactory.itemMasterDetailTemplateResource.get({query : serialNum,clientId:scope.clientId,officeId:scope.formData.officeId},function(data) {
			        		
			        	   if(data){
			        		   scope.formData.itemId = data.id;
			        		   scope.formData.chargeCode = data.chargeCode;
			        		   scope.formData.totalPrice = data.unitPrice;
			        		   scope.formData.unitPrice = scope.formData.totalPrice;
			        		   scope.formData.quantity = "1";
			        		  // scope.formData.amount = data.feeMasterData[0].defaultFeeAmount;
			        		   if("Y" == data.isPairing){
			        			 scope.isPairable = true;
			        			 scope.getPairableItemDetails();
			        		   }
			        		   
			        		   for(var i in scope.discountMasterDatas){
					                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
					                 scope.formData.discountId = scope.discountMasterDatas[i].id; 
					                }
					            }
			        		   
			        	   }
			        	});
		        	}
	            };
	            
	            scope.selectPairableItemDetails = function(pairableSerialNo){
	            	scope.pairableSerialNo = pairableSerialNo;
	            	resourceFactory.itemMasterDetailTemplateResource.get({query : pairableSerialNo,clientId:scope.clientId,officeId:scope.formData.officeId},function(data) {
	            		if(data){
			        		   scope.pairableFormData.itemId = data.id;
			        		   scope.pairableFormData.chargeCode = data.chargeCode;
			        		   scope.pairableFormData.totalPrice = data.unitPrice;
			        		   scope.pairableFormData.unitPrice = scope.pairableFormData.totalPrice;
			        		   scope.pairableFormData.quantity = "1";
			        		  
			        		   for(var i in scope.discountMasterDatas){
					                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
					                 scope.pairableFormData.discountId = scope.discountMasterDatas[i].id; 
					                }
					            }
			        		   
			        	   }
	            	});
	            };*/
		  
		  scope.getData = function(query){
			  	scope.isPairable = false;
	        	delete scope.formData.discountId;
	        	scope.pairableItemDetails = [];
	        	delete scope.pairableSerialNo;
	        	scope.pairableFormData ={};
			  for(var i in scope.officeDetails){
	           		if(scope.officeDetails[i].externalId == scope.formData.officeId){
	           			scope.formData.officeId = scope.officeDetails[i].id;
	           		}
	           	}
			  return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/0/'+scope.formData.officeId, {
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

						        	    if(itemDetails.length == 0){
						        	    	delete scope.formData.itemId;
						        	    	delete scope.formData.chargeCode;
						        	    	delete scope.formData.unitPrice;
						        	    	delete scope.formData.quantity;
						        	    }
	        	      return itemDetails;
	        	    });
        };
        
        scope.getPairableItemDetails = function(serialNum){
        	scope.itemDetail=serialNum;
        	console.log(scope.itemDetail);
          	scope.pairableItemDetails = [];
          	resourceFactory.pairableitemMasterDetailResource.get({serialNo:scope.itemDetail,query:scope.pairableSerialNo},function(data) {
 				 scope.pairableItemDetails = angular.copy(data.serialNumbers);
 			 });
          };
        
          scope.selectPairableItemDetails = function(pairableSerialNo){
            	scope.pairableSerialNo = pairableSerialNo;
            	resourceFactory.itemMasterDetailTemplateResource.get({query : pairableSerialNo,clientId:scope.clientId,officeId:scope.formData.officeId},function(data) {
            		if(data){
            			scope.pairableFormData.itemId = data.id;
		        		   scope.pairableFormData.chargeCode = data.chargeCode;
		        		   scope.pairableFormData.totalPrice = data.unitPrice;
		        		   scope.pairableFormData.unitPrice = scope.pairableFormData.totalPrice;
		        		   scope.pairableFormData.quantity = "1";
  		        		   
  		        		   for(var i in scope.discountMasterDatas){
  				                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
  				                 scope.pairableFormData.discountId = scope.discountMasterDatas[i].id; 
  				                }
  				            }
  		        		  
  		        	   }
            	});
            };
          
        scope.getItemData = function(item,model,label){
          	 scope.isPairable = false;
	        	if(item || model || label){
	        		var serialNum = item || model || label;
		        	resourceFactory.itemMasterDetailTemplateResource.get({query : serialNum,clientId:scope.clientId,officeId:scope.formData.officeId},function(data) {
		        	   if(data){
		        		   scope.formData.itemId = data.id;
		        		   scope.formData.chargeCode = data.chargeCode;
		        		   scope.formData.totalPrice = data.unitPrice;
		        		   scope.formData.unitPrice = scope.formData.totalPrice;
		        		   scope.formData.quantity = "1";
		        		   if("Y" == data.isPairing){
		        			 scope.isPairable = true;
		        			 scope.getPairableItemDetails(serialNum);
		        		   }else{
		        			   scope.itemDetail = serialNum;
		        		   }
		        		   for(var i in scope.discountMasterDatas){
				                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
				                 scope.formData.discountId = scope.discountMasterDatas[i].id; 
				                }
				            }
		        	   }
		        	});
	        	}
          };
          
	            
	            scope.selectedNewSale = function(){
		        	delete scope.formData.totalPrice;
		        	delete scope.formData.discountId;
		        	delete scope.pairableFormData.totalPrice;
		        	delete scope.pairableFormData.discountId;
		        	scope.formData.discountId = scope.discountId;
		        	scope.formData.totalPrice = scope.formData.unitPrice;
		        	scope.pairableFormData.totalPrice = scope.pairableFormData.unitPrice;
		        	scope.pairableFormData.discountId = scope.discountId;
		        	scope.newSaleType = !(scope.secondSaleType = scope.deviceRentalType = false);
		        	
		        };
		        
		        resourceFactory.orderTemplateResource.get({planId:'0'},function(data) {
			          scope.plandatas = data.plandata;
			          scope.items = data.plandata;
			          scope.prepaidPlansitems = data.plandata;
			          scope.subscriptiondatas=data.subscriptiondata;
			          scope.paytermdatas=data.paytermdata;
			          scope.clientId = routeParams.id;
			          scope.formData = {
			            		billAlign: false,
			            		
			                  };
			        });
		        scope.getPlan = function(planCode, planDescription){
		        	return planCode+"--"+planDescription;
		        };
		        scope.setBillingFrequency = function(value) {
		        	scope.paytermdatas=undefined;
		        	 resourceFactory.orderResource.get({planId:value, template: 'true'} , function(data) {
		        		 
		        		 scope.paytermdatas=data.paytermdata;
		        		 scope.formData.isPrepaid=data.isPrepaid;
		        		 scope.isPrepaidPlanFormData4=data.isPrepaid;
		        		 scope.formData.planCode=value;
		        		 console.log(scope.formData.isPrepaid);
		        		  for (var i in data.subscriptiondata) {
		                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
		                 		 scope.formData.contractPeriod=data.subscriptiondata[i].id; 
		                 	}
		                   
		                  };
		             });
		       };
		       
		       scope.submit = function(){
		    	   console.log(scope.itemDetail);
		    	   scope.formData.clientServiceDetails = [];
		    	   scope.finalData.clientData = [];
		    	   scope.finalData.clientServiceData =[];
		    	   scope.finalData.deviceData = [];
		    	   scope.finalData.planData = [];
		    	   console.log(scope.formData);
		    	   for(var i in scope.officeDetails){
		           		if(scope.officeDetails[i].externalId == scope.formData.officeId){
		           			scope.formData.officeId = scope.officeDetails[i].id;
		           		}
		           	}
		    	   scope.finalData.clintData = {
		    			   "activationDate":reqDate,
		    			   "entryType":"IND",
		    			   "officeId" : scope.formData.officeId,
		    			   "clientCategory" : scope.formData.clientCategory,
		    			   "title":"Mr.",
		    			   "firstname":scope.formData.firstname,
		    			   "lastname":scope.formData.lastname,
		    			   "phone":scope.formData.phone,
		    			   "email":scope.formData.email,
		    			   "addressNo":"Addr1",
		    			   "city":scope.formData.city,
		    			   "state":scope.formData.state,
		    			   "country":scope.formData.country,
		    			   "locale":scope.optlang.code,
		    			   "active":true,
		    			   "dateFormat":"dd MMMM yyyy",
		    			   
		    			   "flag":scope.flag
		    	   };
		    	   scope.finalData.clientData.push(scope.finalData.clintData);
		    	   delete scope.finalData.clintData;
		    	   
		    	   
		    	   for(var i in scope.serviceDetail){
		        		 scope.formData.clientServiceDetails
							.push({
								 status: 'new',
								 parameterId: parseInt(scope.serviceDetail[i].paramName),
								 parameterValue: scope.serviceDetail[i].paramValue
								 
							});
		        	 }
		    	   scope.clintServiceData = {
		    			 "clientServiceDetails": scope.formData.clientServiceDetails,
		    			 "serviceId":scope.formData.serviceId
		    	   };
		    	   scope.finalData.clientServiceData.push(scope.clintServiceData);
		    	   
		    	   scope.deviceData ={};
		    	    scope.deviceData.locale = scope.optlang.code;
		    	    scope.deviceData.dateFormat = "dd MMMM yyyy";
		    	    scope.deviceData.officeId = scope.formData.officeId;
		    	    scope.deviceData.itemId = scope.formData.itemId;
		    	    scope.deviceData.chargeCode = scope.formData.chargeCode;
		    	    scope.deviceData.unitPrice = scope.formData.unitPrice;
		    	    scope.deviceData.quantity = scope.formData.quantity;
		    	    scope.deviceData.discountId = scope.formData.discountId;
		    	    scope.deviceData.totalPrice = scope.formData.totalPrice;
		    	    
		        	scope.deviceData.saleType = "NEWSALE";
		        	scope.deviceData.saleDate = dateFilter(scope.saleDate,"dd MMMM yyyy");
		        	for(var i in scope.itemDatas){
		        		if(scope.itemDatas[i].id == scope.formData.itemId){
		        			scope.itemType1 = scope.itemDatas[i].itemCode;
		        		}
		        		if(scope.itemDatas[i].id == scope.pairableFormData.itemId){
		        			scope.pairableFormData.itemType = scope.itemDatas[i].itemCode;
		        		}
		        	}
		        	scope.deviceData.serialNumber = [{
						serialNumber 	: scope.itemDetail,
						status 			: "allocated", 
						itemMasterId 	: scope.formData.itemId,
						isNewHw 		: "Y",
						itemType        : scope.itemType1
					}];
		        	if(scope.isPairable){
		        		scope.deviceData.pairableItemDetails ={};
		        		scope.deviceData.pairableItemDetails.dateFormat = "dd MMMM yyyy";
		        		scope.deviceData.pairableItemDetails.locale = scope.optlang.code;
		        		scope.deviceData.pairableItemDetails.officeId = scope.formData.officeId;
		        		scope.deviceData.pairableItemDetails.itemId = scope.pairableFormData.itemId;
		        		scope.deviceData.pairableItemDetails.chargeCode = scope.pairableFormData.chargeCode;
		        		scope.deviceData.pairableItemDetails.unitPrice = scope.pairableFormData.unitPrice;
		        		scope.deviceData.pairableItemDetails.quantity = scope.formData.quantity;
		        		scope.deviceData.pairableItemDetails.discountId = scope.pairableFormData.discountId;
		        		scope.deviceData.pairableItemDetails.totalPrice = scope.pairableFormData.totalPrice;
		        		scope.deviceData.pairableItemDetails.saleType = "NEWSALE";
		        		scope.deviceData.pairableItemDetails.saleDate = dateFilter(scope.saleDate,"dd MMMM yyyy");
		        		scope.deviceData.pairableItemDetails.clientServiceId = scope.formData.clientServiceId;
		        		scope.deviceData.pairableItemDetails.isPairing = "N";
		        		scope.deviceData.pairableItemDetails.serialNumber = [];
		        		scope.deviceData.pairableItemDetails.serialNumber.push({
						serialNumber 	: scope.pairableSerialNo,
						status 			: "allocated", 
						itemMasterId 	: scope.pairableFormData.itemId,
						isNewHw 		: "Y",
						itemType        : scope.pairableFormData.itemType
					});
		        	scope.deviceData.isPairing = "Y";
		        	}else{
		        		delete scope.deviceData.pairableItemDetails;
		        		scope.deviceData.isPairing = "N";
		        	}
		        	scope.finalData.deviceData.push(scope.deviceData);
		        	
		        
		    	   
		    	   if(this.formData.isPrepaid == 'Y'){
		            	  for (var i in scope.paytermdatas) {
		                     	if(scope.paytermdatas[i].duration == this.formData.contractPeriod){
		                     		 this.formData.paytermCode=scope.paytermdatas[i].paytermtype; 
		                     	}
		                  };
		                  for (var i in scope.subscriptiondatas) {
		                   	if(scope.subscriptiondatas[i].Contractdata == this.formData.contractPeriod){
		                   		 this.formData.contractPeriod=scope.subscriptiondatas[i].id;
		                   		
		                   	}
		                };    
		            //this.formData.paytermCode='Monthly';
		                this.formData.billAlign=false;
		            }
		    	   
		    	   scope.finalData.plnData = {
		    			   "billAlign":false,
		    			   "autoRenew":"",
		    			   "planCode":scope.formData.planCode,
		    			   "contractPeriod":scope.formData.contractPeriod,
		    			   "paytermCode":scope.formData.paytermCode,
		    			   "isNewplan":true,
		    			   "locale":scope.optlang.code,
		    			   "dateFormat": "dd MMMM yyyy",
		    			   "start_date":dateFilter(new Date(),'dd MMMM yyyy'),
		    			   
		    	   };
		    	   scope.finalData.planData.push(scope.finalData.plnData);
		    	   delete scope.finalData.plnData;
		    	   resourceFactory.simpleactivationProcessResource.save(scope.finalData,function(data){
		            	location.path('/viewclient/id/'+ data.clientId);
		            });
		    	   
		       };
	            

	    }
	  });
mifosX.ng.application.controller('CreateSimpleActivationController', [
                                                                  '$scope',
                                                                  'webStorage',
                                                                  '$routeParams',
                                                                  'ResourceFactory', 
                                                                  '$location', 
                                                                  '$http',
                                                                  '$filter',
                                                                  'PermissionService', 
                                                                  'dateFilter',
                                                                  '$rootScope',
                                                                  'API_VERSION',
                                                                  mifosX.controllers.CreateSimpleActivationController]).run(function($log) {
    $log.info("CreateSimpleActivationController initialized");
  });
}(mifosX.controllers || {}));