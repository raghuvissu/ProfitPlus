(function(module) {
  mifosX.controllers = _.extend(module, {
	  StatementController: function(scope,webStorage, routeParams, location, resourceFactory,dateFilter,$rootScope) {
		  
		    scope.start = {};
		    scope.clientId = routeParams.id;
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
	        scope.formData ={};
	        if(scope.imagePresent){
	        scope.image=clientData.image;
	        }
	        scope.start.date = new Date();

	        scope.cancel = function() {
             
              webStorage.add("callingTab", {someString: "StatementsTab" });
          };
        
         scope.submit = function() {
        	 
        	    this.formData.locale = scope.optlang.code;
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.dateFormat = 'dd MMMM yyyy';
	            this.formData.dueDate=reqDate;
	             resourceFactory.statementResource.save({clientId: routeParams.id},this.formData,function(data) {
	             location.path('/viewclient/id/' +routeParams.id);
          });
             webStorage.add("callingTab", {someString: "StatementsTab" });
        };
    }
  });
  mifosX.ng.application.controller('StatementController', [
    '$scope',
    'webStorage', 
    '$routeParams',  
    '$location', 
    'ResourceFactory', 
    'dateFilter',
    '$rootScope',
    mifosX.controllers.StatementController]).run(function($log) {
    $log.info("StatementController initialized");
  });
}(mifosX.controllers || {}));