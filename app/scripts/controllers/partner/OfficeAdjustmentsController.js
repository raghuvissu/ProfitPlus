(function(module) {
  mifosX.controllers = _.extend(module, {
	  OfficeAdjustmentsController: function(scope, resourceFactory, routeParams, location,dateFilter,webStorage,$rootScope) {

        scope.formData = {};
        scope.partnerId = routeParams.partnerId ;
        scope.partnerName =  webStorage.get("partnerName");
        scope.officeId = routeParams.officeId;
        scope.officeName = webStorage.get("officeName");
        scope.start={};
        scope.start.date = new Date();
        
        resourceFactory.officeAdjustmentsTemplateResource.getAdjustments(function(data){
          scope.discountOptions = data.discountOptions;
          scope.data = data.data;
        });
        
        
        
        /*scope.reset = function(partnerId,officeId){
         if(partnerId&&officeId){
           location.path('/viewpartner/'+routeParams.partnerId+'/'+routeParams.officeId);
    	   webStorage.add("callingTab", {someString: "financial" });
        	}else if(officeId){
    		   location.path('/viewoffice/'+routeParams.officeId); 
    	   }
        };*/
        
        scope.reset = function(partnerId,officeId){
            if(partnerId&&officeId){
          	  location.path('/viewpartner/' +partnerId +'/'+ officeId);
            }else{	  
         	   webStorage.add("callingTab", {someString: "Partners" });
            }
         };
        
        scope.partnersTab = function(){
     	   webStorage.add("callingTab", {someString: "Partners" });
      };
     
        
        scope.submit = function() {
        	scope.formData.locale = scope.optlang.code;
          scope.formData.dateFormat = "dd MMMM yyyy";
      	  var adjustDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          scope.formData.adjustmentDate = adjustDate;
       
          resourceFactory.officeAdjustmentsResource.postAdjustments({officeId : routeParams.officeId}, scope.formData, function(){
        	  if( scope.partnerId){
        		  location.path('/viewpartner/'+routeParams.partnerId+'/'+routeParams.officeId);
        		  webStorage.add("callingTab", {someString: "financial" });
        		  
        	  }else{
                 location.path('/viewoffice/'+routeParams.officeId);
        	  }  
          });
        };

    }
  });
  mifosX.ng.application.controller('OfficeAdjustmentsController', [
    '$scope', 
    'ResourceFactory', 
    '$routeParams', 
    '$location',
    'dateFilter',
    'webStorage',
    '$rootScope', 
    mifosX.controllers.OfficeAdjustmentsController]).run(function($log) {
    $log.info("OfficeAdjustmentsController initialized");
  });
}(mifosX.controllers || {}));