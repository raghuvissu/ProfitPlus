(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewClientController: function (scope, routeParams, route, location, resourceFactory, http, $uibModal, API_VERSION, $rootScope, 
        						Upload, webStorage,PermissionService,uiConfigService,dateFilter,ENCRIPTIONKEY,paginatorService,TENANT,dateFilter) {
        	
        	scope.clientId = routeParams.id;
            scope.client = [];
            
            scope.identitydocuments = [];
            scope.buttons = [];
            scope.clientdocuments = [];
            scope.staffData = {};
            scope.formData = {};
			scope.error = [];
			scope.clientcarddetails = [];
			scope.onetimesalesForDummy = [];
			scope.scheduleorders = [];
			scope.ippoolDatas = [];
			scope.trackingDatas = {};
			scope.start = {};
			scope.start.date = new Date();
			scope.payment = "PAYMENT";
			scope.commission = "COMMISSION";
			scope.invoice = "INVOICE";
			scope.adjustment = "ADJUSTMENT";
			scope.journal = "JOURNAL VOUCHER";
			scope.depositAndRefund = "DEPOSIT&REFUND";
			scope.financialJournals = [];
			scope.ipstatus;
			scope.ipId;
			scope.clientServiceDatas = [];
			scope.activeall = false;
			scope.ServiceParameterData = [];
			scope.planformData = [];
			scope.todayDate = new Date();
            var numberOfDaysToSubtract = 7;
            scope.fromDate = scope.todayDate.setDate(scope.todayDate.getDate() - numberOfDaysToSubtract);
			//scope.fromDate = new Date();
			scope.toDate = "";
			scope.toDate = new Date();
			scope.validTo = new Date();
			
			
			
			/*scope.walletconfig = webStorage.get('is-wallet-enable');
			scope.propertyMaster = webStorage.get("is-propertycode-enabled");
			scope.config = webStorage.get("client_configuration").orderActions;*/
			
			uiConfigService.appendConfigToScope(scope);
			
			
			
			var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "moreInfo") {
					scope.moreInfoTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "documents") {
					scope.moreInfoTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "Tickets") {
					scope.TicketsTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "eventordertab") {
					scope.eventordertab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "FinancialSummaryTab") {
					scope.FinancialSummaryTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "crdtab") {
					scope.crdtab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "billingtab") {
					scope.billingtab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "Sale") {
					scope.SaleTab = true;
					scope.eventsaleC = "active";
					scope.mydeviceC = "";
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "StatementsTab") {
					scope.StatementsTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "eventOrders") {
					scope.SaleTab = true;
					scope.eventsaleC = "";
					scope.eventorderC = "active";
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "creditCardDetails") {
					scope.moreInfoTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "ACHDetailsTab") {
					scope.moreInfoTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "BillingTab") {
					scope.moreInfoTab = true;
					webStorage.remove('callingTab');
				} else if (scope.displayTab == "ChildDetailsTab") {
					scope.identitiesTab = true;
					webStorage.remove('callingTab');
				} else {
					webStorage.remove('callingTab');
				};
			}
			scope.bindClientServiceOneTimeSaleAndOrder = function(Data){

				scope.ordersForDummy = angular.copy(Data.orderData);
				scope.onetimesalesForDummy = angular.copy(Data.oneTimeSaleData);
				scope.clientServiceDatas = angular.copy(Data.clientServiceData);
				scope.selectAll(true,'false');
				if(scope.ordersForDummy.isPrepaid == 'Y'){
	            	scope.planformData.isPrepaid="Pre Paid";
	            	scope.plantype="prepaid";
	            }else{
	            	scope.planformData.isPrepaid="Post Paid";
	            	scope.plantype="postpaid";
	            }
			};
			
			
			
			var getDetails = function() {
	            /*resourceFactory.clientResource.get({clientId: routeParams.id}, function (data) {*/
				resourceFactory.client360resource.get({key:routeParams.key,value: routeParams.id}, function (data) {     
					scope.client = data;
					scope.bindClientServiceOneTimeSaleAndOrder(data);
	                scope.isClosedClient = scope.client.status.value == 'Closed';
	                scope.staffData.staffId = data.staffId;
	                $rootScope.clientAccountNo = data.accountNo;
					$rootScope.clientDisplayName = data.displayName;
					scope.statusActive = scope.client.status.code;
					scope.taxExemption = scope.client.taxExemption;
					webStorage.add("walletAmount",scope.client.walletAmount);
					if (scope.taxExemption == 'N') {
						$('#offbtn').removeClass("btn-default");
						$('#offbtn').addClass("active btn-primary");
						$('#onbtn').removeClass("active btn-primary");
						$('#onbtn').addClass("btn-default");
					} else {
						$('#onbtn').removeClass(" btn-default");
						$('#onbtn').addClass("active btn-primary");
						$('#offbtn').removeClass("active btn-primary");
						$('#offbtn').addClass("btn-default");
					}
					$rootScope.ClientData = {
						clientId : routeParams.id,
						balanceAmount : data.balanceAmount,
						displayName : data.displayName,
						hwSerialNumber : data.hwSerialNumber,
						statusActive : data.status.value,
						accountNo : data.accountNo,
						officeName : data.officeName,
						officeId : data.officeId,
						currency : data.currency,
						imagePresent : data.imagePresent,
						phone : data.phone,
						email : data.email,
						categoryType : data.categoryType,
						addressNo : data.addressNo,
						street : data.street,
						city : data.city,
						state : data.state,
						country : data.country,
						walletAmount : data.walletAmount,
						activationDate : data.activationDate
					};
					webStorage.add("clientData",$rootScope.ClientData);
	                if (data.imagePresent) {
	                    http({
	                        method: 'GET',
	                        url: $rootScope.hostUrl + API_VERSION + '/clients/' + routeParams.id + '/images?maxHeight=150'
	                    }).then(function (imageData) {
	                        scope.image = imageData.data;
	                    });
	                }
	                if (data.status.value == "Transfer in progress") {
						scope.buttons = [
								{
									name : "button.accept.transfer",
									href : "#/client",
									subhref : "acceptclienttransfer",
									icon : "icon-check-sign",
									ngShow : acceptTransfer
								},
								{
									name : "button.reject.transfer",
									href : "#/client",
									subhref : "rejecttransfer",
									icon : "icon-remove",
									ngShow : rejectTransfer
								},
								{
									name : "button.undo.transfer",
									href : "#/client",
									subhref : "undotransfer",
									icon : "icon-undo",
									ngShow : undoTransfer
								} ];
					}
					if (data.status.value == "Transfer on hold") {
						scope.buttons = [ {
							name : "button.undo.transfer",
							href : "#/client",
							subhref : "undotransfer",
							icon : "icon-undo",
							ngShow : undoTransfer
						} ];
					}
					/*resourceFactory.EventActionResource.get({clientId : routeParams.id},function(data) {
						scope.scheduleorders = data;
					});*/
					/*resourceFactory.DataTablesResource.query({apptable : 'm_client'},function(data) {
						scope.clientdatatables = data;
					});*/
	                
	                var clientStatus = new mifosX.models.ClientStatus();
	
	                if (clientStatus.statusKnown(data.status.value)) {
	                    scope.buttons = clientStatus.getStatus(data.status.value);
	                    scope.savingsActionbuttons = [
	                        {
	                            name: "button.deposit",
	                            type: "100",
	                            icon: "fa fa-arrow-right",
	                            taskPermissionName: "DEPOSIT_SAVINGSACCOUNT"
	                        },
	                        {
	                            name: "button.withdraw",
	                            type: "100",
	                            icon: "fa fa-arrow-left",
	                            taskPermissionName: "WITHDRAW_SAVINGSACCOUNT"
	                        },
	                        {
	                            name: "button.deposit",
	                            type: "300",
	                            icon: "fa fa-arrow-right",
	                            taskPermissionName: "DEPOSIT_RECURRINGDEPOSITACCOUNT"
	                        },
	                        {
	                            name: "button.withdraw",
	                            type: "300",
	                            icon: "fa fa-arrow-left",
	                            taskPermissionName: "WITHDRAW_RECURRINGDEPOSITACCOUNT"
	                        }
	                    ];
	                }
	
	                scope.buttonsArray = {
	                    options: [{name: "button.clientscreenreports"}]
	                };
	                scope.buttonsArray.singlebuttons = scope.buttons;
	            });
			};
			
			getDetails();
			
			scope.refresh = function(){
				route.reload();
			};
			/*resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId : routeParams.id},function(data) {
				scope.onetimesalesForDummy = angular.copy(data.oneTimeSaleData);
			});*/
			
			/*resourceFactory.getOrderResource.getAllOrders({clientId : routeParams.id},function(ordersData) {
				scope.ordersForDummy = angular.copy(ordersData.clientOrders);
				if(ordersData.clientOrders.isPrepaid == 'Y'){
	            	scope.planformData.isPrepaid="Pre Paid";
	            	scope.plantype="prepaid";
	            }else{
	            	scope.planformData.isPrepaid="Post Paid";
	            	scope.plantype="postpaid";
	            }
				resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId : routeParams.id},function(salesData) {
					scope.onetimesalesForDummy = angular.copy(salesData.oneTimeSaleData);
					resourceFactory.clientserviceResource.get({clientId : routeParams.id}, function(clientServiceData) {
						scope.clientServiceDatas = angular.copy(clientServiceData);
						scope.selectAll(true,'false');
					});
				});
			 });*/
			
			scope.serviceDatasFun = function(){
				scope.orders =[];
				scope.onetimesales=[];
				
				for(var i in scope.clientServiceDatas){
					if(scope.clientServiceDatas[i].isCheck == true){
						for(var j in scope.ordersForDummy){
							if(scope.ordersForDummy[j].clientServiceId == scope.clientServiceDatas[i].id){
								scope.orders.push(scope.ordersForDummy[j]);
							}
						}
						for(var k in scope.onetimesalesForDummy){
							//if(scope.onetimesalesForDummy[k].clientServiceId == scope.clientServiceDatas[i].id){
								scope.onetimesales.push(scope.onetimesalesForDummy[k]);
							//}
						}
					}
				}
			 };
			
			 scope.createclientservice = function(){
				 location.path('/createclientservice/' + routeParams.id);
			 };
			 scope.createpayinvoice = function(){
				 location.path('/payinvoice/' + routeParams.id);
			 };
			 scope.createCommissionWithdraw = function(){
				 location.path('/paycommission/' + routeParams.id);
			 };
			 scope.createservicetransfer = function(){
				 location.path('/servicetransfer/' + routeParams.id);
			 };
			 scope.selectAll = function(isSelectAll,fromUI) {
				if(isSelectAll == true){
					if(fromUI == 'true'){
						for(var i in scope.clientServiceDatas){
							scope.clientServiceDatas[i].isCheck = true;
						}
						scope.onetimesales = angular.copy(scope.onetimesalesForDummy);
						scope.orders = angular.copy(scope.ordersForDummy);
					}else{
						for(var i in scope.clientServiceDatas){
							scope.clientServiceDatas[i].isCheck = true;
							scope.serviceDatasFun();break;
						}
					}
				}else{
					scope.onetimesales = [];
					scope.orders = [];
					for(var i in scope.clientServiceDatas){
						scope.clientServiceDatas[i].isCheck = false;
					}
				}
			 };
			
			/*resourceFactory.getOrderResource.getAllOrders({clientId : routeParams.id},function(ordersData) {
				scope.ordersForDummy = angular.copy(ordersData.clientOrders);
				if(ordersData.clientOrders.isPrepaid == 'Y'){
	            	scope.planformData.isPrepaid="Pre Paid";
	            	scope.plantype="prepaid";
	            }else{
	            	scope.planformData.isPrepaid="Post Paid";
	            	scope.plantype="postpaid";
	            }
				resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId : routeParams.id},function(salesData) {
					scope.onetimesalesForDummy = angular.copy(salesData.oneTimeSaleData);
					resourceFactory.clientserviceResource.get({clientId : routeParams.id}, function(clientServiceData) {
						scope.clientServiceDatas = angular.copy(clientServiceData);
						scope.selectAll(true,'false');
					});
				});
			 });*/
			
            
			scope.routeToticket = function(clientId, ticketid) {
				location.path('/viewTicket/' + clientId + '/' + ticketid);
			};
			
			scope.routeToFollowupTicket = function(clientId,ticketid) {
				location.path('/editTicket/' + clientId + '/' + ticketid);
			};
			
			scope.routeToCloseTicket = function(clientId,ticketid) {
				location.path('/closeTicket/' + clientId + '/' + ticketid);
			};
			
			scope.routeTofinancial = function(transactionId,transtype, clientid) {
				if (transtype == 'INVOICE') {
					location.path('/viewfinancialtran/' + transactionId + '/' + clientid);
				}
			};
			
			scope.routeTogeneral = function(orderid, clientid,clientServiceId) {
				location.path('/vieworder/' + orderid + '/'+ clientid+ '/'+ clientServiceId);
			};
			/*scope.routeToParentClientOrChildClient = function(id) {
				location.path('/viewclient/' + id);
				route.reload()
			};*/
			
            /*Order Charging PopUp*/
            scope.orderChargingPopup = function () {
            	//scope.errorStatus=[];scope.errorDetails=[];
                $uibModal.open({
                    templateUrl: 'orderCharging.html',
                    controller: orderChargingCtrl
                });
            };
            /*Deposit PopUp*/
            scope.depositPopup = function () {
                $uibModal.open({
                    templateUrl: 'depositpop.html',
                    controller: depositCtrl
                });
            };
            /*Redeem PopUp*/
            scope.redemptionpopup = function () {
                $uibModal.open({
                    templateUrl: 'redemptionpop.html',
                    controller: redemptionpopCtrl
                });
            };
            /*Static IP PopUp*/
            scope.staticippopup = function () {
                $uibModal.open({
                    templateUrl: 'staticippopup.html',
                    controller: staticippopupCtrl
                });
            };
            /*Command Center*/
            scope.CommandCenter = function (clientServiceId) {
                $uibModal.open({
                    templateUrl: 'commandcenter.html',
                    controller: commandcenterCtrl,
                    resolve : {
                    	clientServiceId : function() {
                    	return clientServiceId;
                    	}
                    }
                });
            };
            /*ClientService Details*/
            scope.clientServiceDetailsPopup = function(clientId, clientServiceId){
				$uibModal.open({
					templateUrl : 'detailsCSPopup.html',
					controller : detailsCSPopupController,
					resolve : {
						clientId : function() {
							return clientId;
						},
						clientServiceId : function() {
							return clientServiceId;
						}
					}
				});
			};
			/*Device Swap*/
			scope.deviceSwappopup = function(itemId,oldSerialNo,oneTimeSaleId,pairedItemCode,
					pairedItemId,clientServiceId,oldProvserialnumber,olditemCode){
				console.log(clientServiceId);
	        	$uibModal.open({
						templateUrl : 'deviceSwappopup.html',
						controller : deviceSwappopupController,
						resolve : {
							itemId : function(){
								return itemId;
							},
							officeId : function(){
								return scope.client.officeId;
							},
							oldSerialNo : function(){
								return oldSerialNo;
							},
							oneTimeSaleId : function(){
								return oneTimeSaleId;
							},
							pairedItemCode : function(){
								return pairedItemCode;
							},
							pairedItemId : function(){
								return pairedItemId;
							},
							clientServiceId: function(){
								return clientServiceId;
							},
							oldProvserialnumber: function(){
								return oldProvserialnumber
							},
							olditemCode: function(){
								return olditemCode
							}
						}
					});
			 	};
			 	/*Paired Serial Number*/
			 	scope.pairedDeviceViewPopup = function(serialNo){
					$uibModal.open({
						templateUrl : 'paireddeviceviewpopup.html',
						controller : PairedDeviceViewPopupController,
						resolve : {
							serialNo : function(){
								return serialNo;
							}
						}
					});
				};
				/*Provisioning Details*/
				scope.viewProvisioningDetailsPopup = function(clientServiceId){
					$uibModal.open({
						templateUrl : 'viewprovisioningdetailspopup.html',
						controller : ViewProvisioningDetailsPopupController,
						resolve : {
							clientServiceId : function() {
								return clientServiceId;
							}
						}
					});
				};
			 	/*SUSPEND*/
			 	scope.suspendClientServicepopup = function(clientServiceId){
					$uibModal.open({
						templateUrl : 'suspendCSPopup.html',
						controller : suspendCSPopupController,
						resolve : {
							clientServiceId : function() {
								return clientServiceId;
							}
						}
					});
				};
				/*Reactive*/
				scope.reactiveClientServicepopup = function(clientServiceId){
					$uibModal.open({
						templateUrl : 'reactiveCSPopup.html',
						controller : reactiveCSPopupController,
						resolve : {
							clientServiceId : function() {
								return clientServiceId;
							}
						}
					});
				};
				/*Terminate popup*/
				scope.terminateClientServicepopup = function(clientServiceId){
					$uibModal.open({
						templateUrl : 'terminateCSPopup.html',
						controller : terminateCSPopupController,
						resolve : {
							clientServiceId : function() {
								return clientServiceId;
							}
						}
					});
				};
				/*Renewal*/
				scope.orderRenew = function(orderId){
		        	  //scope.errorStatus=[];scope.errorDetails=[];
		        	  $uibModal.open({
		        		  templateUrl: 'OrderRenewal.html',
		        		  controller: OrderRenewalController,
		        		  resolve:{
		        			  orderId : function() {
									return orderId;
								}
		        		  }
		        	  });
		          };
		          
		          /*Order Disconnect*/
				scope.orderDisconnect = function(orderId){
		        	  //scope.errorStatus=[];scope.errorDetails=[];
		        	  $uibModal.open({
		                  templateUrl: 'OrderDisconnect.html',
		                  controller: OrderDisconnectController,
		                  resolve:{
		                	  orderId : function() {
									return orderId;
								}
							}
		              });
		          };
		          
		          /*Suspend Order*/
		          scope.suspendOrder = function (orderId){
		              	scope.errorStatus=[];scope.errorDetails=[];
		              	 $uibModal.open({
		                       templateUrl: 'suspendOrder.html',
		                       controller: suspendOrderController,
		                       resolve:{
		                    	   orderId : function() {
										return orderId;
									}
		                       }
		                 });
		             };
		             
		             /*allocateProperty*/
		             scope.allocateProperty = function(serialnum) {
							scope.errorStatus = [];
							scope.errorDetails = [];
							scope.serialnum = serialnum;
							$uibModal.open({
								templateUrl : 'allocateproperty.html',
								controller : AllocatePropertyController,
								resolve : {}
							});
					 };
					
					 var AllocatePropertyController = function($scope,$uibModalInstance) {
							$scope.propertycodes = [];
							resourceFactory.propertydeviceMappingTemaplateResource.get({'clientId' : routeParams.id}, function(data) {
								$scope.propertycodes = data;
							});
							$scope.approveAllocate = function() {
								$scope.flagOrderDisconnect = true;
								if (this.formData == undefined || this.formData == null) {
									
								}
								this.formData.serialNumber = scope.serialnum;
								resourceFactory.propertydeviceMappingResource.update({'clientId' : routeParams.id},this.formData,function(data) {
									resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId : routeParams.id},function(data) {
										scope.onetimesales = data.oneTimeSaleData;
										scope.eventOrders = data.eventOrdersData;
									});
									$uibModalInstance.close('delete');
								},function(orderErrorData) {
									$scope.flagOrderDisconnect = false;
									$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
								});
							};
							$scope.cancelAllocate = function() {
								$uibModalInstance.dismiss('cancel');
							};
						};
		             
		             /*Change Order*/
		             scope.changePlanOrder = function(planId,clientServiceId,orderId){
			        	  webStorage.add("orderId",orderId);
			        	  location.path('/addclientplan/'+planId+'/'+scope.clientId+'/'+clientServiceId);
			          };
		             
		             var suspendOrderController = function ($scope, $uibModalInstance,orderId) {
		            	 
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
		                  	      
		                  	        this.formData.locale =scope.optlang.code;
		                        	resourceFactory.OrderSuspensionResource.update({orderId: orderId} ,this.formData, function(data) {              	
		                        		resourceFactory.getSingleOrderResource.get({orderId: orderId} , function(data) {
		                                    scope.orderPriceDatas= data.orderPriceData;
		                                    scope.orderHistorydata=data.orderHistory;
		                                    scope.orderData=data.orderData;
		                                });
		                        		//location.path('/vieworder/'+orderId+"/"+scope.clientId);
		                        		route.reload();
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
		             
		          var OrderDisconnectController = function ($scope, $uibModalInstance,orderId) {
		        	  /*$scope.errorStatus=[];
		        	  $scope.errorDetails=[];*/
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
		        	        this.formData.locale = scope.optlang.code;
		        		  
		        		  resourceFactory.saveOrderResource.update({'clientId': orderId},this.formData,function(data){
		        			  	
		        			  resourceFactory.getSingleOrderResource.get({orderId:orderId} , function(data) {
		        		            scope.orderPriceDatas= data.orderPriceData;
		        		            scope.orderHistorydata=data.orderHistory;
		        		            scope.orderData=data.orderData;
		        		            route.reload();
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
		          
		          var OrderRenewalController = function($scope,$uibModalInstance,orderId){
		        	  $scope.subscriptiondatas = [];
		        	  resourceFactory.OrderrenewalResourceTemplate.get({orderId:orderId,planType:scope.plantype},function(data) {
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
		        		  
		        		  resourceFactory.OrderrenewalResource.save({'orderId': orderId},this.formData,function(data){
		        	            
		        	            /*resourceFactory.getSingleOrderResource.get({orderId: orderId} , function(data) {
		        	            scope.orderPriceDatas= data.orderPriceData;
		        	            scope.orderHistorydata=data.orderHistory;
		        	            scope.orderData=data.orderData;
		        	            });*/
		        			    route.reload();
		        	            $uibModalInstance.close('delete');
		        	            
		        	        },function(renewalErrorData){
		        	      	  $scope.flagOrderRenewal=false;
		        	        });
		        	  };
		        	  $scope.cancelRenewal = function(){
		        		  $uibModalInstance.dismiss('cancel');
		        	  };
		          };
		          
				function  terminateCSPopupController($scope, $uibModalInstance,clientServiceId) {
					$scope.terminateCS = function () {
						scope.terminateFormData = {};
						scope.terminateFormData.clientId = parseInt(scope.clientId);
						resourceFactory.terminateClientServiceResource.update({clientServiceId : clientServiceId}, scope.terminateFormData, function(terminateFormData) {
							route.reload();
						});
						$uibModalInstance.dismiss('delete');
		          };
		             $scope.cancel = function () {
		            	 $uibModalInstance.dismiss('cancel');
		           };
				};
				
				function  reactiveCSPopupController($scope, $uibModalInstance,clientServiceId) {
					$scope.reactiveCS = function () {
						scope.reactiveFormData = {};
						scope.reactiveFormData.clientId = parseInt(scope.clientId);
						resourceFactory.reactiveClientServiceResource.update({clientServiceId : clientServiceId}, scope.reactiveFormData, function(reactiveFormData) {
							route.reload();
						});
		             	 $uibModalInstance.dismiss('delete');
		          };
		             $scope.cancel = function () {
		                 $uibModalInstance.dismiss('cancel');
		           };
				};
				
				function  suspendCSPopupController($scope, $uibModalInstance,clientServiceId) {
					$scope.suspendCS = function () {
						scope.suspendFormData = {};
						scope.suspendFormData.locale = scope.optlang.code;
						scope.suspendFormData.clientId = parseInt(scope.clientId);
						scope.suspendFormData.suspensionDate = new Date();
						var reqDate = dateFilter(scope.suspendFormData.suspensionDate,'dd MMMM yyyy');
				        scope.suspendFormData.dateFormat = 'dd MMMM yyyy';
				        scope.suspendFormData.suspensionDate = reqDate;
				        scope.suspendFormData.suspensionReason = 'Not Intersted';
						resourceFactory.suspendClientServiceResource.update({clientServiceId : clientServiceId}, scope.suspendFormData, function(suspendFormData) {
							route.reload();
						});
		             	 $uibModalInstance.dismiss('delete');
		          };
		             $scope.cancel = function () {
		                 $uibModalInstance.dismiss('cancel');
		           };
				};
				
			 	function  deviceSwappopupController($scope, $uibModalInstance,itemId,officeId,oldSerialNo,oneTimeSaleId,
			 			pairedItemCode,pairedItemId,clientServiceId,oldProvserialnumber,olditemCode) {
					 $scope.itemDatas = [];
					 $scope.enablePairDeviceSwapOption = false;
					 officeId: officeId;
					 $scope.getData = function(query){
						 itemId: itemId;
					 	 
						 return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/'+ itemId + '/' + officeId + '/', {
			        	      params: {
			        	    	  		query: query,pairedItemId : pairedItemId
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
			            $scope.getItemData = function(item,model,label){
			            	$scope.enablePairDeviceSwapOption = false;
			            	$scope.itemDatas = [];
			            	$scope.isPairable = false;
				        	if(item || model || label){
				        		var serialNum = item || model || label;
				        		
					        	resourceFactory.itemMasterDetailTemplateResource.get({query : serialNum,clientId:scope.clientId,officeId:officeId},function(data) {
					        		scope.provisioningSerialNo = data.provisioningSerialNo;
					        		console.log(scope.provisioningSerialNo);
					        	   if(data){
					        		   $scope.itemCode = data.itemCode;
					        		   if("Y" == data.isPairing){
					        		   }
					        	   }
					        	});
				        	}
				        	if(pairedItemCode !=null){
			            		$scope.enablePairDeviceSwapOption = true;
			            	}
			            };
			            
			            
			            $scope.pairDeviceSwapOptionFun = function(swapPairable,itemDetail){
			            	console.log(itemDetail);
			            	$scope.swapPairabl = false;
			            	if(swapPairable == true){
			            		$scope.swapPairabl = true;
			            		$scope.getPairableItemDetails(itemDetail);
			            	}
			            };
			            
			            $scope.getPairableItemDetails = function(itemDetail){
			            	$scope.pairableItemDetails = [];
			            	resourceFactory.pairableitemMasterDetailResource.get({serialNo:itemDetail,query:$scope.pairableSerialNo},function(data) {
			   				 $scope.pairableItemDetails = angular.copy(data.serialNumbers);
			   			 });
			            };
			            
			            $scope.selectPairableItemDetails = function(pairableSerialNo){
			            	$scope.pairableFormData = {};
			            	$scope.pairableSerialNo = pairableSerialNo;
			            	resourceFactory.itemMasterDetailTemplateResource.get({query : pairableSerialNo,clientId:scope.clientId,officeId: officeId},function(data) {
			            		scope.pairableProvisioningSerialNo = data.provisioningSerialNo;
			            		console.log(scope.pairableProvisioningSerialNo)
			            		if(data){
					        		   $scope.pairableItemCode = data.itemCode;
					        		  
					        	   }
			            	});
			            };
			            
						$scope.deviceSwap = function (newSerialNo,newPairableSerialNo) {
							$scope.swapFormData = {};
							$scope.swapFormData.oldSerialNo = oldSerialNo;
							$scope.swapFormData.type = olditemCode;
							$scope.swapFormData.clientId = scope.clientId;
							$scope.swapFormData.itemId = itemId;
							$scope.swapFormData.newSerialNo = newSerialNo;
							$scope.swapFormData.orderId = oneTimeSaleId;
							$scope.swapFormData.clientServiceId = clientServiceId;
							$scope.swapFormData.oldPSerialNo = oldProvserialnumber;
							$scope.swapFormData.newPSerialNo = scope.provisioningSerialNo;
							if(pairedItemCode !=null){
								for(var i in scope.onetimesales){
									if(scope.onetimesales[i].itemId == pairedItemId && scope.onetimesales[i].clientServiceId == clientServiceId){
		            					$scope.swapFormData.pOldPSerialNo = scope.onetimesales[i].provserialnumber;
		            					break;
		            				}
								}
							}else{
								for(var i in scope.onetimesales){
									if(scope.onetimesales[i].pairedItemId == itemId && scope.onetimesales[i].clientServiceId == clientServiceId){
		            					$scope.swapFormData.pOldPSerialNo = scope.onetimesales[i].provserialnumber;
		            					break;
		            				}
								}
							}
							$scope.swapFormData.isGenerateProvisionReq = true;
							if($scope.swapPairabl == true){
								$scope.swapFormData.pairableItemDetails = [];
								$scope.pairableItemdetailsObject = {};
								$scope.swapFormData.isPairable = true;
								$scope.pairableItemdetailsObject.clientId = scope.clientId;
								$scope.pairableItemdetailsObject.newSerialNo = newPairableSerialNo;
								$scope.pairableItemdetailsObject.newPSerialNo = scope.pairableProvisioningSerialNo;
								$scope.pairableItemdetailsObject.isGenerateProvisionReq = false;
								for(var i in scope.onetimesales){
									if(pairedItemCode == scope.onetimesales[i].itemCode){
										$scope.pairableItemdetailsObject.orderId = scope.onetimesales[i].id;
										$scope.pairableItemdetailsObject.oldSerialNo = scope.onetimesales[i].serialNo;
										$scope.pairableItemdetailsObject.oldPSerialNo = scope.onetimesales[i].provserialnumber;
										$scope.pairableItemdetailsObject.pOldPSerialNo = oldProvserialnumber;
										$scope.pairableItemdetailsObject.itemId = scope.onetimesales[i].itemId;
										$scope.pairableItemdetailsObject.clientServiceId = scope.onetimesales[i].clientServiceId;
										$scope.pairableItemdetailsObject.type = scope.onetimesales[i].itemCode;
										break;
									}
								}
								$scope.swapFormData.pairableItemDetails.push($scope.pairableItemdetailsObject);
								delete $scope.pairableItemdetailsObject;
							}else{
								$scope.swapFormData.isPairable = false;
								$scope.swapFormData.pairableItemDetails = [];
							}
							resourceFactory.swapDeviceResource.update({},$scope.swapFormData,function(data){
					             route.reload();
					          });
							$uibModalInstance.dismiss('delete');
			          };
			             $scope.cancelReconnect = function () {
			            	 $uibModalInstance.dismiss('cancel');
			           };
			};
			function PairedDeviceViewPopupController($scope, $uibModalInstance, serialNo) {
					$scope.pairedDeviceViewDatas = [];
					resourceFactory.pairedDeviceViewResource.get({serialNo : serialNo}, function(data) {
						$scope.pairedDeviceViewDatas = data;
					});
					$scope.cancel = function () {
						$uibModalInstance.dismiss('cancel');
		           };
			};
			function ViewProvisioningDetailsPopupController($scope, $uibModalInstance, clientServiceId){
				$scope.getProvDetails = function(clientServiceId){
					resourceFactory.provisioningtemplateMappingResource.query({clientServiceId:clientServiceId} , function(data) {
			              $scope.provisioningdatas = data;
			              $scope.sentMessagesData = [];
			              for(var i in data){
			            	  $scope.sentMessagesData.push(data[i]);
			              };
			        });
				}
				$scope.getProvDetails(clientServiceId);
				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
				$scope.sentMessagePopup = function(provisioningDataId){
					console.log(provisioningDataId);
					$scope.provisioningDataId = provisioningDataId;
					$uibModal.open({
			              templateUrl: 'sentMessage.html',
			              controller: SentMessageController,
			              resolve:{
			            	  provisioningDataId : function(){
			            		  return provisioningDataId
			            	  }
			              }
			          });
				};
				function SentMessageController($scope, $uibModalInstance, provisioningDataId){
					  $scope.provisioningDataId = provisioningDataId;
					  $scope.sentMessage = {};
			    	  $scope.messageData = [];
			    	  resourceFactory.provisioningtemplateMappingResource.query({clientServiceId:clientServiceId} , function(data) {
			              $scope.provisioningdatas = data;
			              $scope.sentMessagesData = [];
			              for(var i in data){
			            	  $scope.sentMessagesData.push(data[i]);
			              };
			    	  
			    	  for (var i in $scope.sentMessagesData){
			    		 if( $scope.sentMessagesData[i].id == $scope.provisioningDataId){
			    			 try{
			    				 var obj  = JSON.parse($scope.sentMessagesData[i].sentMessage);
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
			    	    			  var outerObj = $scope.sentMessage[key];
			    	    			  	$scope.sentMessage[key] = [];
			    	    			  if(typeof(outerObj) == 'object'){
			    	    				  var obj1 = outerObj[0];
			    	    				  if(typeof(obj1) == 'string'){
			    	    					  try {
			    	    						  var obj2 = JSON.parse(obj1);
			    	    						  outerObj = [];
			    	    						  outerObj.push(obj2);
			    	    					  }catch(e) {
			    	    						  console.log(e.message);
			    	    					  }
			    	    				  }
				    	    			  for(var key1 in outerObj){ 
				    	    				  var innerObj = outerObj[key1];
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
			    	  $scope.cancel = function () {
							$uibModalInstance.dismiss('cancel');
						};
			    	  });
				};/*Message request*/
				$scope.reProcess=function(processId){
		    	  resourceFactory.updateProvisioningMappingResource.update({'provisioningId':processId},{},function(data){
		          	/*location.path('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);
		          	location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
		    		  route.reload();*/
			          });
			    }
				$scope.confirmRequest = function (provId){
	              	/*scope.errorStatus=[];
	              	scope.errorDetails=[];
	              	scope.provId=provId;
	              	 $uibModal.open({
	                       templateUrl: 'ApproveConfirm.html',
	                       controller: ApproveConfirm,
	                       resolve:{}
	                   });*/
					

                 	  resourceFactory.confirmProvisioningDetailsResource.update({'provisioningId':provId},{},function(data){
                 		 $scope.getProvDetails(clientServiceId);
                     },function(errData){
     	        		$scope.flagApproveReconnect = false;
     		          });
                 	
                 
	             };
	             function ApproveConfirm($scope, $uibModalInstance) {
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
	                 		 /* scope.getAllProvisioningDetails(scope.orderNumber);*/
	                         $uibModalInstance.close('delete');
	                     },function(errData){
	     	        		$scope.flagApproveReconnect = false;
	     		          });
	                 	
	                 };
	                 $scope.cancelReconnect = function () {
	                     $uibModalInstance.dismiss('cancel');
	                 };
	             };  
				
			};
			
			scope.clientServiceActivation = function(clientServiceId) {
				scope.data = {};
				scope.errorDetails = [];
            	scope.errorStatus = [];
				scope.data.clientId = scope.clientId;
				resourceFactory.clientServiceActivationResource.save({clientServiceId : clientServiceId}, scope.data, function(data) {
					route.reload();
				/*},
				function(errors) {
					//scope.flagapprove1 = false;
					scope.error = errors.data.errors[0].userMessageGlobalisationCode;
					console.log(scope.error);*/
				});
			};
			function detailsCSPopupController($scope, $uibModalInstance,clientId,clientServiceId) {
				scope.ServiceParameterData = [];
					resourceFactory.clientServiceDetailsResource.get({clientId : routeParams.id,clientServiceId : clientServiceId}, function(data) {
						$scope.ServiceParameterData = data.ServiceParameterData;
					});
					$scope.cancel = function () {
						$uibModalInstance.dismiss('cancel');
		           };
			};
            var ClientDeleteCtrl = function ($scope, $uibModalInstance) {
                $scope.delete = function () {
                    resourceFactory.clientResource.delete({clientId: routeParams.id}, {}, function (data) {
                        $uibModalInstance.close('delete');
                        location.path('/clients');
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
            var orderChargingCtrl = function ($scope, $uibModalInstance) {
            	$scope.formData = {};
            	$scope.errorDetails = [];
            	$scope.errorStatus = [];
                $scope.ordercharge = function (date) {
                	$scope.flagapprove1 = true;
					$scope.formData.locale = scope.optlang.code;
					var reqDate = dateFilter(date,'dd MMMM yyyy');
					$scope.formData.dateFormat = 'dd MMMM yyyy';
					$scope.formData.systemDate = reqDate;
					resourceFactory.clientInvoiceResource.save({'clientId' : routeParams.id},$scope.formData,function(data,putResponseHeaders){
						$uibModalInstance.close('delete');
					},function(errData) {
						$scope.flagapprove1 = false;
						$scope.error = errData.data.errors[0].userMessageGlobalisationCode;
						console.log($scope.error);
					});
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
            var depositCtrl = function ($scope, $uibModalInstance) {
            	$scope.formData = {};
				resourceFactory.depositAmountResource.query({client : scope.clientId},function(data) {
					$scope.depositAmount = data[0].defaultFeeAmount;
					$scope.formData.feeId = data[0].id;
				},function(errorData) {
					$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
				});
				$scope.formData.clientId = scope.clientId;
                $scope.deposit = function () {
                	resourceFactory.depositAmountResource.save($scope.formData,function(data) {
						$uibModalInstance.close('delete');
					},function(errorData) {
						$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
					});
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
            var redemptionpopCtrl = function ($scope, $uibModalInstance) {
            	scope.errorDetails = [];
				scope.errorStatus = [];
				$scope.acceptRedemption = function() {
					$scope.flagStatementPop = true;
					if ($scope.formData == undefined|| $scope.formData == null) {
						$scope.formData = {"pinNumber" : ""};
					}
					this.formData.clientId = routeParams.id;
					resourceFactory.redemptionResource.save(this.formData,function(data) {
						route.reload();
						$uibModalInstance.close('delete');
					},function(errorData) {
						$scope.flagStatementPop = false;
						$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
					});
				};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
            var staticippopupCtrl = function ($scope, $uibModalInstance) {
            	scope.errorDetails = [];
				scope.errorStatus = [];
				$scope.formData = {};
				$scope.ipdata = {};
				$scope.formData.poolName = "Adhoc";
				$scope.getData = function(query) {
					return http.get($rootScope.hostUrl+ API_VERSION+ '/ippooling/search/',{params : {query : query}})
							.then(function(res) {ipPoolData = [];
						for ( var i in res.data.ipAddressData) {
							ipPoolData.push(res.data.ipAddressData[i]);
								if (i == 5) {
										break;
									}
								}
								return ipPoolData;
							});
				};
            	$scope.acceptStatement = function() {
	            	$scope.flagStatementPop = true;
					$scope.formData.status = 'A';
					$scope.formData.clientId = scope.clientId;
					$scope.formData.staticIpType = 'create';
					if ($scope.ipdata.ipAddressPool) {
						$scope.formData.ipAddress = $scope.ipdata.ipAddressPool;
					} else if ($scope.ipdata.ipAddressStatic) {
						delete $scope.formData.poolName;
						$scope.formData.ipAddress = $scope.ipdata.ipAddressStatic;
					} else {}
					resourceFactory.ipPoolingStaticIpResource.update(this.formData,function(data) {
						location.path('/viewclient/id/'+ scope.clientId);
						$uibModalInstance.close('delete');
					},function(errorData) {
							$scope.flagStatementPop = false;
							$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
							console.log(errorData);
							console.log($scope.stmError);
						});
            	};
				$scope.removeIp = function() {
					$scope.flagStatementPop = true;
					$scope.formData.status = 'F';
					$scope.formData.clientId = scope.clientId;
					$scope.formData.staticIpType = 'remove';
					resourceFactory.ipPoolingStaticIpResource.update(this.formData,function(data) {
						location.path('/viewclient/id/'+ scope.clientId);
						$uibModalInstance.close('delete');
					},function(errorData) {
							$scope.flagStatementPop = false;
							$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
								console.log(errorData);
								console.log($scope.stmError);
					});
				};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
            var commandcenterCtrl = function ($scope, $uibModalInstance,clientServiceId) {
            	$scope.formData = {};
            	$scope.commandFormData = {};
	      	 	$scope.commandData =  [];
	      	 	$scope.commandDetails = [];
	      	 	$scope.clientServiceId = clientServiceId;
	      	 	$scope.paramValues = ["True","False"];
	      	 	//$scope.commandTypes = ["Single","Group"];
	      	 	$scope.formData.requestMessage = [];
	           	resourceFactory.provisioningMappingResource.getprovisiongData({'clientServiceId': $scope.clientServiceId}, function(data) {
	           		 $('#commandName').hide();
	           		 $scope.commandData=data; 
	            });
	           	$scope.commandCenter=function(id){
	           		resourceFactory.commandCenterResource.get({'commandId' : id},function(data) {
		           		  $scope.commandParameters = angular.copy(data.commandParameters);
		           		  for(var i in $scope.commandParameters){
		           			  if($scope.commandParameters[i].paramType != "Combo"){
		           				  $scope.commandParameters[i].commandValue = $scope.commandParameters[i].paramDefault;
		           			  }
		           		  }
		           		  $scope.commandParameter = angular.copy(data);
		           		  //$scope.paramValuesData = data.paramValues;
		           		  //console.log($scope.commandParameters);
		           		  for(var i in $scope.commandParameters){
		           			  if($scope.commandParameters[i].paramType == "Combo"){
		           				$scope.paramValuesData = $scope.commandParameters[i].paramValues;
		           				console.log($scope.paramValuesData);
		           			  }
		           		  }
		            });
	           	};
	           	
	            $scope.acceptProvisioning = function(){
	            	console.log($scope.commandId);
	            	for(var i in $scope.commandData){
	            		if($scope.commandData[i].id == $scope.commandId){
	            			$scope.formData.requestType = $scope.commandData[i].commandName;
	            			$scope.formData.provisioningSystem = $scope.commandData[i].provisioningSystem;break;
	            		}
	            	}
	            	for(var i in $scope.commandParameters){
	            		if($scope.commandParameters[i].paramType == "Date"){
	            			$scope.commandParameters[i].commandValue = dateFilter($scope.commandParameters[i].commandValue,'dd/MM/yyyy');
	            		}
	            		
	            		var commandParamName = $scope.commandParameters[i].commandParam;
		        		 $scope.formData.requestMessage
							.push({
								[commandParamName]: $scope.commandParameters[i].commandValue
							});
		        	 }
	            	
	            	$scope.formData.type = 'single';
	            	$scope.formData.clientId = routeParams.id;
	            	$scope.formData.clientServiceId = clientServiceId;
	            	resourceFactory.osdResource.save($scope.formData, function(data) {
    					  $uibModalInstance.close('delete');
    					 location.path('/viewclient/id/'+routeParams.id);
    				 });
	            };
	            	$scope.rejectProvisioning = function(){
	            		$uibModalInstance.dismiss('cancel');
	            	};
            };
            
            /*More Info*/
            
            scope.getClientIdentityDocuments = function() {

				scope.indentitiesSubTab = "active";
				scope.documnetsUploadsTab = "";
				scope.additionaldataSubTab = "";
				scope.additionaladdressdataSubTab = "";
				scope.additionaladdressdataSubTab = "";
				scope.creditCardDetailsTab = "";
				scope.ACHDetailsTab = "";
				scope.BillingTab = "";
				scope.ChildDetailsTab = "";

				if (scope.displayTab == "documents") {
					scope.indentitiesSubTab = "";
					scope.additionaldataSubTab = "";
					scope.additionaladdressdataSubTab = "";
					scope.documnetsUploadsTab = "active";
					scope.creditCardDetailsTab = "";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "";
					scope.displayTab = "";
					scope.documnetsUploadsTabFun();

				} else if (scope.displayTab == "additionaldata") {
					scope.indentitiesSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.additionaldataSubTab = "active";
					scope.additionaladdressdataSubTab = "";
					scope.creditCardDetailsTab = "";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "";
					scope.displayTab = "";
					scope.additionalDataTabFun();
				} else if (scope.displayTab == "additionaladdress") {
					scope.indentitiesSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.additionaldataSubTab = "";
					scope.additionaladdressdataSubTab = "active";
					scope.creditCardDetailsTab = "";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "";
					scope.displayTab = "";
					scope.additionalDataTabFun();
					scope.additionalAddressTabFun();
				} else if (scope.displayTab == "creditCardDetails") {
					scope.indentitiesSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.additionaladdressdataSubTab = "";
					scope.additionaldataSubTab = "";
					scope.creditCardDetailsTab = "active";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "";
					scope.displayTab = "";
					scope.creditCardDetailsTabFun();

				} else if (scope.displayTab == "ACHDetailsTab") {
					scope.indentitiesSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.additionaladdressdataSubTab = "";
					scope.additionaldataSubTab = "";
					scope.creditCardDetailsTab = "";
					scope.ACHDetailsTab = "active";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "";
					scope.displayTab = "";
					scope.ACHDetailsTabFun();
				} else if (scope.displayTab == "BillingTab") {
					scope.indentitiesSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.additionaladdressdataSubTab = "";
					scope.additionaldataSubTab = "";
					scope.creditCardDetailsTab = "";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "active";
					scope.ChildDetailsTab = "";
					scope.displayTab = "";
				} else if (scope.displayTab == "ChildDetailsTab") {
					scope.indentitiesSubTab = "";
					scope.additionaladdressdataSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.creditCardDetailsTab = "";
					scope.additionaldataSubTab = "";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "active";
					scope.displayTab = "";
					scope.childsFun();
				}
				scope.offbtn = function() {
					$('#offbtn').removeClass("btn-default");
					$('#offbtn').addClass("active btn-primary");
					$('#onbtn').removeClass("active btn-primary");
					$('#onbtn').addClass("btn-default");
					var obj = {"taxExemption" : false};
					if (scope.taxExemption != 'N') {
						scope.taxExemption = 'N';
						resourceFactory.taxExemptionResource.update({clientId : routeParams.id}, obj, function(data) {});
					}
				};
				scope.onbtn = function() {
					$('#onbtn').removeClass("btn-default");
					$('#onbtn').addClass("active btn-primary");
					$('#offbtn').addClass("btn-default");
					$('#offbtn').removeClass("active btn-primary");
					var obj = {"taxExemption" : true};
					if (scope.taxExemption != 'Y') {
						scope.taxExemption = 'Y';
						resourceFactory.taxExemptionResource.update({clientId : routeParams.id}, obj, function(data) {});
					}
				};

				resourceFactory.clientResource.getAllClientDocuments({clientId : routeParams.id,anotherresource : 'identifiers'},function(data) {
					scope.identitydocuments = data;
						for ( var i = 0; i < scope.identitydocuments.length; i++) {
							resourceFactory.clientIdentifierResource.get({clientIdentityId : scope.identitydocuments[i].id},function(data) {
								for ( var j = 0; j < scope.identitydocuments.length; j++) {
									if (data.length > 0
											&& scope.identitydocuments[j].id == data[0].parentEntityId) {
										scope.identitydocuments[j].documents = data;
									}
								}
						});
					}
				});
				// parentClient
				resourceFactory.clientParentResource.get({clientId : routeParams.id}, function(data) {
					scope.parent = [];
					scope.parent = data.parentClientData;
					scope.parentCount = data.count;
				});
			};
			
			// identities tab fun
			scope.indentitiesTabFun = function() {

				scope.indentitiesSubTab = "active";
				scope.additionaldataSubTab = "";
				scope.additionaladdressdataSubTab = "";
				scope.documnetsUploadsTab = "";
				scope.creditCardDetailsTab = "";
				scope.ACHDetailsTab = "";
				scope.BillingTab = "";
				scope.ChildDetailsTab = "";

				resourceFactory.clientResource.getAllClientDocuments({clientId : routeParams.id,anotherresource : 'identifiers'},function(data) {
					scope.identitydocuments = data;
					for ( var i = 0; i < scope.identitydocuments.length; i++) {
						resourceFactory.clientIdentifierResource.get({clientIdentityId : scope.identitydocuments[i].id},function(data) {
							for ( var j = 0; j < scope.identitydocuments.length; j++) {
								if (data.length > 0
										&& scope.identitydocuments[j].id == data[0].parentEntityId) {
									scope.identitydocuments[j].documents = data;
								}
							}
						});
					}
				});
			};
			//Addition Data Tab
			scope.additionalDataTabFun = function() {

				scope.indentitiesSubTab = "";
				scope.documnetsUploadsTab = "";
				scope.additionaladdressdataSubTab = "";
				scope.creditCardDetailsTab = "";
				scope.additionaldataSubTab = "active";
				scope.ACHDetailsTab = "";
				scope.BillingTab = "";
				scope.ChildDetailsTab = "";

				scope.clientAdditionalData = webStorage.get("client-additional-data");
				// credit card details
				scope.additionalDatas = {};
				resourceFactory.clientAdditionalResource.get({clientId : routeParams.id},function(data) {
					var dataObj = JSON.parse(angular.toJson(data));
					console.log(Object.keys(dataObj).length);
					Object.keys(dataObj).length == 0 ? scope.editAdditionalDatasBtn = false: scope.editAdditionalDatasBtn = true;
					if (Object.keys(dataObj).length != 0) {
						resourceFactory.clientAdditionalResource.get({clientId : routeParams.id,template : true},function(data) {
							var nationalityDatas = data.nationalityDatas;
							var languagesDatas = data.languagesDatas;

							scope.additionalDatas.remarks = data.remarks;
							scope.additionalDatas.dateOfBirth = data.dateOfBirth;
							scope.additionalDatas.financeId = data.financeId;
								for ( var i in nationalityDatas) {
									if (data.nationalityId == nationalityDatas[i].id) {
										scope.additionalDatas.nationality = nationalityDatas[i].mCodeValue;
										break;
									}
								}
								for ( var i in languagesDatas) {
									if (data.preferLanId == languagesDatas[i].id) {
										scope.additionalDatas.preferredLPermissionService = '';
										scope.additionalDatas.preferredLPermissionService.showMenuang = languagesDatas[i].mCodeValue;
										break;
									}
								}
							});
					}
				});
			};
			/*Additional Address Tab*/
			scope.additionalAddressTabFun = function() {
				scope.indentitiesSubTab = "";
				scope.documnetsUploadsTab = "";
				scope.creditCardDetailsTab = "";
				scope.additionaladdressdataSubTab = "active";
				scope.additionaldataSubTab = "";
				scope.ACHDetailsTab = "";
				scope.BillingTab = "";
				scope.ChildDetailsTab = "";

				scope.clientAdditionalData = webStorage.get("client-additional-data");
				// credit card details
				scope.additionaladdressDatas = {};
				resourceFactory.addressEditResource.get({clientId : routeParams.id,addressType : 'BILLING'}, function(data) {
					scope.additionaladdressDatas = data.datas;
				});
			 };
			/*Documents Upload Tab*/
			scope.documnetsUploadsTabFun = function() {
				scope.indentitiesSubTab = "";
				scope.additionaladdressdataSubTab = "";
				scope.documnetsUploadsTab = "active";
				scope.additionaldataSubTab = "";
				scope.creditCardDetailsTab = "";
				scope.ACHDetailsTab = "";
				scope.BillingTab = "";
				scope.ChildDetailsTab = "";
				
				resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId : routeParams.id}, function(data) {
					scope.clientdocuments = data;
				});
				// documents details
				/*if (PermissionService.showMenu('READ_DOCUMENT')) {
					resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId : routeParams.id}, function(data) {
						scope.clientdocuments = data;
					});
				 }*/
			 };
			 // Credit Card Details Tab
			 scope.creditCardDetailsTabFun = function() {

					scope.indentitiesSubTab = "";
					scope.additionaladdressdataSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.additionaldataSubTab = "";
					scope.creditCardDetailsTab = "active";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "";

					// credit card details
					resourceFactory.creditCardSaveResource.get({clientId : routeParams.id},function(data1) {
						var key = ENCRIPTIONKEY;
						scope.clientcarddetails = data1;
						for ( var i in scope.clientcarddetails) {
							if (scope.clientcarddetails[i].type == 'CreditCard') {
								var decrypted1 = CryptoJS.AES.decrypt(
								scope.clientcarddetails[i].cardNumber,key);
								var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
								var stars = "";
									for ( var j in cardNum) {
										if (j >= 0 && j < (cardNum.length) - 4) {
											stars += "*";
										}
									}
									cardNum = stars+ cardNum.substr(cardNum.length - 4,cardNum.length - 1);
									scope.clientcarddetails[i].cardNumber = cardNum;
									var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate,key);
										scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
									} else if (scope.clientcarddetails[i].type == 'ACH') {
									var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber,key);
									var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
									var stars = "";
									for ( var j in routingNumber) {
										if (j >= 0 && j < (routingNumber.length) - 4) {
											stars += "*";
										}
									}
									routingNumber = stars+ routingNumber.substr(routingNumber.length - 4,routingNumber.length - 1);
									scope.clientcarddetails[i].routingNumber = routingNumber;
									var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber,key);
									var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
									var stars = "";
									for ( var j in bankAccountNumber) {
										if (j >= 0 && j < (bankAccountNumber.length) - 4) {
											stars += "*";
										}
									}
									bankAccountNumber = stars+ bankAccountNumber.substr(bankAccountNumber.length - 4,bankAccountNumber.length - 1);
									scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
									var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName,key);
									scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);
								}
							}
						});
				};
				/*ACH Details Tab*/
				scope.ACHDetailsTabFun = function() {

					scope.indentitiesSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.creditCardDetailsTab = "";
					scope.additionaladdressdataSubTab = "";
					scope.additionaldataSubTab = "";
					scope.ACHDetailsTab = "active";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "";
					// credit card details
					resourceFactory.creditCardSaveResource.get({clientId : routeParams.id},function(data1) {
						var key = ENCRIPTIONKEY;
						scope.clientcarddetails = data1;
						for ( var i in scope.clientcarddetails) {
							if (scope.clientcarddetails[i].type == 'CreditCard') {
								var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber,key);
								var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
								var stars = "";
								for ( var j in cardNum) {
									if (j >= 0 && j < (cardNum.length) - 4) {
										stars += "*";
									}
								}
								cardNum = stars + cardNum.substr(cardNum.length - 4,cardNum.length - 1);
								scope.clientcarddetails[i].cardNumber = cardNum;
								var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate,key);
								scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
									} else if (scope.clientcarddetails[i].type == 'ACH') {
										var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber,key);
										var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
										var stars = "";
										for ( var j in routingNumber) {
											if (j >= 0 && j < (routingNumber.length) - 4) {
												stars += "*";
											}
										}
										routingNumber = stars + routingNumber.substr(routingNumber.length - 4,routingNumber.length - 1);
										scope.clientcarddetails[i].routingNumber = routingNumber;
										var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber,key);
										var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
										var stars = "";
										for ( var j in bankAccountNumber) {
											if (j >= 0 && j < (bankAccountNumber.length) - 4) {
												stars += "*";
											}
										}
										bankAccountNumber = stars + bankAccountNumber.substr(bankAccountNumber.length - 4,bankAccountNumber.length - 1);
										scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
										var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName,key);
										scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);
									}
								}
							});
				};
				scope.childsFun = function() {

					scope.indentitiesSubTab = "";
					cope.additionaladdressdataSubTab = "";
					scope.documnetsUploadsTab = "";
					scope.creditCardDetailsTab = "";
					scope.additionaldataSubTab = "";
					scope.ACHDetailsTab = "";
					scope.BillingTab = "";
					scope.ChildDetailsTab = "active";
				};
				scope.$watch('parentClient', function() {
					if (scope.parentClient) {
						$('.btn-disabled').prop('disabled', false);
					} else {
						$('.btn-disabled').prop('disabled', true);
					}
				});
				scope.getparent = function(query) {
					return http.get($rootScope.hostUrl+ '/obsplatform/api/v1/parentclient/',{
						params : {query : query}
					}).then(function(res) {
						parentClients = [];
						for ( var i in res.data) {
							parentClients.push(res.data[i]);
							if (i == 7)
								break;
						}
						return parentClients;
					});
				};
				scope.saveParent = function(displayLabel) {
					var firstSplit = displayLabel.split('[');
					var displayName = firstSplit[0];
					var array = firstSplit[1].split(']');
					var accountNo = array[0];
					var obj = {
						"accountNo" : accountNo,
						"displayName" : displayName
					};
					resourceFactory.clientParentResource.update({clientId : routeParams.id}, obj, function(data) {
						location.path('/viewclient/id/'+ routeParams.id);
						route.reload();
					});
				};
				/*Delete Client Identification PopUp*/
				scope.deletePopUp = function(firstId, secondId,index, screenName) {
					scope.idValuePopup = firstId;
					scope.secondIdValuePopup = secondId;
					scope.indexPopup = index;
					scope.screenNamePopup = screenName;
					$uibModal.open({
						templateUrl : 'deletePopup.html',
						controller : approve,
						resolve : {}
					});
				};
				

				/** Delete Popup Controller */
				function approve($scope, $uibModalInstance) {
					$scope.deletePopupName = scope.screenNamePopup;
					$scope.approve = function() {
						switch (scope.screenNamePopup) {
						case 'Delete Identities':
							scope.deleteClientIdentifierDocument(scope.idValuePopup,scope.secondIdValuePopup,scope.indexPopup);
							break;
						case 'Delete Document':
							scope.deleteDocument(scope.secondIdValuePopup,scope.indexPopup);
							break;
						case 'Delete Child':
							scope.deleteChildsFromparent(scope.idValuePopup);
							break;
						case 'Cancel Sale':
							scope.cancelSale(scope.idValuePopup,scope.indexPopup);
							break;
						case 'Unallocate Device':
							scope.unallocateDevice(scope.idValuePopup,scope.secondIdValuePopup);
							break;
						case 'Unallocate Ip':
							if (this.formData == undefined
									|| this.formData == null) {
								this.formData = {
									"ipAddress" : scope.idValuePopup,
									"status" : 'F'
								};
							}
							resourceFactory.ipPoolingIpStatusResource.update({}, this.formData,function(data) {
								route.reload();
							}, function(errData) {
								});
							break;
						case 'Cancel Statement':
							scope.routeToCancelBill(scope.idValuePopup);
							break;
						case 'default':
							break;
						}
						$uibModalInstance.dismiss('delete');
					};
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
				}
				
				scope.unallocateDevice = function(otsId, serialNo) {
					this.formData.clientId = routeParams.id;
					this.formData.serialNo = serialNo;
					resourceFactory.unallocateDeviceResource.update({allocationId : otsId}, this.formData, function(data) {
						route.reload();
					}, function(errorData) {});
				};
				
				/*Notes Tab*/
				scope.getClientNotes = function() {
					resourceFactory.clientNotesResource.getAllNotes({clientId : routeParams.id}, function(data) {
						scope.clientNotes = data;
					/*if (PermissionService.showMenu('READ_CLIENTNOTE')) {
						resourceFactory.clientNotesResource.getAllNotes({clientId : routeParams.id}, function(data) {
								scope.clientNotes = data;
						});
					}*/
					});
				};
				scope.saveNote = function() {
					resourceFactory.clientResource.save({clientId : routeParams.id,anotherresource : 'notes'}, this.formData, function(data) {
						var today = new Date();
						temp = {
							id : data.resourceId,
							note : scope.formData.note,
							createdByUsername : "test",
							createdOn : today
						};
						scope.clientNotes.push(temp);
						scope.formData.note = "";
						scope.predicate = '-id';
					});
				};
				/*Tickets*/
				scope.getAllTickets = function() {
					resourceFactory.ticketResource.getAll({clientId : routeParams.id}, function(data) {
						scope.tickets = data;
						scope.clientId = routeParams.id;
					});
				};
				/*On demand Tab*/
				scope.dataTableChange = function(clientdatatable) {
					resourceFactory.DataTablesResource.getTableDetails({datatablename : clientdatatable.registeredTableName,entityId : routeParams.id,
						genericResultSet : 'true'},function(data) {
								scope.datatabledetails = data;
								scope.datatabledetails.isData = data.data.length > 0 ? true: false;
								scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true: false;
									scope.showDataTableAddButton = false;
									scope.showDataTableEditButton = false;
									scope.showDataTableAddButton = (!scope.datatabledetails.isData || scope.datatabledetails.isMultirow);
									scope.showDataTableEditButton = (scope.datatabledetails.isData && !scope.datatabledetails.isMultirow);
									scope.singleRow = [];
									for ( var i in data.columnHeaders) {
										if (scope.datatabledetails.columnHeaders[i].columnCode) {
											for ( var j in scope.datatabledetails.columnHeaders[i].columnValues) {
												for ( var k in data.data) {
													if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
														data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
													}
												}
											}
										}
									}
									if (scope.datatabledetails.isData) {
										for ( var i in data.columnHeaders) {
											if (!scope.datatabledetails.isMultirow) {
												var row = {};
												row.key = data.columnHeaders[i].columnName;
												row.value = data.data[0].row[i];
												scope.singleRow
														.push(row);
											}
										}
									}
						});
					};
					scope.viewDataTable = function(registeredTableName,data) {
						if (scope.datatabledetails.isMultirow) {
							location.path("/viewdatatableentry/" + registeredTableName + "/" + scope.client.id + "/" + data.row[0]);
						} else {
							location.path("/viewsingledatatableentry/" + registeredTableName + "/" + scope.client.id);
						}
					};
					/*Device Tab*/
					scope.getOneTimeSale = function() {
						scope.eventsaleC = "active";
						scope.mydeviceC = "";
						if (scope.displayTab == "eventOrders") {
							scope.eventsaleC = "";
							scope.mydeviceC = "active";
						}
						resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId : routeParams.id},function(data) {
							scope.onetimesales = data.oneTimeSaleData;
							scope.eventOrders = data.eventOrdersData;
						});
					};
					/*Event Order*/
					scope.getEventSale = function() {
						resourceFactory.eventOrderPriceUpdateTemplateResource.get({clientId : routeParams.id}, function(data) {
							scope.eventOrders = data;
						});
					};
					/*Financial Transaction*/
					scope.getAllFineTransactions = function() {
						scope.financialsummaryC = "active";
						scope.invoicesC = "";
						scope.paymentsC = "";
						scope.commissionPaymentsC = "";
						scope.adjustmentsC = "";
						scope.journalsC = "";
						scope.depositC = "";
						scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction,14);
					};
					scope.financialsummeryTab = function() {
						scope.financialsummaryC = "active";
						scope.paymentsC = "";
						scope.commissionPaymentsC = "";
						scope.invoicesC = "";
						scope.adjustmentsC = "";
						scope.journalsC = "";
						scope.depositC = "";
						scope.financialInvoices = paginatorService.paginate(scope.getInvoice, 14);
					};
					scope.invoicesTab = function() {
						scope.financialsummaryC = "";
						scope.paymentsC = "";
						scope.commissionPaymentsC = "";
						scope.invoicesC = "active";
						scope.adjustmentsC = "";
						scope.journalsC = "";
						scope.depositC = "";
						scope.financialInvoices = paginatorService.paginate(scope.getInvoice, 14);
					};
					scope.paymentsTab = function() {
						scope.financialsummaryC = "";
						scope.invoicesC = "";
						scope.paymentsC = "active";
						scope.commissionPaymentsC = "";
						scope.adjustmentsC = "";
						scope.journalsC = "";
						scope.depositC = "";
						scope.financialPayments = paginatorService.paginate(scope.getPayments, 14);
					};
					scope.commissionPaymentsTab = function() {
						scope.financialsummaryC = "";
						scope.invoicesC = "";
						scope.paymentsC = "";
						scope.commissionPaymentsC = "active";
						scope.adjustmentsC = "";
						scope.journalsC = "";
						scope.depositC = "";
						scope.financialCommissionPayments = paginatorService.paginate(scope.getCommissionPayments, 14);
					};
					scope.adjustmentsTab = function() {
						scope.financialsummaryC = "";
						scope.invoicesC = "";
						scope.paymentsC = "";
						scope.commissionPaymentsC = "";
						scope.adjustmentsC = "active";
						scope.journalsC = "";
						scope.depositC = "";
						scope.financialAdjustments = paginatorService.paginate(scope.getAdjustments, 14);
					};

					scope.journalsTab = function() {
						scope.financialsummaryC = "";
						scope.invoicesC = "";
						scope.paymentsC = "";
						scope.commissionPaymentsC = "";
						scope.adjustmentsC = "";
						scope.journalsC = "active";
						scope.depositC = "";
						scope.financialJournals = paginatorService.paginate(scope.getjournals, 14);
					};

					scope.depositsTab = function() {
						scope.financialsummaryC = "";
						scope.invoicesC = "";
						scope.paymentsC = "";
						scope.commissionPaymentsC = "";
						scope.adjustmentsC = "";
						scope.journalsC = "";
						scope.depositC = "active";
						scope.financialDeposits = paginatorService.paginate(scope.getDeposits, 14);

					};
					scope.getFinancialTransactionsFetchFunction = function(offset, limit, callback) {
						resourceFactory.FineTransactionResource.getAllFineTransactions({clientId : routeParams.id,offset : offset,limit : limit,fromDate:scope.fromDate,todate:scope.toDate}, callback);
					};
					scope.getInvoice = function(offset, limit,callback, invoice) {
						resourceFactory.Filetrans.get({clientId : routeParams.id,offset : offset,limit : limit,type : scope.invoice}, callback);
					};

					scope.getPayments = function(offset, limit,callback, payment) {
						resourceFactory.Filetrans.get({clientId : routeParams.id,offset : offset,limit : limit,type : scope.payment}, callback);
					};

					scope.getCommissionPayments = function(offset, limit,callback, commission) {
						resourceFactory.Filetrans.get({clientId : routeParams.id,offset : offset,limit : limit,type : scope.commission}, callback);
					};

					scope.getAdjustments = function(offset, limit,callback, adjustment) {
						resourceFactory.Filetrans.get({clientId : routeParams.id,offset : offset,limit : limit,type : scope.adjustment}, callback);
					};

					scope.getjournals = function(offset, limit,callback, adjustment) {
						resourceFactory.Filetrans.get({clientId : routeParams.id,offset : offset,limit : limit,type : scope.journal}, callback);
					};
					
					scope.getDeposits = function(offset, limit,callback, adjustment) {
						resourceFactory.Filetrans.get({clientId : routeParams.id,offset : offset,limit : limit,type : scope.depositAndRefund}, callback);
					};
					scope.cancelPayment = function(id) {
						var modalInstance = $uibModal.open({
							templateUrl : 'cancelpayment.html',
							controller : CancelPayment,
							resolve : {
								getPaymentId : function() {
									return id;
								}
							}
						});

						modalInstance.result.then(function () {
					      		getDetails();
								scope.paymentsTab();
					    }, function () {
					      console.log('Modal dismissed at: ' + new Date());
					    });
					};
					scope.confirmPayment = function(id){
						var modalInstance = $uibModal.open({
							templateUrl : 'confirmpayment.html',
							controller : confirmPaymentCtrl,
							resolve : {
								getPaymentId : function() {
									return id;
								}
							}
						});

						modalInstance.result.then(function () {
					      		getDetails();
								scope.paymentsTab();
					    }, function () {
					      console.log('Modal dismissed at: ' + new Date());
					    });
					}
					scope.refundAmount = function(id, amount) {
						scope.errorDetails = [];
						scope.errorStatus = [];
						$uibModal.open({
							templateUrl : 'refundamount.html',
							controller : RefundAmountController,
							resolve : {
								getPaymentId : function() {
									return id;
								},
								getAmount : function() {
									return amount;
								}
							}
						});
					};
					var RefundAmountController = function($scope,$uibModalInstance, getPaymentId, getAmount) {
						$scope.formData = {};
						resourceFactory.refundAmountResource.get({depositAmount : getAmount,depositId : scope.clientId},function(data) {
							$scope.formData.refundAmount = data.availAmount;
							$scope.refundModeData = data.data;
						},function(errorData) {
							$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
						});
						$scope.formData.locale = "en";
						$scope.accept = function() {
							var depositId = getPaymentId;
							resourceFactory.refundAmountResource.save({'depositId' : depositId},$scope.formData,function(data) {
								$uibModalInstance.close('delete');
								getDetails();
								scope.getAllFineTransactions();
							},function(errorData) {
								$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
							});
						};
						$scope.reject = function() {
							$uibModalInstance.dismiss('cancel');
						};
					};
					var CancelPayment = function($scope,$uibModalInstance, getPaymentId) {
						$scope.accept = function(cancelRemark) {
							delete $scope.errorMsg;
							$scope.flagcancelpayment = true;
							var paymentId = getPaymentId;
							scope.formData.cancelRemark = cancelRemark;
							resourceFactory.cancelPaymentResource.update({'paymentId' : paymentId},scope.formData,function(data) {
								$uibModalInstance.close('delete');
							},function(errData) {
								$scope.flagcancelpayment = false;
								$scope.errorMsg = errData.data.errors[0].userMessageGlobalisationCode;
							});
						};
						$scope.reject = function() {
							$uibModalInstance.dismiss('cancel');
						};
					};
					var confirmPaymentCtrl = function($scope,$uibModalInstance, getPaymentId) {
						$scope.accept = function(otp) {
							delete $scope.errorMsg;
							console.log(otp);
							if(!otp){
								$scope.errorMsg = "Please enter otp.";
								return ;
							} 
							$scope.flagconfirmpayment = true;
							var paymentId = getPaymentId;
							var params = {paymentId: paymentId, otp: otp};
							console.log(params);
							resourceFactory.confirmPaymentResource.update(params, {}, function(data) {
								$uibModalInstance.close('delete');
							},function(errData) {
								$scope.flagconfirmpayment = false;
								$scope.errorMsg = errData.data.errors[0].userMessageGlobalisationCode;
							});
						};
						$scope.reject = function() {
							$uibModalInstance.dismiss('cancel');
						};
					};
					scope.downloadInvoice = function(invoiceId) {
						window.open($rootScope.hostUrl + API_VERSION+ '/billmaster/invoice/' + routeParams.id 
								+ '/' + invoiceId + '?email=false&tenantIdentifier=' + TENANT);
					};
					scope.downloadPayment = function(paymentId) {
						window.open($rootScope.hostUrl + API_VERSION+ '/billmaster/payment/'+ routeParams.id 
								+ '/' + paymentId+ '?email=false&tenantIdentifier='+ TENANT);
					};
					scope.exportFinancialCSV = function() {
						$uibModal.open({
							templateUrl : 'downloadCSVFinancialData.html',
							controller : DownloadCSVFinancialDataController,
							resolve : {}
						});
					};
					var DownloadCSVFinancialDataController = function($scope, $uibModalInstance) {
						var date = new Date(), y = date.getFullYear(), m = date.getMonth();
						$scope.formData = {};
						$scope.formData.downloadType = 'csv';
						$scope.start = {};
						$scope.start.date = new Date(y, m, 1);
						$scope.to = {};
						$scope.to.date = new Date();
						$scope.accept = function() {
							var fromDate = new Date($scope.start.date).getTime();
							var toDate = new Date($scope.to.date).getTime();
							var downloadType = $scope.formData.downloadType;
							window.open($rootScope.hostUrl+ API_VERSION + '/financialTransactions/download/' + routeParams.id + '?downloadType='
											+ downloadType + '&fromDate=' + fromDate + '&toDate=' + toDate + '&tenantIdentifier=' + TENANT);
							$uibModalInstance.close('delete');
						};
						$scope.reject = function() {
							$uibModalInstance.dismiss('cancel');
						};
					};
					/*Statements Tab*/
					scope.getClientStatements = function() {
						scope.states = [];
						scope.states = paginatorService.paginate(scope.getStatementsData, 9);
					};
					scope.getStatementsData = function(offset, limit,callback) {
						resourceFactory.statementResource.get({clientId : routeParams.id,offset : offset,limit : limit
						}, function(data) {
							scope.url = mifosX.models.url;
							scope.mail = mifosX.models.mail;
							callback(data);
						});
					};
					scope.routeToCancelBill = function(statementId) {
						resourceFactory.cancelStatementResource.remove(
								{
									statementId : statementId
								}, function(data) {
									// webStorage.add("callingTab",
									// {someString: "Statements" });
									// location.path("/viewclient/"+routeParams.id);
									scope.getClientStatements();
									// route.reload();
								});
					};
					scope.downloadFile = function(statementId) {

						/*
						 * http({ method:'PUT', url: $rootScope.hostUrl+
						 * API_VERSION
						 * +'/billmaster/'+statementId+'/print?tenantIdentifier=default',
						 * data: {} })
						 */

						window.open($rootScope.hostUrl + API_VERSION
								+ '/billmaster/' + statementId
								+ '/print?tenantIdentifier=' + TENANT);
					};
					scope.routeToEmail = function(statementId) {
						resourceFactory.statementEmailResource.update({
							statementId : statementId
						}, function(data) {
						});
					};
					scope.routeTostatement = function(statementid) {
						location.path('/viewstatement/' + statementid);
					};
					/*Activity Log*/
					scope.getTransactionHistory = function() {
						scope.fromDate = angular.copy(dateFilter(scope.fromDate,'yyyy-MM-dd'));
						scope.toDate = angular.copy(dateFilter(scope.toDate,'yyyy-MM-dd'));
						scope.transactionhistory = paginatorService.paginate(scope.getTransHistory,14);
						scope.activitylogC = "active";
						scope.oldActivitylogC = "";
						//scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFunction,14);
					};
					scope.getTransactionHistoryFetchFunction = function(offset, limit, callback) {
						resourceFactory.transactionHistoryResource.getTransactionHistory({clientId : routeParams.id,offset : offset,limit : limit}, callback);
					};
					scope.getOldTransactionHistory = function() {
						scope.activitylogC = "";
						scope.oldActivitylogC = "active";
						scope.transactionhistoryOld = paginatorService.paginate(scope.getOldTransactionHistoryFetchFunction,14);
					};
					scope.getOldTransactionHistoryFetchFunction = function(offset, limit, callback) {
						resourceFactory.transactionOldHistoryResource.getTransactionHistory({clientId : routeParams.id,offset : offset,limit : limit}, callback);
					};
					scope.searchTransactionHistory = function(filterText) {
						scope.transactionhistory = paginatorService.paginate(scope.searchTransactionHistory123,14);
					};
					scope.searchTransactionHistory123 = function(offset, limit, callback) {
						resourceFactory.transactionHistoryResource.getTransactionHistory({clientId : routeParams.id,offset : offset,limit : limit,
							sqlSearch : scope.filterText}, callback);
					};
					
					/*scope.getTransactionHistoryFetchFunction = function(fromdate, toDate, callback) {
						resourceFactory.transactionHistoryResource.getTransactionHistory({clientId : routeParams.id,fromDate:fromdate,toDate:toDate}, callback);
					};
					
					scope.getTrans = function() {
						scope.activitylogC = "active";
						scope.oldActivitylogC = "";
						scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFun,14);
						
					
					};*/
					
				
					scope.getTransHistory=function(offset, limit, callback){
						 resourceFactory.transactionHistoryResource.getTransactionHistory({clientId : routeParams.id,offset : offset,limit : limit, fromDate : scope.fromDate, toDate :scope.toDate}, callback);

					};
					
					scope.getOldTransactionHistoryFetchFunction = function(offset, limit, callback) {
						resourceFactory.transactionOldHistoryResource.getTransactionHistory({clientId : routeParams.id,offset : offset,limit : limit,fromDate:scope.fromDate,toDate:scope.toDate}, callback);
					};
					
					scope.getTrans=function(fromDate,toDate){
						
						scope.fromDate = angular.copy(dateFilter(fromDate,'yyyy-MM-dd'));
						scope.toDate = angular.copy(dateFilter(toDate,'yyyy-MM-dd'));
						console.log(scope.fromDate);
						console.log(scope.toDate);
						scope.transactionhistory = paginatorService.paginate(scope.getTransHistory,14);
						
					};

						
					
					/*CRD*/
					scope.getClientDistribution = function() {
						scope.clientDistribution = paginatorService.paginate(scope.getClientDistributionFetchFunction,14);
					};
					scope.getClientDistributionFetchFunction = function(
							offset, limit, callback) {
						resourceFactory.creditDistributionResource.get({clientId : routeParams.id,offset : offset,limit : limit}, callback);
					};
					/*Network*/
					scope.getClientNetworkIpsFetchFunction = function() {
						resourceFactory.clientIpPoolingResource.get({clientId : routeParams.id}, function(data) {
							scope.ippoolDatas = data;
						});
					};
				
        }
    });

    mifosX.ng.application.controller('ViewClientController', [
                                                              '$scope', 
                                                              '$routeParams', 
                                                              '$route', 
                                                              '$location', 
                                                              'ResourceFactory', 
                                                              '$http', 
                                                              '$uibModal', 
                                                              'API_VERSION', 
                                                              '$rootScope', 
                                                              'Upload', 
                                                              'webStorage',
                                                              'PermissionService',
                                                              'UIConfigService',
                                                              'dateFilter',
                                                              'ENCRIPTIONKEY',
                                                              'PaginatorService',
                                                              'TENANT',
                                                              'dateFilter',
                                                              mifosX.controllers.ViewClientController]).run(function ($log) {
        $log.info("ViewClientController initialized");
    });
}(mifosX.controllers || {}));
