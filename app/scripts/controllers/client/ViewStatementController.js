(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewStatementController: function(scope,webStorage, routeParams , route, location, resourceFactory, http,API_VERSION,$rootScope,TENANT) {
		 // alert("hh");
        scope.statementDatas = [];    
        scope.id=routeParams.id;
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
        scope.image=clientData.image;
        resourceFactory.singleStatementResource.get({billId: routeParams.id} , function(data) {
            scope.statementDatas = data;
        });
        
        scope.downloadFile = function (){
        	window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/'+routeParams.id+'/print?tenantIdentifier='+TENANT);
        };
       
    }
  });
  mifosX.ng.application.controller('ViewStatementController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', '$http','API_VERSION','$rootScope','TENANT', mifosX.controllers.ViewStatementController]).run(function($log) {
    $log.info("ViewStatementController initialized");
  });
}(mifosX.controllers || {}));