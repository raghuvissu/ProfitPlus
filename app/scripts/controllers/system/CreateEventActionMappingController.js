(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateEventActionMappingController: function(scope, resourceFactory, location,webStorage) {
		  
		  
		  scope.actionDatas = [];
	      scope.eventDatas = [];
	      scope.orderbys = [];
	      scope.preposts = [{name:"Pre",value:false},{name:"Post",value:true}];
	      scope.formData={};
	      for (var i=0; i<5; i++) {
	        	scope.orderbys.push({
	        		value:i
	        	});
	          }
	        resourceFactory.EventActionMappingTemplateResource.get(function(data) {
	           
	        	scope.actionDatas = data.actionData;
	          //  scope.formData = data;
	            scope.eventDatas = data.eventData;
	        });
	        
	        
	        scope.reset123 = function(){
	        	webStorage.add("callingTab", {someString: "eventActionTab" }); 
	        };
	      
	        scope.submit = function() {
	            resourceFactory.EventActionMappingResource.save(this.formData, function(data){
	            		location.path('/eventaction');
	            });
	        };
	  
	     }
     
   });
  mifosX.ng.application.controller('CreateEventActionMappingController', [
          '$scope', 
          'ResourceFactory', 
          '$location',
          'webStorage',
  mifosX.controllers.CreateEventActionMappingController ]).run(function($log) {
         $log.info("CreateEventActionMappingController initialized");
  });
}(mifosX.controllers || {}));