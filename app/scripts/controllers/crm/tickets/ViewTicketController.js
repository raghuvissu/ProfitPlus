(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewTicketController: function(scope,webStorage, routeParams , route, location, resourceFactory, http,PermissionService,$rootScope,API_VERSION,TENANT) {
        scope.ticket = []; 
        scope.PermissionService = PermissionService;
        
        resourceFactory.clientResource.get({clientId: routeParams.clientId} , function(data) {
            var clientData = data;
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
           });
        resourceFactory.ticketResource.get({id: routeParams.id,clientId: routeParams.clientId} , function(data) {      	
            scope.ticket = data; 
            scope.clientId= routeParams.clientId;
        });
        resourceFactory.ticketHistoryResource.get({id: routeParams.id} , function(data) {  
            scope.historyData = data.masterData;
            scope.problemDescription=data.problemDescription;
        });
        
        scope.reset123 = function(){
      	   webStorage.add("callingTab", {someString: "Tickets" });
         };
        scope.setData= function(){
        	
        };
        
        scope.downloadDocument = function(id) {
        	window.open($rootScope.hostUrl + API_VERSION + '/tickets/' + id + '/print' + '?tenantIdentifier='+TENANT);
        };
        
        scope.deletemessage = function (){
            resourceFactory.messageSaveResource.delete({messageId: routeParams.id} , {} , function(data) {
                  location.path('/tickets/'+routeParams.clientId);
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewTicketController', ['$scope', 'webStorage','$routeParams', '$route', '$location', 'ResourceFactory', '$http','PermissionService','$rootScope','API_VERSION','TENANT', mifosX.controllers.ViewTicketController]).run(function($log) {
    $log.info("ViewTicketController initialized");
  });
}(mifosX.controllers || {}));
