(function(module) {
    mifosX.controllers = _.extend(module, {
    	ViewFinancialTranController: function(scope,webStorage, routeParams, route, resourceFactory,http) {
    		
    		scope.invoicedetails = [];
            scope.formData={};
            scope.transactionId = routeParams.transactionId;
            scope.clientId=routeParams.clientId;
            var clientData = webStorage.get('clientData');
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
            if(scope.imagePresent){
		     scope.image=clientData.image;
		    }
            scope.walletConfig = webStorage.get('is-wallet-enable');
            resourceFactory.financialResource.getAllDetails({'transactionId': routeParams.transactionId},function(data){
                scope.invoicedetails = data.transactionsDatas;
            }); 
        }
    });
    mifosX.ng.application.controller('ViewFinancialTranController', ['$scope','webStorage','$routeParams','$route', 'ResourceFactory', '$http', mifosX.controllers.ViewFinancialTranController]).run(function($log) {
        $log.info("ViewFinancialTranController initialized");
    });
}(mifosX.controllers || {}));



