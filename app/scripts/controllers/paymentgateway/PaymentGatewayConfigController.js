(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentGatewayConfigController: function(scope, resourceFactory,location,$uibModal,route) {
		  
		  /*paymentgateway Configuration tab start*/
          
          /*scope.getpaymentgatewayData = function(){*/
          	scope.paymentConfigs = [];
          	resourceFactory.paymentGatewayConfigurationResource.get(function(data) {
  				for ( var i in data.globalConfiguration) {
  					scope.paymentConfigs.push(data.globalConfiguration[i]);
  				}
  			});
          /*}*/
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
						//scope.getpaymentgatewayData();
						route.reload();
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
						//scope.getpaymentgatewayData();
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
	                    	//scope.getpaymentgatewayData();
	                    });
	            };
	            
	            scope.disablePaymentGateway = function (id, name) {
	                    var temp = {'enabled': 'false'};
	                    resourceFactory.paymentGatewayConfigurationResource.update({'configId': id}, temp, function (data) {
	                    	//scope.getpaymentgatewayData();
	                    });
	            };
	            
	            /*paymentgateway Configuration tab end*/ 
		  
		  
	  }
  });
  mifosX.ng.application.controller('PaymentGatewayConfigController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$uibModal',
     '$route',
     mifosX.controllers.PaymentGatewayConfigController]).run(function($log) {
    $log.info("PaymentGatewayConfigController initialized");
  });
}(mifosX.controllers || {}));
