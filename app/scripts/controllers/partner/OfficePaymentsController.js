(function(module) {
  mifosX.controllers = _.extend(module, {
	  OfficePaymentsController: function(scope,resourceFactory, routeParams, location,dateFilter,webStorage,$rootScope) {

        scope.formData = {};
        scope.officeId = routeParams.officeId;
        scope.partnerId = routeParams.partnerId ;
        scope.officeName = webStorage.get("officeName");
        scope.partnerName =  webStorage.get("partnerName");
        scope.start={};
        scope.start.date = new Date();
        
        resourceFactory.officePaymentsTemplateResource.getPayments(function(data){
        	scope.payments = data;
            scope.data = data.data;
            
            scope.paymentTypeData=function(value){
            	
            	for(var i=0;i<scope.data.length;i++){
            		  if(scope.data[i].id === value){
            			  scope.paymentType=scope.data[i].mCodeValue;
            		    }
            	      }
                  };
        });
        
        scope.reset = function(partnerId,officeId){
            if(partnerId&&officeId){
              location.path('/viewpartner/'+routeParams.partnerId+'/'+routeParams.officeId);
       	      webStorage.add("callingTab", {someString: "financial" });
           	}else if(officeId){
       		   location.path('/viewoffice/'+routeParams.officeId); 
       	   }
        };
        
        scope.partnersTab = function(){
      	   webStorage.add("callingTab", {someString: "Partners" });
       };
        
        scope.submit = function() {

          scope.flag = true;
          scope.formData.locale = scope.optlang.code;
          scope.formData.dateFormat = "dd MMMM yyyy";
      	  var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
      	  scope.formData.paymentDate= paymentDate;
          if(scope.paymentType==='Cheque'){
        	    scope.formData.isChequeSelected = true;
          }else{
        	  delete scope.formData.isChequeSelected;
          }
          resourceFactory.officePaymentsResource.postPayments({officeId : routeParams.officeId}, scope.formData, function(){
        	  if(scope.partnerId){
        		  location.path('/viewpartner/'+routeParams.partnerId+'/'+routeParams.officeId);
        		  webStorage.add("callingTab", {someString: "financial" });
        		  
        	  }else{
                 location.path('/viewoffice/'+routeParams.officeId);
        	  }
          });
          };
    }
  });
  mifosX.ng.application.controller('OfficePaymentsController', [
    '$scope', 
    'ResourceFactory', 
    '$routeParams', 
    '$location',
    'dateFilter',
    'webStorage',
    '$rootScope',
    mifosX.controllers.OfficePaymentsController]).run(function($log) {
    $log.info("OfficePaymentsController initialized");
  });
}(mifosX.controllers || {}));
