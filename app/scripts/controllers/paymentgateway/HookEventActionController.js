(function(module) {
  mifosX.controllers = _.extend(module, {
	  HookEventActionController: function(scope, resourceFactory, location, route) {
		  
		  /* eventAction  data*/
	       /*scope.getEventActionMappingData=function(){*/
		        
	        	resourceFactory.EventActionMappingResource.query(function(data) {
	           	 scope.datas=data; 
	           });
	         /*};*/
	         
	         scope.isDeletedEventAction=function(id,value){
	       	  
	       	     resourceFactory.EventActionMappingResource.remove({id: id} , {} , function() {
	       	    	    route.reload();
	                    location.path('/hookeventaction');
	                    //scope.getEventActionMappingData();
	           });
	         };  
		  
		  
		  
		  
		  
	  }
  });
  mifosX.ng.application.controller('HookEventActionController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$route',
     mifosX.controllers.HookEventActionController]).run(function($log) {
    $log.info("HookEventActionController initialized");
  });
}(mifosX.controllers || {}));
