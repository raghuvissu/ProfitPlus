(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditMessageController: function(scope, routeParams, resourceFactory, location) {
        
        scope.formData = {};
		scope.formData.messageParams=[];
        scope.messageFormData={};
        resourceFactory.messageSaveResource.get({messageId: routeParams.id} , function(data) {	
         scope.formData=data;
         scope.messageTypes=data.messageTypes;
         scope.formData.messageParams=data.messageParams;
        });
        
        scope.addMessage = function () {     
            scope.formData.messageParams.push({parameter:scope.messageFormData.parameter});         
            scope.messageFormData.parameter = undefined;	           
     
        };
        
        scope.deleteMessageParam = function (index) {
            scope.formData.messageParams.splice(index,1);
          };
          
        scope.submit = function() {        
                resourceFactory.messageSaveResource.update({'messageId': routeParams.id},this.formData,function(data){
                location.path('/viewmessage/' + data.resourceId);
             });
        };
    }
  });
  mifosX.ng.application.controller('EditMessageController',[
		 '$scope', 
		 '$routeParams', 
		 'ResourceFactory', 
		 '$location', 
  mifosX.controllers.EditMessageController]).run(function($log) {
	  	 $log.info("EditMessageController initialized");
  });
}(mifosX.controllers || {}));