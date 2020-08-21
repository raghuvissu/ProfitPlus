(function(module) {
  mifosX.controllers = _.extend(module, {
	  CommandCenterController: function(scope, resourceFactory,location,route, uibModal, routeParams) {
		  scope.offices = [];
		  scope.officeTypes = [];
		  scope.provisioning = [];
		  
		  resourceFactory.orderCommandCenterTemplateResource.get({} , function(data) {
              scope.offices = angular.copy(data.officeData);
              scope.offices.push({
					id:0,
					name:"All"
				});
              console.log( scope.offices);
              scope.provisioning = data.provisioningSystems;
              scope.officeId = 0;
          });
		  
		  scope.commandCenter=function(id){
         		resourceFactory.commandCenterResource.get({'commandId' : id},function(data) {
	           		  scope.commandParameters = angular.copy(data.commandParameters);
	           		  for(var i in scope.commandParameters){
	           			  if(scope.commandParameters[i].paramType != "Combo"){
	           				  scope.commandParameters[i].commandValue = scope.commandParameters[i].paramDefault;
	           			  }
	           		  }
	           		  scope.commandParameter = angular.copy(data);
	           		  for(var i in scope.commandParameters){
	           			  if(scope.commandParameters[i].paramType == "Combo"){
	           				scope.paramValuesData = scope.commandParameters[i].paramValues;
	           				console.log($scope.paramValuesData);
	           			  }
	           		  }
	            });
         	};
         	
		  scope.provisioningSystemchangefun=function(){
       		resourceFactory.provisioningCommandsResource.get({'provisioningSystemId' : scope.formData.provisioningSystem},function(data) {
	           		  scope.commandData = angular.copy(data);
	         });
		};
		  
         	scope.submit = function() {
         		scope.formData.requestMessage = [];
         		scope.paramDetailsInfo = [];
         		scope.groupInfo = [];
         		for(var i in scope.commandData){
            	
            			scope.formData.requestType = scope.commandData[i].commandName;
            			console.log(scope.formData.requestType);
            			scope.formData.provisioningSystem = scope.commandData[i].provisioningSystem;break;
            		
            	}
            	for(var i in scope.commandParameters){
            		if(scope.commandParameters[i].paramType == "Date"){
            			scope.commandParameters[i].commandValue = dateFilter(scope.commandParameters[i].commandValue,'dd/MM/yyyy');
            		}
            		
            		var commandParamName = scope.commandParameters[i].commandParam;
            		scope.paramDetailsInfo
						.push({
							[commandParamName]: scope.commandParameters[i].commandValue
						});
	        	 }
            	scope.groupInfo
				.push({
					officeId: scope.officeId
				});
            	scope.formData.type = 'group';
            	scope.formData.requestMessage.push({groupInfo:scope.groupInfo});
            	scope.formData.requestMessage.push({paramDetailsInfo:scope.paramDetailsInfo});
         		resourceFactory.osdResource.save(scope.formData, function(data) {
                	  location.path('/home');
              });
            };
       
		  
	  }
  });
  mifosX.ng.application.controller('CommandCenterController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$route',
     '$uibModal',
     '$routeParams',
     mifosX.controllers.CommandCenterController]).run(function($log) {
    $log.info("CommandCenterController initialized");
  });
}(mifosX.controllers || {}));
