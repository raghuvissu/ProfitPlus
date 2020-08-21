(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreditDistributionController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,route,$uibModal,$rootScope) {

        scope.formData = {};
        scope.clientId = routeParams.id;
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
        if(scope.imagePresent){
         scope.image=clientData.image;
        }
        
        scope.showPaymentsDetails = false;
        scope.showInvoiceDetails = false;
        scope.invoiceDatas = [];
        scope.paymentDatas = [];
        
        var selectedAvailAmount = [];
        var prevAvailAmountArray =[];
        var paymentAmount;
        var paymentId=0;
        var paymentIndex=0;
        var payAvailAmount = 0;
        var checkBox = false;
        scope.creditdistributions = [];
        
       resourceFactory.creditDistributionTemplateResource.get({clientId : routeParams.id},function(data){
    		scope.invoiceDatas = data.invoiceDatas;
    		scope.paymentDatas = data.paymentDatas;
    		for(var i in scope.invoiceDatas){
    			scope.invoiceDatas[i].active=checkBox;
    		}
    	});
        
        scope.showPayments = function(){
        	scope.showPaymentsDetails = ! scope.showPaymentsDetails;
        	scope.showInvoiceDetails = false;
        	
        };
        
        scope.seletedPayment = function(id,amount,availableAmount,index){
        	$('.unCheck').prop('checked',false);
        	scope.creditdistributions = [];
        	scope.showInvoices = true;
        	scope.showInvoiceDetails=false; 
        	selectedAvailAmount.push({availAmount : availableAmount,index : index});
           if(selectedAvailAmount.length-1){
        	   var prevIndex = selectedAvailAmount[selectedAvailAmount.length-2].index;
        	   var preAvailAmount = selectedAvailAmount[selectedAvailAmount.length-2].availAmount;
        	   scope.paymentDatas[prevIndex].availAmount = preAvailAmount;
           }
           if(selectedAvailAmount.length == 3)
        	   selectedAvailAmount.shift();
          
        	paymentId = id;
        	paymentAmount = amount;
        	payAvailAmount = availableAmount;
        	paymentIndex=index;
        	prevAvailAmountArray = [];
        };
        
        //invoices selecting
        scope.selectedInvoices = function(invoiceId,amount,active,index){
        	if(active == true){
        		if(scope.paymentDatas[paymentIndex].availAmount == 0){
        			$('#'+invoiceId).prop('checked',false);
        			scope.invoiceDatas[index].active=false;
        			$uibModal.open({
              			 templateUrl: 'alert.html',
              			 controller: alertController,
              			 resolve:{}
              		 });
        		}else if(amount >= payAvailAmount){
        			prevAvailAmountArray.push({id : invoiceId,amount : scope.paymentDatas[paymentIndex].availAmount});
        			paymentAmount = scope.paymentDatas[paymentIndex].availAmount;
        		    scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : paymentAmount,
        				paymentId : paymentId,
						clientId  : parseInt(routeParams.id),
						locale    : $rootScope.locale.code
						
        				});
        		    if(amount!=scope.paymentDatas[paymentIndex].availAmount){
                        $uibModal.open({
   		                 templateUrl: 'amountAlert.html',
        			     controller: alertController,
        			     resolve:{}
        		       });
   		           }
        		    scope.paymentDatas[paymentIndex].availAmount =0;
        			}
        		else{
        			prevAvailAmountArray.push({id : invoiceId,amount : amount});
            		scope.paymentDatas[paymentIndex].availAmount -=amount;
        			
        			scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : amount,
        				paymentId : paymentId,
						clientId  : parseInt(routeParams.id),
						locale    : $rootScope.locale.code
						
        				});
        		}
        		if(scope.paymentDatas[paymentIndex].availAmount != 0)
        			payAvailAmount -= amount;
        	}
        	else{
        		  for(var i in prevAvailAmountArray){
        			  if(prevAvailAmountArray[i].id==invoiceId){
        				  
        				  if(scope.paymentDatas[paymentIndex].availAmount == 0)
          					payAvailAmount = prevAvailAmountArray[i].amount;
          				  else
          					  payAvailAmount += prevAvailAmountArray[i].amount;
        				  
        				  scope.paymentDatas[paymentIndex].availAmount +=prevAvailAmountArray[i].amount;
        				  break;
        			  }
        		  }
        		  prevAvailAmountArray = _.filter(prevAvailAmountArray, function(item) {
                      return item.id != invoiceId;
                  });
        		scope.creditdistributions = _.filter(scope.creditdistributions, function(item) {
                    return item.invoiceId != invoiceId;
               });
        	}
        };
        
         scope.reset123 = function(){
        	webStorage.add("callingTab", {someString: "crdtab" });
         };
        
        function alertController ($scope, $uibModalInstance) {
      	  $scope.approve = function () {
      		  $uibModalInstance.close('delete');
            };
        };
        scope.submit = function(){
        	scope.avialableAmount = scope.paymentDatas[paymentIndex].availAmount; 
        	scope.formData.avialableAmount = scope.avialableAmount;
        	scope.formData.paymentId = paymentId;
        	scope.formData.locale= $rootScope.locale.code,
        	scope.formData.creditdistributions = scope.creditdistributions;
        	scope.avialableAmount=null;
        	resourceFactory.creditDistributionResource.save({clientId : routeParams.id},scope.formData,function(data){
        		location.path('/viewclient/'+routeParams.id);
        		webStorage.add("callingTab", {someString: "crdtab" });
        	});
        };
	  }
  });
  mifosX.ng.application.controller('CreditDistributionController', [
                                                                    '$scope',
                                                                    'webStorage',
                                                                    'ResourceFactory', 
                                                                    '$routeParams', 
                                                                    '$location',
                                                                    'dateFilter',
                                                                    '$route',
                                                                    '$uibModal',
                                                                    '$rootScope', 
                                                                    mifosX.controllers.CreditDistributionController]).run(function($log) {
    $log.info("CreditDistributionController initialized");
  });
}(mifosX.controllers || {}));