(function(module) {
  mifosX.controllers = _.extend(module, {
	  AdjustmentClientController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,$rootScope) {

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
        //scope.datass = {};
        scope.start={};
        scope.start.date = new Date();
        scope.minDate= scope.start.date;
        
        resourceFactory.adjustmentTemplateResource.get(function(data){
          scope.discountOptions = data.discountOptions;
          scope.data = data.data;
          scope.formData.adjustment_type = scope.discountOptions[0].discountType;
         
        //  scope.formData.destinationOfficeId = scope.offices[0].id;  
        });
        scope.dbClick = function(){
        	console.log("dbclick");
        	return false;
        };
        
         scope.reset123 = function(){
        	webStorage.add("callingTab", {someString: "FinancialSummaryTab" });
         };
        
        scope.submit = function() {
        	scope.flag = true;
          this.formData.locale = "en";
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var adjustmentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.adjustment_date = adjustmentDate;
         // this.formData.adjustment_type = "CREDIT";
          resourceFactory.adjustmentResource.save({clientId : routeParams.id}, this.formData, function(data){
            location.path('/viewclient/id/'+routeParams.id);
          },function(errData){
        	  scope.flag = false;
          });
        };

    }
  });
  mifosX.ng.application.controller('AdjustmentClientController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','$rootScope', mifosX.controllers.AdjustmentClientController]).run(function($log) {
    $log.info("AdjustmentClientController initialized");
  });
}(mifosX.controllers || {}));
