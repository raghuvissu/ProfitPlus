(function(module) {
    mifosX.controllers = _.extend(module, {
        ClientIdentifierController: function(scope,webStorage, routeParams , location, resourceFactory) {
            scope.clientId = routeParams.clientId;
            scope.walletConfig = webStorage.get('is-wallet-enable');
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
            scope.formData = {};
            scope.documenttypes = [];
            resourceFactory.clientIdenfierTemplateResource.get({clientId: routeParams.clientId}, function(data) {
                scope.documenttypes = data.allowedDocumentTypes;
                scope.formData.documentTypeId = data.allowedDocumentTypes[0].id;
            });

            scope.reset123 = function(){
  	    	   webStorage.add("callingTab", {someString: "moreInfo" });
  	       };
            scope.submit = function () {
                resourceFactory.clientIdenfierResource.save({clientId:scope.clientId},this.formData,function(data){
                    location.path('/viewclient/id/' + data.clientId);
                });
                webStorage.add("callingTab", {someString: "moreInfo" });
            };

        }
    });
    mifosX.ng.application.controller('ClientIdentifierController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.ClientIdentifierController]).run(function($log) {
        $log.info("ClientIdentifierController initialized");
    });
}(mifosX.controllers || {}));

