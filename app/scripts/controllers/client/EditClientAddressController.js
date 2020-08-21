(function(module) {
	mifosX.controllers = _.extend(module,{
		EditClientAddressController : function(scope,webStorage,routeParams,resourceFactory,dateFilter, location,http,API_VERSION,$rootScope,PermissionService,Upload,filter) {
							
							scope.formData = {};
							scope.oldProperty = {};
							scope.addressTypeData=[];
							scope.propertyCodes = [];
							scope.clientId = routeParams.id;
						    scope.walletConfig = webStorage.get('is-wallet-enable');
						    scope.propertyMaster = webStorage.get("is-propertycode-enabled");
							 var clientData = webStorage.get('clientData');
					            scope.displayName=clientData.displayName;
					            scope.hwSerialNumber=clientData.hwSerialNumber;
					            scope.statusActive=clientData.statusActive;
					            scope.accountNo=clientData.accountNo;
					            scope.officeName=clientData.officeName;
					            scope.balanceAmount=clientData.balanceAmount;
					            scope.currency=clientData.currency;
					            scope.imagePresent=clientData.imagePresent;
					            scope.categoryType=clientData.categoryType;
						        scope.email=clientData.email;
						        scope.phone=clientData.phone;
						        scope.image=clientData.image;
							resourceFactory.addressEditResource.getAll({clientId: routeParams.id} , function(data) {	
                                scope.formData=data.datas[0]; 
                                scope.addressTypeData=data.addressOptionsData;
                                scope.cityDatas=data.cityData;
                                scope.oldProperty = data.datas[0];
							});		
							
							scope.getStateAndCountry=function(city){
								scope.formData.state = '';
        	            		scope.formData.country = '';
						      	  resourceFactory.AddressTemplateResource.get({city : scope.formData.city}, function(data) {
						          		scope.formData.state = data.state;
						          		scope.formData.country = data.country;
						      	  });
						        };
						         scope.getPropertyCode = function(query){
							        	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
							        	      params: {
							        	    	  		query: query
							        	      		   }
							        	    }).then(function(res){   
							        	    	 scope.propertyCodes=res.data;				 
							        	      return scope.propertyCodes;
							        	    });
						         };   
						         
						        scope.getPropertyDetails=function(propertyCode){

						         if(propertyCode!=undefined){
						        		
						         /*  if(propertyCode == scope.oldProperty.addressNo){
					        		 console.log("old:"+propertyCode);
					        		 scope.formData.street = scope.oldProperty.street;
					        		 scope.formData.city = scope.oldProperty.city;
					        	     scope.formData.state = scope.oldProperty.state;
				        			 scope.formData.country = scope.oldProperty.country;
				        			 scope.formData.zip = scope.oldProperty.zip;
				        				 
					            	 }*/
						        		
						        	for(var i in scope.propertyCodes){
						        		if(scope.propertyCodes[i].propertyCode == propertyCode){
						        			 scope.formData.street = scope.propertyCodes[i].street;
						        			 scope.formData.city  =  scope.propertyCodes[i].precinct; 
						        			 scope.formData.state = scope.propertyCodes[i].state;
						        			 scope.formData.country = scope.propertyCodes[i].country;
						        			 scope.formData.zip = scope.propertyCodes[i].poBox;
						        			 break;
						        		}else{
						        			delete scope.formData.street;
						        			delete scope.formData.city;
						        			delete scope.formData.state;
						        			delete scope.formData.country;
						        			delete scope.formData.zip;
						        		}
						        	}
						        	}else{
						        		delete scope.formData.street;
					        			delete scope.formData.city;
					        			delete scope.formData.state;
					        			delete scope.formData.country;
					        			delete scope.formData.zip;
						        	}
						        };
						        
					        
						      
							scope.submit = function() {
								
								/*if(this.formData.addressTypeId=='1'){
									this.formData.addressType='PRIMARY';								
								}else{
									this.formData.addressType='BILLING';
								}*/
								this.formData.entityName='EnterName';
								this.formData.parentEntityId='-1';
								this.formData.entityCode='EnterCode';
								this.formData.zipCode=this.formData.zip;
								delete this.formData.addressOptionsData;
								delete this.formData.cityData;
								delete this.formData.datas;
								delete this.formData.addressKey;
								delete this.formData.zip;
								delete this.formData.id;
								delete this.formData.addressKey;
								delete this.formData.addressTypeId;
								
								resourceFactory.addressResource.update({clientId: routeParams.id},
										this.formData, function(data) {
											location.path('/viewclient/'
													+ routeParams.id);
										});
							};
						}
					});
	mifosX.ng.application.controller('EditClientAddressController',
			['$scope',
			 'webStorage', 
			 '$routeParams', 
			 'ResourceFactory',
			 'dateFilter', 
			 '$location',
			 '$http', 
             'API_VERSION',
             '$rootScope',
             'PermissionService',
             'Upload',
             '$filter',
              mifosX.controllers.EditClientAddressController]).run(function($log) {
	    $log.info("EditClientAddressController initialized");
	  });
	
}(mifosX.controllers || {}));