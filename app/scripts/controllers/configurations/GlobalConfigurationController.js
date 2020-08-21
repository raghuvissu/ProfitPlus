(function(module) {
    mifosX.controllers = _.extend(module, {
        GlobalConfigurationController: function(scope,webStorage, $uibModal,routeParams,resourceFactory , location,route,filter,webStorage,TENANT) {
            
            scope.clientConfigs = {};
            scope.temp = [];
            scope.myData = [];
            scope.showSmtp = true;
            
        	
        	   var callingTab = webStorage.get('callingTab');
               if(callingTab == null){
               	callingTab="";
               }else{
            	   scope.displayTab=callingTab.someString;
       		 
                if( scope.displayTab === "clientConfigTab"){
       			  
       			  scope.clientConfigTab =  true;
       			  webStorage.remove('callingTab');
       			  
                }else if( scope.displayTab === "paymentConfigTab"){
       			  
       			  scope.paymentConfigTab =  true;
       			  webStorage.remove('callingTab');
       			  
                }else{
       			  webStorage.remove('callingTab');
                }
               }
        /*configuration tab start*/
            function configurationResourceData(){
            	scope.configs = [];
            	resourceFactory.configurationResource.get({tenant:TENANT},function(data) {
            		for(var i in data.globalConfiguration){
            			if(data.globalConfiguration[i].name == 'smtp'){
            				scope.showSmtp = false;
            			}
            			scope.configs.push(data.globalConfiguration[i]);
            		}
            		//webStorage.add("client_configuration",angular.fromJson(data.clientConfiguration)); 
            		 webStorage.add("global_configuration",data.globalConfiguration);
            	});
            }
            configurationResourceData();
            function cacheResouceData(){
            	resourceFactory.cacheResource.get(function(data) {
            		for(var i=0;i<data.length;i++ ){
            			if(data[i].cacheType.id==2){
                        var cache = {};
                        cache.name = 'Is Cache Enabled';
                        cache.enabled =  data[i].enabled;
            		}
                }
                scope.configs.push(cache);
            	});
            }
            cacheResouceData();
            
            scope.enable = function (id, name) {
	        	
                if (name == 'Is Cache Enabled') {
                    var temp = {};
                    temp.cacheType = 2;
                    resourceFactory.cacheResource.update(temp, function (data) {
                    	configurationResourceData();cacheResouceData();
                    });
                }
                else {
                    var temp = {'enabled': 'true'};
                    resourceFactory.configurationResource.update({'configId': id}, temp, function (data) {
                    	configurationResourceData();cacheResouceData();
                    });
                }
            };
            
            scope.disable = function (id, name) {
                if (name == 'Is Cache Enabled') {
                    var temp = {};
                    temp.cacheType = 1;
                    resourceFactory.cacheResource.update(temp, function (data) {
                    	configurationResourceData();cacheResouceData();
                    });
                }
                else {
                    var temp = {'enabled': 'false'};
                    resourceFactory.configurationResource.update({'configId': id}, temp, function (data) {
                    	configurationResourceData();cacheResouceData();
                    });
                }
            };
            
            scope.edit= function(id){
		      	  scope.errorStatus=[];
		      	  scope.errorDetails=[];
		      	  scope.editId=id;
		        	  $uibModal.open({
		                templateUrl: 'editglobal.html',
		                controller:editGlobalController ,
		                resolve:{}
		            });
		        	
		        };
		        
		        var editGlobalController=function($scope,$uibModalInstance){
			      	  
		        	$scope.formData = {}; 
		            $scope.statusData=[];
		            $scope.updateData={};
		            //console.log(scope.editId);
		            
		            
		           // DATA GET
		            resourceFactory.configurationResource.get({configId: scope.editId}, function (data) {
		                $scope.formData = data;//{value: data.value};
		                $scope.formData.value=data.value;
		            });
		            
		         	$scope.accept = function(){
		         		this.updateData.value=this.formData.value;
		         		resourceFactory.configurationResource.update({configId: scope.editId},this.updateData,function(data){ 
		         			$uibModalInstance.close('delete');
		         			configurationResourceData();cacheResouceData();
		                 });
		         	};  
		    		$scope.reject = function(){
		    			$uibModalInstance.dismiss('cancel');
		    		};
		        };
		        
		      scope.globalConfigHelpPopup= function(configId){
			        	  $uibModal.open({
			                templateUrl: 'globalConfigHelpPopup.html',
			                controller:GlobalConfigHelpPopupController ,
			                resolve:{
			                	configId : function(){
			                		return configId;
			                	}
			                }
			            });
			        	
			        };
	        function GlobalConfigHelpPopupController($scope,$uibModalInstance,configId){
		        	for (var j in scope.configs){
            			if(configId == scope.configs[j].id){
            				$scope.module=scope.configs[j].module;
            				$scope.description=scope.configs[j].description;
            				break;
            			}
		        	}
		    		$scope.reject = function(){
		    			$uibModalInstance.dismiss('cancel');
		    		};
		        };
           /*configuration tab end*/ 
		        
		   /*client Configuration tab start*/
		        
	        scope.getClientConfiguration = function(){
	        	 scope.myData = [];
     			 scope.mainObject = webStorage.get('uiConfigData');
     			 scope.clientListObject = webStorage.get("uiConfigData").clientListing;
     			 scope.orderActionListObject = webStorage.get("uiConfigData").orderActions;
     	    	  for (var key in scope.mainObject) {
     	    		 switch (key) {
						case "clientListing":
							
							 scope.value = {};
	       	    			 for (var keyClientList in scope.clientListObject){
	       	    				 if(scope.clientListObject[keyClientList] == 'true'){
	       	    					scope.value[keyClientList] = scope.clientListObject[keyClientList]; 
	       	    				 }
	      	    			 }
	       	    			 scope.myData.push({
	  		  					"name" : key,
	  		  					"value" :scope.value,
	  	    				 }); 
							
							break;
						
						case "orderActions":
							
							 scope.value = {};
	      	    			 for (var keyOrderList in scope.orderActionListObject){
	      	    				 if(scope.orderActionListObject[keyOrderList] == 'true'){
	      	    					scope.value[keyOrderList] = scope.orderActionListObject[keyOrderList]; 
	      	    				 }
	     	    			 }
	      	    			 scope.myData.push({
	 		  					"name" : key,
	 		  					"value" :scope.value,
	 	    				 }); 
							
							break;

						default:
							scope.myData.push({
	 		  					"name" : key,
	 		  					"value" :scope.mainObject[key],
							});
							break;
						}
     	    	  }
	        };
           
	        scope.clientConfigChange = function(name,value,html){
            	
            	if(value == 'true'){
            		scope.oldValue = value;
            		scope.newValue = false;
            	}else{
            		scope.oldValue = value;
            		scope.newValue = true;
            	}
            	var tempclient = {"name":name,"newValue":scope.newValue,"oldValue":scope.oldValue};
            	resourceFactory.clientConfigurationResource.update({tenant:TENANT},tempclient, function (data) {
            		webStorage.add("client_configuration",angular.fromJson(angular.toJson(data)));
            		scope.getClientConfiguration();
                    if(html == 'editclientlisting.html'){scope.editClientListing();}
                    else if(html == 'editregestrationlisting.html'){scope.editRegistrationListing();}
                    else if(html == 'editorderactions.html'){scope.editOrderActions();};
                });
            };
            
            scope.editClientConfigs = function(name,value){
	          	  scope.oldValue = value;
	          	  scope.clientConfigName = name;
	                $uibModal.open({
	                    templateUrl: 'editClientConfig.html',
	                    controller: Approve,
	                    resolve:{}
	                });
	            };
	            
            function Approve($scope, $uibModalInstance) {
            	$scope.data = {};
            	$scope.dates = [
	                      	        'dd MMM yyyy',
	                                'dd MMMM yyyy',
	                                'dd/MMM/yyyy',
	                                'dd/MMMM/yyyy',
	                                'dd-MMM-yyyy',
	                                'dd-MMMM-yyyy',
	                                'MMM-dd-yyyy',
	                                'MMMM-dd-yyyy',
	                                'MMM dd yyyy',
	                                'MMMM dd yyyy',
	                                'MMM/dd/yyyy',
	                                'MMMM/dd/yyyy'
	                                  
	                           ];
            	$scope.data.value = scope.oldValue;
            	$scope.data.name = scope.clientConfigName;
                $scope.approve = function (newValue) {
                	var tempclientConfig = {"name":scope.clientConfigName,"newValue":newValue,"oldValue":scope.oldValue};
                    scope.approveData = {};
                    resourceFactory.clientConfigurationResource.update({tenant:TENANT},tempclientConfig, function (data) {
                    	webStorage.add("client_configuration",angular.fromJson(angular.toJson(data)));
                		scope.getClientConfiguration();
                    });
                    $uibModalInstance.close('delete');
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
            
            scope.editClientListing=function(name, value){
                $uibModal.open({
                    templateUrl: 'editclientlisting.html',
                    controller: ApproveClientListing,
                    resolve:{}
                });
            };
            scope.editRegistrationListing=function(){
            	$uibModal.open({
            		templateUrl: 'editregestrationlisting.html',
            		controller: ApproveRegistrationListing,
            		resolve:{}
            	});
            };
            scope.editOrderActions=function(){
            	$uibModal.open({
            		templateUrl: 'editorderactions.html',
            		controller: ApproveOrderActions,
            		resolve:{}
            	});
            };
           function ApproveClientListing($scope, $uibModalInstance) {
        	   
          	  	$scope.clientListData = [];
          	  	$scope.tempData = [];
          	  	$scope.tempData = webStorage.get("client_configuration").clientListing;
          	  	for (var key in $scope.tempData) {
  	    			  $scope.clientListData.push({
		  					"name" : key,
		  					"value" :$scope.tempData[key].toString(),
  	    			  });
          	  	}
                $scope.approve = function (name, value) {
                    scope.approveData = {};
                    scope.clientConfigChange(name, value , 'editclientlisting.html');
                    //webStorage.add('callingTab',{someString:'clientConfigTab'});
                    $uibModalInstance.close('delete');
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
           
           function ApproveRegistrationListing($scope, $uibModalInstance) {
        	   
        	   $scope.registrationListData = [];
        	   $scope.tempData = [];
        	   $scope.tempData = webStorage.get("client_configuration").registrationListing;
        	   for (var key in $scope.tempData) {
        		   $scope.registrationListData.push({
        			   "name" : key,
        			   "value" :$scope.tempData[key].toString(),
        		   });
        	   }
        	   $scope.approve = function (name, value) {
        		   scope.approveData = {};
        		   scope.clientConfigChange(name, value , 'editregestrationlisting.html');
        		   //webStorage.add('callingTab',{someString:'clientConfigTab'});
        		   $uibModalInstance.close('delete');
        	   };
        	   $scope.cancel = function () {
        		   $uibModalInstance.dismiss('cancel');
        	   };
           }
           function ApproveOrderActions($scope, $uibModalInstance) {
        	   
         	  	$scope.orderActionsData = [];
         	  	$scope.tempData = [];
         	  	$scope.tempData = webStorage.get("client_configuration").orderActions;
         	  	for (var key in $scope.tempData) {
	    			  $scope.orderActionsData.push({
	  					"name" : key,
	  					"value" :$scope.tempData[key].toString(),
	    			  });
         	  	}
               $scope.approve = function (name, value) {
                   scope.approveData = {};
                   scope.clientConfigChange(name, value , 'editorderactions.html');
                   $uibModalInstance.close('delete');
               };
               $scope.cancel = function () {
                   $uibModalInstance.dismiss('cancel');
               };
           }
           /*client Configuration tab end*/
           
           /*paymentgateway Configuration tab start*/
               
            scope.getpaymentgatewayData = function(){
            	scope.paymentConfigs = [];
            	resourceFactory.paymentGatewayConfigurationResource.get(function(data) {
    				for ( var i in data.globalConfiguration) {
    					scope.paymentConfigs.push(data.globalConfiguration[i]);
    				}
    			});
            }
            scope.editPaymentGateway = function(id,name,value) {
				scope.errorStatus = [];
				scope.errorDetails = [];
				var v = angular.fromJson(value);
				if(typeof(v) == "object"){
					$uibModal.open({
						templateUrl : 'editconfig.html',
						controller : editConfigController,
						resolve : {
							configId: function () {
						          return id;
						        }
						}
					});
				}else {
					$uibModal.open({
						templateUrl : 'editgeneral.html',
						controller : editgeneralController,
						resolve : {
							configId: function () {
						          return id;
						        }
						}
					});
				}
			};
			
			function editConfigController($scope, $uibModalInstance,configId) {
				$scope.keyValues = [];
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : configId }, function(data) {		
					var val = angular.fromJson(data.value);
					if(Object.keys(val).length==0){
						$scope.createConfigParams();
					}else{
						for(var i in Object.keys(val)){
							var key = Object.keys(val)[i];
							var value = val[key];
							$scope.keyValues.push({key : key , value : value,disable:true});
						}
					}
				});
				
				$scope.createConfigParams = function(){
					$scope.keyValues.push({key : "" , value : "",disable:false});
				};
				$scope.editConfigParams = function(index,key){
					$(".configParam"+key).removeAttr("disabled");
					$scope.keyValues[index].disable = false;
				};
				$scope.deleteConfigParams = function(index){
					$scope.keyValues.splice(index,1);
				};
				
				$scope.submit = function() {
					$scope.editedData = {};
					for(var i in $scope.keyValues){
						$scope.editedData[$scope.keyValues[i].key] = $scope.keyValues[i].value;
					}
						
					$scope.updateData = {value:angular.toJson($scope.editedData)};
					resourceFactory.paymentGatewayConfigurationResource.update({configId : configId}, $scope.updateData, function(data) {
						$uibModalInstance.close('delete');
						scope.getpaymentgatewayData();
					});
				};
				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};
			
			function editgeneralController($scope, $uibModalInstance,configId) {

				$scope.formData = {};
				$scope.updateData = {};
	
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : configId }, function(data) {		
					$scope.formData.value = data.value;
				});

				$scope.submit = function() {
					resourceFactory.paymentGatewayConfigurationResource.update({configId : configId}, $scope.formData, function(data) {
						$uibModalInstance.close('delete');
						scope.getpaymentgatewayData();
					}, function(errData) {
						$scope.paypalFlag = false;
					});
				};
				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};
			};

			scope.viewPaymentGateway= function(id){
		      	  scope.errorStatus=[];
		      	  scope.errorDetails=[];
		      	  scope.paymentconfigId=id;
		        	  $uibModal.open({
		                templateUrl: 'viewPaymentgateway.html',
		                controller:viewPaymentgatewaycontroller ,
		                resolve:{}
		            });
		        	
		        };
		        
		        function viewPaymentgatewaycontroller($scope,$uibModalInstance){
		     //console.log(scope.paymentConfigs);
	        	for (var k in scope.paymentConfigs){
      			if(scope.paymentconfigId == scope.paymentConfigs[k].id){
      				$scope.description=scope.paymentConfigs[k].description;
      				break;
      			}
	        	}
	      
	    		$scope.reject = function(){
	    			$uibModalInstance.dismiss('cancel');
	    		};
	        };
			
			
            scope.edit= function(id){
		      	  scope.errorStatus=[];
		      	  scope.errorDetails=[];
		      	  scope.editId=id;
		        	  $uibModal.open({
		                templateUrl: 'editglobal.html',
		                controller:editGlobalController ,
		                resolve:{}
		            });
		        	
		        };

		        var editGlobalController=function($scope,$uibModalInstance){
			      	  
		        	$scope.formData = {}; 
		            $scope.statusData=[];
		            $scope.updateData={};
		            //console.log(scope.editId);
		            
		            
		           // DATA GET
		            resourceFactory.configurationResource.get({configId: scope.editId}, function (data) {
		                $scope.formData = data;//{value: data.value};
		                $scope.formData.value=data.value;
		            });
		            
		         	$scope.accept = function(){
		         		$scope.flag=true;
		         		this.updateData.value=this.formData.value;
		         		resourceFactory.configurationResource.update({configId: scope.editId},this.updateData,function(data){ 
		                  route.reload();
		                  $uibModalInstance.close('delete');
		                  },function(errData){
		                  $scope.flag = false;
		                });
		         	};  
		    		$scope.reject = function(){
		    			$uibModalInstance.dismiss('cancel');
		    		};
		        };
		        
		        
		        scope.popup= function(id){
			      	  scope.errorStatus=[];
			      	  scope.errorDetails=[];
			      	  scope.configId=id;
			        	  $uibModal.open({
			                templateUrl: 'globalconfigpopup.html',
			                controller:globalpopupcontroller ,
			                resolve:{}
			            });
			        	
			        };
			        
			        function globalpopupcontroller($scope,$uibModalInstance){
			      /*console.log(scope.configs);*/
		        	for (var j in scope.configs){
            			if(scope.configId == scope.configs[j].id){
            				$scope.module=scope.configs[j].module;
            				$scope.description=scope.configs[j].description;
            				break;
            			}
		        	}
		      
		    		$scope.reject = function(){
		    			$uibModalInstance.dismiss('cancel');
		    		};
		        };
		        
		        scope.enable = function (id, name) {
		        	
	                if (name == 'Is Cache Enabled') {
	                    var temp = {};
	                    temp.cacheType = 2;
	                    resourceFactory.cacheResource.update(temp, function (data) {
	                        route.reload();
	                    });
	                }
	                else {
	                    var temp = {'enabled': 'true'};
	                    resourceFactory.configurationResource.update({'configId': id}, temp, function (data) {
	                        route.reload();
	                        webStorage.add("global_configuration",data.globalConfiguration);
	                    });
	                }
	            };
	            
	            scope.disable = function (id, name) {
	                if (name == 'Is Cache Enabled') {
	                    var temp = {};
	                    temp.cacheType = 1;
	                    resourceFactory.cacheResource.update(temp, function (data) {
	                        route.reload();
	                    });
	                }
	                else {
	                    var temp = {'enabled': 'false'};
	                    resourceFactory.configurationResource.update({'configId': id}, temp, function (data) {
	                        route.reload();
	                        webStorage.add("global_configuration",data.globalConfiguration);
	                    });
	                }
	            };

	            scope.enablePaymentGateway = function (id, name) {

	                    var temp = {'enabled': 'true'};
	                    resourceFactory.paymentGatewayConfigurationResource.update({'configId': id}, temp, function (data) {
	                    	scope.getpaymentgatewayData();
	                    });
	            };
	            
	            scope.disablePaymentGateway = function (id, name) {
	                    var temp = {'enabled': 'false'};
	                    resourceFactory.paymentGatewayConfigurationResource.update({'configId': id}, temp, function (data) {
	                    	scope.getpaymentgatewayData();
	                    });
	            };
	            
				/*paymentgateway Configuration tab end*/ 
	            
	        }
	    });

       
   
    mifosX.ng.application.controller('GlobalConfigurationController', ['$scope', 'webStorage', '$uibModal', '$routeParams', 'ResourceFactory', '$location','$route',
                                                                       '$filter','webStorage','TENANT', mifosX.controllers.GlobalConfigurationController]).run(function($log) {
        $log.info("GlobalConfigurationController initialized");
    });
}(mifosX.controllers || {}));
