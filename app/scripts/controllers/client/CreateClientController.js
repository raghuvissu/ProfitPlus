(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateClientController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,
    								$rootScope,$upload,filter,$uibModal,PermissionService,webStorage,uiConfigService) {

    	scope.formData = {};
       
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
        scope.isEmailEnable = false;
        scope.preferences = [];
        /*scope.response = webStorage.get("uiConfigData");
        console.log(webStorage.get("uiConfigData"));
        if('response.IsClientIndividual' == true){
        	scope.formData.entryType ='IND';
        }else{
        	scope.formData.entryType ='ORP';
        }*/
        var IsClientIndividual =  webStorage.get('uiConfigData').IsClientIndividual;
        if(IsClientIndividual == 'false'){
        	scope.formData.entryType ='IND';
        }else{
        	scope.formData.entryType ='ORP';
        }
        
        var global_configuration = webStorage.get("global_configuration");//is-selfcareuser
        for(var i in global_configuration){
        	if(global_configuration[i].name == 'is-selfcareuser'){
        		scope.isEmailEnable = global_configuration[i].enabled;
        	}
        }
        
        /*var global_configuration = webStorage.get("global_configuration");//is-selfcareuser
        for(var i in global_configuration){
        	if(global_configuration[i].name == 'is-selfcareuser'){
        		scope.isSelfcareUser = global_configuration[i].enabled;
        	}
        }*/

        /*scope.propertyMaster = webStorage.get("is-propertycode-enabled");
        scope.clientAddInfo = webStorage.get("client-additional-data");*/
       
        resourceFactory.clientTemplateResource.get(function(data) {
            //scope.offices = data.officeOptions;
            //scope.formData.officeId = data.officeId;
            scope.cities=data.addressTemplateData.cityData;
            scope.clientCategoryDatas=data.clientCategoryDatas;
            scope.groupNameDatas = data.groupNameDatas;
            scope.formData.clientCategory=scope.clientCategoryDatas[0].id;
            scope.configurationProperty=data.loginConfigurationProperty.enabled;
            scope.preferences = data.preferences;
           
            
            
            if(data.clientAdditionalData){
            scope.nationalityDatas= data.clientAdditionalData.nationalityDatas;
            scope.genderDatas= data.clientAdditionalData.genderDatas;
            scope.ageGroupDatas = data.clientAdditionalData.ageGroupDatas;
            scope.customeridentificationDatas= data.clientAdditionalData.customeridentificationDatas;
            scope.cummunitcationDatas= data.clientAdditionalData.cummunitcationDatas;
            scope.languagesDatas= data.clientAdditionalData.languagesDatas;
            }
            
            
        });
        scope.getData = function(query){
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
        
        scope.getStateAndCountry=function(city){
    	  
      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
          		scope.formData.state = data.state;
          		scope.formData.country = data.country;
      	  });
        };
        
        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
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
            				 scope.formData.zipCode = scope.propertyCodesData[j].poBox;
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

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        };
        scope.setChoice = function(){
            if(this.formData.active){
                scope.choice = 1;
            }
            else if(!this.formData.active){
                scope.choice = 0;
            }
        };
        scope.dbClick = function(){
        	console.log("dbclick");
        	return false;
        };
        
        scope.submit = function() {
        	if(scope.propertyMaster&&(angular.isUndefined(scope.propetyId))){
        		delete scope.property.precinctCode;
        		 resourceFactory.propertyCodeResource.save({},scope.property,function(data){
        			 scope.propetyId=data.resourceId;
        	        	scope.flag = true;
        	            var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
        	            scope.formData.locale = scope.optlang.code;
        	            scope.formData.active = true;
        	            scope.formData.dateFormat = 'dd MMMM yyyy';
        	            scope.formData.activationDate = reqDate;
        	            scope.formData.flag=scope.configurationProperty;
        	            scope.formData.locale = scope.optlang.code;
        	            scope.formData.dateFormat = 'dd MMMM yyyy';
        	            if(scope.date.dateOfBirth){scope.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
        	            resourceFactory.clientResource.save(scope.formData,function(data){
        	            	
        	              if (scope.myFile) {
        	            	  $upload.upload({
        	                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
        	                  data: {},
        	                  file: scope.myFile
        	                }).then(function(imageData) {
        	                  // to fix IE not refreshing the model
        	                  if (!scope.$$phase) {
        	                    scope.$apply();
        	                  }
        	                  if(scope.clientAddInfo){
        	            		  location.path('/clientadditionalinfo/' + data.resourceId);
        	            	  }else if(PermissionService.showMenu('READ_CLIENT')){
        	                	  location.path('/viewclient/id/'+data.resourceId);
        	            	  }else{
        	                	  location.path('/clients');
        	            	  }
        	                });
        	              } else{
        	            	  if(scope.clientAddInfo){
        	            		  location.path('/clientadditionalinfo/' + data.resourceId);
        	            	  }else if(PermissionService.showMenu('READ_CLIENT')){
        	            		  location.path('/viewclient/id/' + data.resourceId);
        	            	  }else{
        	            		  location.path('/clients');
        	            	  }
        	              }
        	            },function(errData){
        	          	  scope.flag = false;
        	            });
        	        	},function(errorData){
        	        		 scope.flag = false;
        		 });
        }else{
        	scope.flag = true;
            var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
            this.formData.locale = scope.optlang.code;
            this.formData.active = true;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.activationDate = reqDate;
            this.formData.flag=scope.configurationProperty;
            this.formData.locale = scope.optlang.code;
            this.formData.dateFormat = 'dd MMMM yyyy';
           	for(var i in scope.officeDetails){
           		if(scope.officeDetails[i].externalId == scope.formData.officeId){
           			scope.formData.officeId = scope.officeDetails[i].id;
           		}
           	}
            if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
            resourceFactory.clientResource.save(this.formData,function(data){
            	
              if (scope.myFile) {
            	  $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.myFile
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
                	  location.path('/viewclient/id/'+data.resourceId);
            	  }else{
                	  location.path('/clients');
            	  }
                });
              } else{
            	  console.log("")
            	  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
            		  location.path('/viewclient/id/' + data.resourceId);
            	  }else{
            		  location.path('/viewclient/id/' + data.resourceId);
            	  }
              }
            },function(errData){
          	  scope.flag = false;
            });
        	}
        };
    }
  });
  mifosX.ng.application.controller('CreateClientController', [
                                                              '$scope',
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              '$http', 
                                                              'dateFilter',
                                                              'API_VERSION',
                                                              '$rootScope',
                                                              'Upload',
                                                              '$filter',
                                                              '$uibModal',
                                                              'PermissionService',
                                                              'webStorage',
                                                              'UIConfigService',
                                                              mifosX.controllers.CreateClientController]).run(function($log) {
    $log.info("CreateClientController initialized");
  });
}(mifosX.controllers || {}));
