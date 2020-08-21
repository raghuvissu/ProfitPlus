(function(module) {
	mifosX.controllers = _.extend(module,{
		AddClientAddressController : function(scope,webStorage,routeParams,resourceFactory,dateFilter,$uibModal,http,
													API_VERSION,$rootScope,PermissionService,filter, location) {
							scope.clientId = routeParams.id;
							scope.formData = {};
							scope.addressTypeData=[];
							
						       
					        scope.offices = [];
					        scope.cities = [];
					        scope.clientCategoryDatas=[];
					        scope.groupNameDatas=[];

					        
					        scope.propertyCodes = [];
					        scope.parcelData = [];
					   	    scope.floorData = [];
					   	    scope.buildingData = [];
					   	    scope.unitData = [];
					   	    scope.property = {};
					   	    scope.propertyCodesData =[];

					        scope.nationalityDatas = [];
					        scope.genderDatas = [];
					        scope.customeridentificationDatas = [];
					        scope.cummunitcationDatas = [];
					        scope.languagesDatas = [];
					        scope.ageGroupDatas = [];
					        scope.date = {};
							scope.walletConfig = webStorage.get('is-wallet-enable');
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
						        scope.propertyMaster = webStorage.get("is-propertycode-enabled");
							resourceFactory.addressEditResource.getAll({clientId: routeParams.id} , function(data) {	
								scope.addressTypeData = data.addressOptionsData;
                                scope.cityDatas=data.cityData;
                                /*$("#city").change(function(){               
                                	scope.formData.state = '';
            	            		scope.formData.country = '';
                	            	resourceFactory.AddressTemplateResource.get({city : scope.formData.city}, function(data) {           	            		
                	            		scope.formData.state = data.state;
                	            		scope.formData.country = data.country;
                	             
                	            });
                	            });*/
							});		
							
							scope.getStateAndCountry=function(city){
								scope.formData.state = '';
        	            		scope.formData.country = '';
						      	  resourceFactory.AddressTemplateResource.get({city : scope.formData.city}, function(data) {
						          		scope.formData.state = data.state;
						          		scope.formData.country = data.country;
						      	  });
						        };
						        
						        scope.invalidBuildingCode = false;
						        var createClientFormVal = false;
						        
						        scope.$watch(function(){
						        	return scope.invalidBuildingCode;
						        },function(){
						        	if(scope.invalidBuildingCode){
						        		scope.createclientform.$valid ?
						        				(createClientFormVal = scope.createclientform.$valid,scope.createclientform.$valid = !createClientFormVal) :
						        					scope.createclientform.$valid = false;
						        	}else{
						        		if(scope.createclientform.$valid) scope.createclientform.$valid = true;
						        		else {
						        			if(createClientFormVal) scope.createclientform.$valid = true;
						        			else scope.createclientform.$valid = false;
						        		}
						        	}
						        });
						        //vacant properties
						         scope.getPropertyDetails = function(existsProperty){   
						            	   if(!angular.isUndefined(existsProperty)){
						            		  for(var j in scope.propertyCodesData)  {
						            			 if(existsProperty == scope.propertyCodesData[j].propertyCode){
						            				 scope.invalidBuildingCode = false;
						            				 scope.formData.addressNo = scope.propertyCodesData[j].propertyCode;
						            				 scope.formData.street = scope.propertyCodesData[j].street;
						            				 scope.formData.city  =  scope.propertyCodesData[j].precinct; 
						            				 scope.formData.state =  scope.propertyCodesData[j].state;
						            				 scope.formData.country = scope.propertyCodesData[j].country;
						            				 scope.formData.zip = scope.propertyCodesData[j].poBox;
						            				 scope.status=scope.propertyCodesData[j].status;
						            				 scope.propetyId=scope.propertyCodesData[j].id;
						            				 break;
						            			 }
						            		 }
						            	   }else{
						                        
						            		 delete scope.formData.street;
						            		 delete scope.formData.city;
						            		 delete scope.formData.state;
						            		 delete scope.formData.country;
						            		 delete scope.formData.zipCode;
						        			 
						            	   }
						            	  
						               };        
						             
						             
						      
							     scope.generatePropertyPopup = function (){
							    	 $uibModal.open({
							    		 templateUrl: 'generateProperty.html',
							  	         controller: generatePropertyController,
							  	         resolve:{}
							  	     });
							     };
							     
							     //starting of property controller     
							     function  generatePropertyController($scope, $uibModalInstance) {
							    	 $scope.propertyTypes = [];
							    	 $scope.precinctData = [];
							    	 $scope.formData = {};
									  resourceFactory.propertyCodeTemplateResource.get(function(data) {
										  $scope.propertyTypes = data.propertyTypes;
										  if(Object.keys(scope.property).length >0){
									    		 $scope.formData.propertyCode=scope.property.propertyCode;
									    		 $scope.formData.street=scope.property.street;
									    		 $scope.formData.state=scope.property.state;
									    		 $scope.formData.country=scope.property.country;
									    		 $scope.formData.poBox=scope.property.poBox;
									    		 $scope.formData.propertyType=scope.property.propertyType;
									    		/* for( var i in scope.parcelData){
									    			 if(scope.property.parcel == scope.parcelData[i].code){
									    				 $scope.parcel = scope.parcelData[i].description;
									    				 break;
									    			 }
									    		 }
									    		 for( var i in scope.floorData){
									    			 if(scope.property.floor ==  scope.floorData[i].code){
									    				 $scope.floor =scope.floorData[i].description;
									    				 break;
									    			 }
									    		 }*/
									    		 $scope.formData.precinct=scope.property.precinctCode;
									    		 $scope.parcel=scope.property.parcel;
									    		 $scope.floor=scope.property.floor;
									    		 $scope.buildingCode = scope.property.buildingCode;
									    		 $scope.unitCode = scope.property.unitCode;
									    		 
									    	 }
										});
									  
									  //precinct auto complete 
										$scope.getPrecinct = function(query){
											return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
								        	      params: {
								        	    	  		query: query
								        	      		   }
								        	    }).then(function(res){   
								        	    	 $scope.precinctData=res.data;	
								        	      return $scope.precinctData;
								        	    });
							             };   
										
										$scope.getPrecinctDetails = function(precinct){
											if(precinct!=undefined){
											    for(var i in $scope.precinctData){
											    	if(precinct==$scope.precinctData[i].cityCode){
											    		scope.property.precinctCode = $scope.precinctData[i].cityCode.substr(0,2);
											    		scope.property.precinct = $scope.precinctData[i].cityName;
										          		$scope.formData.state =  $scope.precinctData[i].state;
										          		$scope.formData.country = $scope.precinctData[i].country;
										          		$scope.getWatch(scope.property.precinctCode);
										          		break;
										          }else{
										        	  
														delete $scope.formData.state;
											    		delete $scope.formData.country;
													}
												}
											  }else{
												    
													delete $scope.formData.state;
										    		delete $scope.formData.country; 
											  }
										};
										
										
										$scope.getParcel = function(queryParam){
											return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
								        	      params: {
								        	    	  		query: 'parcel',
								        	    	  		queryParam:queryParam		
								        	      		   }
								        	    }).then(function(res){   
								        	    	 scope.parcelData=res.data;	
								        	      return scope.parcelData;
								        	    });
							             };   
							             $scope.getParcelDetails = function(parcel){
							            	 if(parcel !=undefined){
							                 for(var i in scope.parcelData){
							                	 if(parcel== scope.parcelData[i].code){
											    		scope.property.parcel = scope.parcelData[i].code.substr(0,2);
											    		$scope.formData.street = scope.parcelData[i].referenceValue;
											    		$scope.getWatch(scope.property.parcel);
										          		break;
										          }	 
							                    }
							                }
							             };
							             
							             $scope.getBuild = function(queryParam){
												return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
									        	      params: {
									        	    	  		query: 'Building Codes',
									        	    	  		queryParam:queryParam				
									        	      		   }
									        	    }).then(function(res){   
									        	    	 scope.buildingData=res.data;	
									        	      return scope.buildingData;
									        	    });
								             };   
								         $scope.getbuildCode = function(building){
								            	 if(!angular.isUndefined(building)){
								            		  for(var i in scope.buildingData){
									                    	 if(building==scope.buildingData[i].code ){
									                    		 scope.property.buildingCode = scope.buildingData[i].code.substr(0,3);
									                    		 $scope.getWatch(scope.property.buildingCode);
													    		break;
												            }	 
									                     }
											          }	 
								             };  
							             
										
										$scope.getFloor = function(queryParam){
											return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
								        	      params: {
								        	    	  		query: 'Level/Floor',
								        	    	  		queryParam:queryParam	
								        	      		   }
								        	    }).then(function(res){   
								        	    	 scope.floorData=res.data;	
								        	      return scope.floorData;
								        	    });
							             };   
							             
							             $scope.getFloorDetails = function(floor){
							            	 if(floor!=undefined){
							            		 for( var i in scope.floorData){
							            			 if(floor==scope.floorData[i].code){
												    		scope.property.floor = scope.floorData[i].code.substr(0,2);
												    		$scope.getWatch(scope.property.floor);
											          		break;
											          }	 
								                 }
							            	 }	       	        
							          };
							          
							          
							          $scope.getUnit = function(queryParam){
											return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
								        	      params: {
								        	    	  		query: 'Unit Codes',
								        	    	  		queryParam:queryParam		
								        	      		   }
								        	    }).then(function(res){   
								        	    	 scope.unitData=res.data;	
								        	      return scope.unitData;
								        	    });
							             };   
							             $scope.getunitCode = function(unit){
							            	 if(!angular.isUndefined(unit)){
							                	 scope.property.unitCode=unit.substr(0,4);
							                	if(angular.isUndefined($scope.formData.propertyCode)){
							                	      $scope.getPropertyCode(scope.property.unitCode);
							                	}else{
							                		$scope.getWatch(scope.property.unitCode);
							                	   }					 
										      }	 
							             };
							          
							  		$scope.getPropertyCode=function(unitCode){
										if(scope.property.precinctCode !=undefined&&scope.property.parcel!=undefined&&scope.property.buildingCode!=undefined &&scope.property.floor!=undefined){
									    $scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,unitCode);
									    scope.property.propertyCode=$scope.formData.propertyCode;
									    $scope.getProperty($scope.formData.propertyCode);
										}
									}; 
									
									$scope.getWatch=function(labelValue){
										if(!angular.isUndefined(labelValue)&&!angular.isUndefined(scope.property.propertyCode)){
											$scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,scope.property.unitCode);
										   $scope.getProperty($scope.formData.propertyCode);
										}			
											
									};
									
							    	 $scope.accept = function () {
							    		// scope.property.precinct=$scope.formData.precinct; 
							    		 scope.property.propertyType=$scope.formData.propertyType;
							    		 scope.property.propertyCode=$scope.formData.propertyCode;
							    		 scope.property.street=$scope.formData.street;
							    		 scope.property.state=$scope.formData.state;
							    		 scope.property.country=$scope.formData.country;
							    		 scope.property.poBox=$scope.formData.poBox;
							    		 
							    		 scope.formData.addressNo = $scope.formData.propertyCode;
						    			 scope.formData.street = $scope.formData.street;
						    			// scope.formData.city  =  $scope.formData.precinct; 
						    			 scope.formData.city  =   scope.property.precinct;// $scope.formData.precinct;
						    			 scope.formData.state =  $scope.formData.state;
						    			 scope.formData.country = $scope.formData.country;
						    			 scope.formData.zipCode = $scope.formData.poBox;
						    			 scope.invalidBuildingCode = false;
						    			 $uibModalInstance.dismiss('delete');
						    			 if(!angular.isUndefined(scope.formData.addressNo)){
						    				 $('#propertyCode').attr("disabled","disabled");
						    				 
						    			 }
							      	 };
							         $scope.cancel = function () {
							        	 $uibModalInstance.dismiss('cancel');
							         };
							         
							   	    $scope.getProperty = function(query){
							           	return http.get($rootScope.hostUrl+API_VERSION+'/property', {
							           	      params: {
							           	    	      sqlSearch: query,
							           	    	         limit : 15,
							           	    	         offset:0
							           	      		   }
							           	    }).then(function(res){   
							           	    	 $scope.propertyCodesData=res.data.pageItems;
							           	    	if($scope.propertyCodesData.length>0){
							         	    		 $scope.unitStatus=$scope.propertyCodesData[0].status;
							         	             scope.propetyId=$scope.propertyCodesData[0].id;
							         	             console.log(scope.propetyId);
							         	    		if($scope.unitStatus == 'OCCUPIED'){
							         	    		     $scope.errorData= [];
							       	                     $scope.errorData.push({code:'error.msg.property.code.already.allocated'});
							       	                    $("#generateProperty").addClass("validationerror");
							         	    	}
							       		    }else{
							       		    	
							       		    	delete $scope.errorData;
						     	    	    	scope.propetyId=undefined;
						     	    		   $("#generateProperty").removeClass("validationerror");
							       		        } 
							           	      return scope.propertyCodesData;
							           	 });
							         };
							         
							     }//end of propertyController
							     

							        scope.getExistsProperty = function(query){
							        	scope.invalidBuildingCode = true;
							           	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
							           	      params: {
							           	    	  		query: query
							           	      		   }
							           	    }).then(function(res){   
							           	    	 scope.propertyCodesData=res.data;
							           	      return scope.propertyCodesData;
							           	    });
							             };  
							/*resourceFactory.clientTemplateResource.get(function(data) {
						           
					            scope.cities=data.addressTemplateData.cityData;
					            
					        });*/
							scope.submit = function() {
								console.log(scope.formData);
								if(scope.propertyMaster&&(angular.isUndefined(scope.propetyId))){
					        		delete scope.property.precinctCode;
					        		 resourceFactory.propertyCodeResource.save({},scope.property,function(data){
					        			 scope.propetyId=data.resourceId;
					        			 scope.formData.entityName='EnterName';
					        			 scope.formData.parentEntityId='-1';
					        			 scope.formData.entityCode='EnterCode';
					        			 scope.formData.zipCode=scope.formData.zip;
											delete scope.formData.addressOptionsData;
											delete scope.formData.cityData;
											delete scope.formData.datas;
											delete scope.formData.addressKey;
											delete scope.formData.zip;
											delete scope.formData.id;
											delete scope.formData.addressKey;
											delete scope.formData.addressTypeId;
					        	        	resourceFactory.addressResource.save({clientId: routeParams.id},scope.formData, function(data) {
														location.path('/viewclient/'+ routeParams.id);
													});
					        	        	},function(errorData){
					        	        		 scope.flag = false;
					        		 });
					        }else{
					        	scope.formData.entityName='EnterName';
					        	scope.formData.parentEntityId='-1';
					        	scope.formData.entityCode='EnterCode';
					        	scope.formData.zipCode=scope.formData.zip;
								delete scope.formData.addressOptionsData;
								delete scope.formData.cityData;
								delete scope.formData.datas;
								delete scope.formData.addressKey;
								delete scope.formData.zip;
								delete scope.formData.id;
								delete scope.formData.addressKey;
								delete scope.formData.addressTypeId;
								
								resourceFactory.addressResource.save({clientId: routeParams.id},
										scope.formData, function(data) {
											location.path('/viewclient/'
													+ routeParams.id);
										});
								
					        }
							};
						}
					});
 
	mifosX.ng.application.controller('AddClientAddressController', ['$scope','webStorage', '$routeParams', 'ResourceFactory','dateFilter',
	                                                          '$uibModal','$http','API_VERSION','$rootScope','PermissionService','$filter',
	                                                          '$location', mifosX.controllers.AddClientAddressController]).run(function($log) {
	    $log.info("AddClientAddressController initialized");
	  });
	
}(mifosX.controllers || {}));