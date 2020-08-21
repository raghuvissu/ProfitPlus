(function(module) {
  mifosX.controllers = _.extend(module, {
	  PayCommissionController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,
			                         route,$uibModal,$rootScope, $filter) {
		  
		var addAmountValue = 0;
        scope.formData = {};
        scope.creditData = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
        scope.walletconfig = webStorage.get('is-wallet-enable');
        scope.configSubscriptionPayment = webStorage.get("uiConfigData").SubscriptionPayment;
	    scope.displayName=clientData.displayName;
	    scope.statusActive=clientData.statusActive;
	    scope.hwSerialNumber=clientData.hwSerialNumber;
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
        //scope.datass = {};
         scope.start={};
         scope.start.date = new Date();
         scope.maxDate= scope.start.date;
         
         scope.formData.isSubscriptionPayment= false;
         
        resourceFactory.paymentsTemplateResource.getPayments({clientId : scope.clientId}, function(data){
        	scope.payments = data;
            scope.data = data.data;
            scope.paymentTypeData=function(value){
            	for(var i=0;i<scope.data.length;i++){
            		if(scope.data[i].id==value){
            			scope.paymentType=scope.data[i].mCodeValue;
            		}
            	}
            };
        });
        
        scope.submitAccount = function() {
        	
            this.formData.locale = scope.optlang.code;
            this.formData.dateFormat = "dd MMMM yyyy";
        	var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
        	//scope.formData.chequeDate = dateFilter(new Date(),'dd MMMM yyyy');
        	var reqDate = dateFilter(scope.formData.chequeDate,'dd MMMM yyyy');
        	scope.formData.chequeDate = reqDate;
            this.formData.paymentDate= paymentDate;
            delete this.formData.amount;
            delete this.formData.invoiceId;
            this.formData.creditAmount = 0;
            this.formData.debitAmount = this.formData.amountPaid;
            this.formData.clientName = scope.displayName;
            this.formData.rate = 0;
            delete this.formData.amountPaid;

            console.log(this.formData);
            
            resourceFactory.commissionWithdrawResource.save({clientId : routeParams.id}, this.formData, function(data){
            	location.path('/viewclient/id/'+routeParams.id);
          });
       };
    }
  });
  mifosX.ng.application.controller('PayCommissionController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', 
                                                            '$location','dateFilter','$route',
                                                            '$uibModal','$rootScope','$filter', mifosX.controllers.PayCommissionController]).run(function($log) {
    $log.info("PayCommissionController initialized");
  });
}(mifosX.controllers || {}));
