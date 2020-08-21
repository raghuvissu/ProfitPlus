(function(module) {
  mifosX.controllers = _.extend(module, {
	  CloseTicketController: function(scope,webStorage, routeParams , location,resourceFactory ) {		
            scope.statusTypes=[];
            scope.formData={};
            var locationOrigin = window.location.origin;
        	var locationPathname = window.location.pathname;
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
        resourceFactory.ticketResourceTemplate.getForCloseTicket({templateFor: 'closeticket'}, function(data) {       	 	
        	scope.statusTypes = data;				
        	scope.clientId=routeParams.clientId;
			scope.ticketId=routeParams.id;               
        });
        
        scope.reset123 = function(){
	     	   webStorage.add("callingTab", {someString: "Tickets" });
	    };
	        
        scope.submit = function() { 
        	this.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId+"/";
            resourceFactory.closeTicketResource.update({'ticketId': routeParams.id},this.formData,function(data){
                location.path('/viewclient/id/'+routeParams.clientId);
             });
            scope.reset123();
        };
    
    }
  });
  mifosX.ng.application.controller('CloseTicketController', ['$scope','webStorage','$routeParams', '$location','ResourceFactory', mifosX.controllers.CloseTicketController]).run(function($log) {
    $log.info("CloseTicketController initialized");
  });
}(mifosX.controllers || {}));