(function(module) {
  mifosX.controllers = _.extend(module, {
	  OrderController: function(scope,webStorage,routeParams,route,resourceFactory,location,$uibModal,dateFilter,paginatorService,
			  				PermissionService,$rootScope) {
        scope.orderPriceDatas = [];
        scope.orderHistorydata=[];
        scope.orderData=[];
        scope.redata={};
        scope.formData=[];
        scope.provisioning={};
        scope.commandData = [];
        scope.start = {};
        scope.start.date = new Date();
        var orderId=routeParams.id;
        scope.isextensionEnable=false;
        scope.clientId=routeParams.clientId;
        scope.uiConfigData = "";
        scope.isTopup = "";
        /*scope.walletConfig = webStorage.get('is-wallet-enable');
        scope.config = webStorage.get("client_configuration").orderActions;*/
        scope.uiConfigData = webStorage.get('uiConfigData');
        console.log(scope.uiConfigData);
         
         var clientData = webStorage.get('clientData');
         webStorage.add("orderId",routeParams.id);
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
         scope.image=clientData.image;
         
         webStorage.add("orderId",routeParams.id);
         webStorage.add("chargeCode",routeParams.id);
         scope.PermissionService = PermissionService;
         scope.provisioningdatas =[];
         scope.orderAddonsDatas =[];
      scope.clientServiceId = routeParams.clientServiceId;
        resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
           
        	scope.orderPriceDatas= data.orderPriceData;
            scope.orderHistorydata=data.orderHistory;
            scope.orderData=data.orderData;
            scope.orderAddonsDatas=data.orderAddonsDatas;
           var endDate = new Date(scope.orderData.endDate);
            var curDate = new Date(scope.orderData.currentDate);
            /*if(dateFilter(endDate.setDate(endDate.getDate()))==dateFilter(curDate.setDate(curDate.getDate()))||
            		dateFilter(endDate.setDate(endDate.getDate()+1))==dateFilter(curDate.setDate(curDate.getDate())))
            */
            scope.formData.flag=data.flag;
            scope.orderServicesData=data.orderServices;
            scope.orderDiscountDatas=data.orderDiscountDatas;
          
      
	    if(data.orderData.isPrepaid == 'Y'){
            	scope.formData.isPrepaid="Pre Paid";
            	scope.plantype="prepaid";
            }else{
            	scope.formData.isPrepaid="Post Paid";
            	scope.plantype="postpaid";
            }
	    var endDate = new Date(scope.orderData.endDate);
        var curDate = new Date(scope.orderData.currentDate);
        if((dateFilter(endDate.setDate(endDate.getDate()))<=dateFilter(curDate.setDate(curDate.getDate())))&&
                (dateFilter(endDate.setDate(endDate.getDate()+1))>=dateFilter(curDate.setDate(curDate.getDate()))))
        	scope.isextensionEnable=true;
        else scope.isextensionEnable=false;
        
        webStorage.add("orderData", {groupName: data.orderData.groupName,orderNo:data.orderData.orderNo,planName: data.orderData.planCode,
        	chargeCode:scope.orderPriceDatas[0].billingFrequency,planId : data.orderData.pdid,startDate : data.orderData.startDate,
        	endDate : data.orderData.endDate,billingCycle :scope.orderPriceDatas[0].billingCycle,contractPeriod :data.orderData.contractPeriod });
        
        });
        
    
        
       if(PermissionService.showMenu('READ_ASSOCIATION')){ 
    	   resourceFactory.associationResource.getAssociation({clientId: routeParams.clientId,id:routeParams.id} , function(data) {
    		   scope.association = data;
    		   if(data.orderId){
    			   scope.flag=true;
    		   }else{
    			   scope.flag=false;
    		   }
    	   });
       }
        
        scope.reconnect = function (){
        	scope.errorStatus=[];scope.errorDetails=[];
        	 $uibModal.open({
                 templateUrl: 'ApproveReconnect.html',
                 controller: ApproveReconnect,
                 resolve:{}
             });
          };
          
          scope.reactive= function (){
          	 $uibModal.open({
                   templateUrl: 'ApproveReactive.html',
                   controller: ApproveReactive,
                   resolve:{}
               });
            };
          
          scope.terminate = function (){
          	scope.errorStatus=[];scope.errorDetails=[];
          	 $uibModal.open({
                   templateUrl: 'ApproveTerminate.html',
                   controller: ApproveTerminate,
                   resolve:{}
               });
            };
            
            scope.confirmRequest = function (provId){
              	scope.errorStatus=[];
              	scope.errorDetails=[];
              	scope.provId=provId;
              	 $uibModal.open({
                       templateUrl: 'ApproveConfirm.html',
                       controller: ApproveConfirm,
                       resolve:{}
                   });
                };
            
            scope.suspend = function (){
              	scope.errorStatus=[];scope.errorDetails=[];
              	 $uibModal.open({
                       templateUrl: 'ApproveSuspend.html',
                       controller: ApproveSuspend,
                       resolve:{}
                   });
                };
          
          scope.orderDisconnect = function(orderDisUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $uibModal.open({
                  templateUrl: 'OrderDisconnect.html',
                  controller: OrderDisconnectController,
                  resolve:{}
              });
          };
          
          scope.orderRenew = function(orderRenewUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $uibModal.open({
        		  templateUrl: 'OrderRenewal.html',
        		  controller: OrderRenewalController,
        		  resolve:{}
        	  });
          };
          scope.cancelOrder=function(){
        	  
        	    resourceFactory.saveOrderResource.delete({'clientId':routeParams.id},{},function(data){
        	    	 location.path('/viewclient/id/' + routeParams.clientId);
                });
          }
          scope.CommandCenter = function(CommandCenterUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
          	  $uibModal.open({
                  templateUrl: 'ProvisioningSystemPop.html',
                  controller: ProvisioningSystemPopController,
                  resolve:{}
              });
          	
          };
          
          scope.applyPromo= function(){
        	  scope.errorStatus=[];
        	  scope.errorDetails=[];
          	  $uibModal.open({
                  templateUrl: 'Promo.html',
                  controller:applyPromoController ,
                  resolve:{}
              });
          	
          };
          
          scope.disconnectAddon = function(value){
        	  scope.addonId=value;
              $uibModal.open({
                  templateUrl: 'disconnectaddon.html',
                  controller: ApproveDisconnection,
                  resolve:{}
              });
          };
          
          function ApproveDisconnection($scope, $uibModalInstance) {
        	  
              $scope.approve = function () {
                  scope.approveData = {};
                  resourceFactory.orderaddonResource.remove({orderId:scope.addonId},{},function(){
                      route.reload();
                  });
                  $uibModalInstance.close('delete');
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          }
          
      var applyPromoController=function($scope,$uibModalInstance){
    	  $scope.start = {};
    	  $scope.start.date =new Date();
    	  resourceFactory.promotionResource.get(function(data) {
      		
      		 $scope.promoDatas=data; 
          });
      	 
       	$scope.accept = function(){
       		$scope.flagPromo=true;
       		var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.locale=$rootScope.locale.code;
            this.formData.startDate = reqDate;
       		resourceFactory.applyPromotionCodeResource.update({'orderId': routeParams.id},this.formData,
       				
     		function(data) {
     			 
     			     },function(errData){
     			    	$scope.flagPromo=false;
         	         	//$scope.renewError = errData.data.errors[0].userMessageGlobalisationCode;
         		});

       		    route.reload();
       		 //location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
			 $uibModalInstance.close('delete');

    	  
      };  
      
  	$scope.rejectProvisioning = function(){
  		$uibModalInstance.dismiss('cancel');
  	};
      };
      
      scope.extension= function(){
    	  scope.errorStatus=[];
    	  scope.errorDetails=[];
      	  $uibModal.open({
              templateUrl: 'extension.html',
              controller:extensionController ,
              resolve:{}
          });
      	
      };
      scope.provision = function(){
    	  $uibModal.open({
              templateUrl: 'editProvision.html',
              controller: EditProvisionController,
              resolve:{}
          });	
      }
      
      //sent message pop up start 
      scope.sentMessagePopup = function(id){
    	  
    	  scope.provisioningDataId = id;
    	  $uibModal.open({
              templateUrl: 'sentMessage.html',
              controller: SentMessageController,
              resolve:{}
          });	
      }
      
      var SentMessageController = function($scope,$uibModalInstance){
    	  
    	  $scope.sentMessage = {};
    	  $scope.messageData = [];
    	  
    	  for (var i in scope.sentMessagesData){
    		  	
    		 if( scope.sentMessagesData[i].id == scope.provisioningDataId){
    			 
    			 try{
    				 var obj  = JSON.parse(scope.sentMessagesData[i].sentMessage);
    				 $scope.sentMessage = obj;
    			 }catch(e){
    				 console.log(e.message);
    			 }
    			 
    	    	  for (var key in $scope.sentMessage) {
    	    		  if(key == "IP_ADDRESS"){
    	    			  var outerStr = $scope.sentMessage[key].toString();$scope.sentMessage[key] = [];
    	    			  $scope.sentMessage[key].push({"key":outerStr,"value":""});
    	    			  $scope.messageData.push({
		  											"key" : key,
		  											"value" :$scope.sentMessage[key],
    	    			   });	
    	    			  
    	    		  }else{
    	    			  var outerObj = $scope.sentMessage[key];$scope.sentMessage[key] = [];
    	    			  if(typeof(outerObj) == 'object'){
    	    				  var obj1 = outerObj[0];
    	    				  if(typeof(obj1) == 'string'){
    	    					  try {
    	    						  var obj2 = JSON.parse(obj1);
    	    						  outerObj = [];outerObj.push(obj2);
    	    					  }catch(e) {
    	    						  console.log(e.message);
    	    					  }
    	    				  }
	    	    			  for(var key1 in outerObj){ var innerObj = outerObj[key1];
	    	    				  for(var key2 in innerObj){
	    	    					  $scope.sentMessage[key].push({"key":key2,"value":innerObj[key2]});
	    	    				  };
	    	    			  };
    	    			  }else{
    	    				  $scope.sentMessage[key].push({"key":outerObj,"value":""});
    	    			  }
    	    			  $scope.messageData.push({
    	    			  						"key" : key,
    	    			  						"value" : $scope.sentMessage[key],
    	    			  });	
    	    		  }
    	    	  };
   	    		break;
    		 };
    	  }
    	  
			$scope.cancel = function(){
				$uibModalInstance.dismiss('cancel');
			};
    };
     //sent message pop up end 
    
      var EditProvisionController = function($scope,$uibModalInstance){
			$scope.parameterDatas = [];
			resourceFactory.provisioningtemplateDataResource.get({orderId: routeParams.id}, function(data) {
					$scope.parameterDatas = data.parameterDatas;
			});
	
			$scope.cancel = function(){
				$uibModalInstance.dismiss('cancel');
			};
      };
      
      scope.getAllProvisioningDetails = function (orderNo) {
          
          scope.orderNumber = orderNo;
          resourceFactory.provisioningtemplateMappingResource.query({orderNo:orderNo} , function(data) {
              scope.provisioningdatas = data;
              scope.sentMessagesData = [];
              for(var i in data){
            	  scope.sentMessagesData.push(data[i]);
              };
              
            });
      };
      
      var extensionController=function($scope,$uibModalInstance){
    	  
    	  resourceFactory.orderExtensionResource.get(function(data) {
	            $scope.extensionReasonDatas = data.reasons;
	            $scope.extensionPeriodDatas = data.extensionPeriodDatas;
	        });
       	$scope.accept = function(){
       		$scope.flagExtension=true;
       		resourceFactory.orderExtensionResource.update({orderId: routeParams.id} ,this.formData, function(data) {  
                
                /*resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                          scope.orderPriceDatas= data.orderPriceData;
                          scope.orderHistorydata=data.orderHistory;
                          scope.orderData=data.orderData;
                      });*/
                route.reload();
                      $uibModalInstance.close('delete');
                  },function(errData){
                $scope.flagApproveReconnect = false;
                 });
       	};  
  		$scope.rejectExtension = function(){
  			$uibModalInstance.dismiss('cancel');
  		};
      };
       		
     var ProvisioningSystemPopController = function($scope,$uibModalInstance){
    	 	$scope.formData = {};
    	 	$scope.commandData =  [];
    	 	
         	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
         		 $('#commandName').hide();
         		 $scope.commandData=data; 
             });
         	 
         	$scope.commandName=function(name){
          		$scope.formData.commandName=='OSM' ? $('#commandName').show() : $('#commandName').hide();
         	}
          		
          	$scope.acceptProvisioning = function(){
          				
          		if($scope.formData.commandName=='OSM'){
          				
        				resourceFactory.osdResource.save($scope.formData, function(data) {
        					  $uibModalInstance.close('delete');
        					 location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
        				 },function(renewalErrorData){
            	         	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
            			});
          		}else{
          			resourceFactory.osdResource.getPost($scope.formData, function(data) {
          					$uibModalInstance.close('delete');           
          					location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
          			 },function(renewalErrorData){
          				 	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
         		    });
          		};
          		  
          	};
          	
          	$scope.rejectProvisioning = function(){
          		$uibModalInstance.dismiss('cancel');
          	};
          };
          
    	var ApproveReconnect = function ($scope, $uibModalInstance) {
    		
            $scope.approveReconnect = function () {

            	$scope.flagApproveReconnect=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	resourceFactory.OrderreconnectResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $uibModalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $uibModalInstance.dismiss('cancel');
            };
        };
        
	var ApproveReactive = function ($scope, $uibModalInstance) {
    		
            $scope.approveReactive= function () {

            	$scope.flagApproveReactive=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	resourceFactory.OrderReactiveResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $uibModalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $uibModalInstance.dismiss('cancel');
            };
        };
        
        
  var ApproveTerminate = function ($scope, $uibModalInstance) {
    		
            $scope.approveTerminate = function () {

            	$scope.flagapproveTerminate=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	resourceFactory.OrderTerminateResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $uibModalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $uibModalInstance.dismiss('cancel');
            };
        };
        
 var ApproveConfirm= function ($scope, $uibModalInstance) {
    		
            $scope.approveTerminate = function () {

            	$scope.flagapproveTerminate=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	  resourceFactory.confirmProvisioningDetailsResource.update({'provisioningId':scope.provId},{},function(data){
            		/*resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);*/
            		  scope.getAllProvisioningDetails(scope.orderNumber);
                    $uibModalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $uibModalInstance.dismiss('cancel');
            };
        };  
        
 var ApproveSuspend = function ($scope, $uibModalInstance) {
	 
	 $scope.reasons = [];
	 $scope.start = {};
	 $scope.start.date = new Date();
	 $scope.maxDate=new Date();
	  resourceFactory.OrderSuspensionResource.get(function(data) {
         $scope.reasons = data.reasons;
     });
    		
            $scope.approveSuspend= function () {

            	$scope.flagapproveTerminate=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	  var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
      	        this.formData.dateFormat = 'dd MMMM yyyy';
      	        this.formData.suspensionDate = reqDate;
      	      
      	        this.formData.locale =$rootScope.locale.code;
            	resourceFactory.OrderSuspensionResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $uibModalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
	        		$scope.renewError = errData.data.errors[0].userMessageGlobalisationCode;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }; 
        

          
          var OrderRenewalController = function($scope,$uibModalInstance){
        	  $scope.subscriptiondatas = [];
        	  resourceFactory.OrderrenewalResourceTemplate.get({orderId:routeParams.id,planType:scope.plantype},function(data) {
                  $scope.subscriptiondatas = data.subscriptiondata;
              });

        	  $scope.formData={};
        	  $scope.renewalPrice=function(subscriptionId){
        		  for(var i in $scope.subscriptiondatas){
        			  if(subscriptionId ==$scope.subscriptiondatas[i].id){
        				  $scope.formData.priceId = $scope.subscriptiondatas[i].priceId;
        				  break;
        			  };
        		  };

        	  };
        	  
        	  $scope.approveRenewal = function(){
        		  $scope.flagOrderRenewal=true;
        		  
        		  if($scope.formData == undefined || $scope.formData == null){

        			  $scope.formData.renewalPeriod="";
        			  $scope.formData.description="";
        		  }
        		  
        		  resourceFactory.OrderrenewalResource.save({'orderId': routeParams.id},this.formData,function(data){
        	            //location.path('/vieworder/'+data.resourceId);
        	            
        	            resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
        	            scope.orderPriceDatas= data.orderPriceData;
        	            scope.orderHistorydata=data.orderHistory;
        	            scope.orderData=data.orderData;
        	            });
        	             
        	            $uibModalInstance.close('delete');
        	            
        	        },function(renewalErrorData){
        	      	  $scope.flagOrderRenewal=false;
        	        	//$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
        	        	//$scope.errorArg = renewalErrorData.data.errors[0].args;
        	        });
        	  };
        	  $scope.cancelRenewal = function(){
        		  $uibModalInstance.dismiss('cancel');
        	  };
          };
          
          
          var OrderDisconnectController = function ($scope, $uibModalInstance) {
              
        	  $scope.disconnectDetails = [];
        	  $scope.start = {};
        	  $scope.start.date = new Date();
              resourceFactory.OrderDisconnectResource.get(function(data) {
                  $scope.disconnectDetails = data.disconnectDetails;
              });
        	  
        	  $scope.approveDisconnection = function () {
        		  $scope.flagOrderDisconnect=true;
        		  if(this.formData == undefined || this.formData == null){
        			  this.formData = {"disconnectReason":""};
        		  }
        		  
        		  var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
        	        this.formData.dateFormat = 'dd MMMM yyyy';
        	        this.formData.disconnectionDate = reqDate;
        	        this.formData.locale = $rootScope.locale.code;
        		  
        		  resourceFactory.saveOrderResource.update({'clientId': routeParams.id},this.formData,function(data){
        	            /*location.path('/viewclient/'+scope.orderPriceDatas[0].clientId);
        	            location.path('/vieworder/'+data.resourceId);*/
        			  	
        			  resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
        		            scope.orderPriceDatas= data.orderPriceData;
        		            scope.orderHistorydata=data.orderHistory;
        		            scope.orderData=data.orderData;
        		        });
        	            $uibModalInstance.close('delete');
        	        },function(orderErrorData){
        	        	 $scope.flagOrderDisconnect=false;
        	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
        	        });
        		  
              };
              $scope.cancelDisconnection = function () {
                  $uibModalInstance.dismiss('cancel');
              };
              
              
          };
          
        scope.cancel=function(){
            resourceFactory.saveOrderResource.delete({'clientId':routeParams.id},{},function(data){
            		location.path('/viewClient/id/'+scope.orderPriceDatas[0].clientId);  
            	});
          }
        
        scope.deAssociation=function (){
        	
        	resourceFactory.deAssociationResource.update({id:scope.association.id} , function(data) {
             
        		 route.reload();
            });
        };
        
      scope.reProcess=function(processId){
    	  
    	  resourceFactory.updateProvisioningMappingResource.update({'provisioningId':processId},{},function(data){
          	/*location.path('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);
          	location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);*/
    		  route.reload();
	           
	          });
    	  
      }
          scope.updatePrice = function (id,price){
        	  scope.orderData.locale=$rootScope.locale.code;
        	  scope.orderData.price=price;
        	  scope.orderData.priceId=id;
        	
              resourceFactory.getSingleOrderResource.update({orderId: routeParams.id} ,scope.orderData, function(data) {
                 
            	  //location.path('/vieworder/'+data.resourceId);
            	
              },function(error){
            	  scope.errorStatus=[];scope.errorDetails=[];
              });
        
            };
    }
  
  
  });
  
  mifosX.ng.application.controller('OrderController', ['$scope','webStorage','$routeParams','$route', 'ResourceFactory','$location','$uibModal',
                                                       'dateFilter','PaginatorService','PermissionService','$rootScope',
                                                       mifosX.controllers.OrderController]).run(function($log) {
    $log.info("OrderController initialized");
  });
}(mifosX.controllers || {}));
