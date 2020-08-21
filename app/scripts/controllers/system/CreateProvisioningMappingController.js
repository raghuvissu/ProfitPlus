(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateProvisioningMappingController: function(scope, resourceFactory, location,webStorage,dateFilter) {
			
			        scope.commands = [];
			        scope.provisioning = [];
			        scope.parameterFormData = {};
			        scope.commandParameters = [];
			        scope.paramvaluesboolean = ["True","False"];
			        scope.paramTypes = ["Text","Combo","Date","Boolean","DateTime"];
			        scope.paramType = dateFilter(new Date(),'dd/MM/yyyy');
			        
			        resourceFactory.provisioningtemplateMappingResource.get(function(data) {
			            scope.commands = data.commands;
			            scope.provisioning = data.provisioning;
			            scope.formData = {
			            		
			            };
			        });
			        
			        scope.reset123 = function(){
			        	webStorage.add("callingTab", {someString: "provisioningCommandTab" }); 
			        };
			        
			        /*scope.addParameters = function () {
			        	if (scope.parameterFormData.commandParam && scope.parameterFormData.paramType) {
			              scope.commandParameters.push({commandParam:scope.parameterFormData.commandParam,
			            	  paramType:scope.parameterFormData.paramType}); 
			                 scope.parameterFormData.commandParam = undefined;
			                  scope.parameterFormData.paramType = undefined;
			        	 } 
			        };*/
			        
			        scope.addParameters = function () {
			        	if (scope.parameterFormData.commandParam && scope.parameterFormData.paramType && 
			        			scope.parameterFormData.paramDefault && scope.parameterFormData.paramLength) {
			        		scope.commandParameters.push({commandParam:scope.parameterFormData.commandParam,
			            	  paramType:scope.parameterFormData.paramType,paramDefault:scope.parameterFormData.paramDefault,paramLength:scope.parameterFormData.paramLength});
			              scope.parameterFormData.commandParam = undefined;
			              scope.parameterFormData.paramType = undefined;
			              scope.parameterFormData.paramDefault = undefined;
			              scope.parameterFormData.paramLength = undefined;
			        	}
			          };
			          
			        scope.deleteParameter = function (index) {
			        	  scope.commandParameters.splice(index, 1);
			        };
			          
			        scope.submit = function() {  
			        	scope.formData.commandParameters =new Array();
			            if (scope.commandParameters.length > 0) {
			              
			            	for (var i in scope.commandParameters) {
			            		if(scope.commandParameters[i].paramType == 'Date'){
			            			scope.commandParameters[i].paramDefault = dateFilter(new Date(),'dd/MM/yyyy');
			            		}
				                   scope.formData.commandParameters.push({
				                	   commandParam:scope.commandParameters[i].commandParam,
				                	   paramType:scope.commandParameters[i].paramType,
				                	   paramDefault:scope.commandParameters[i].paramDefault,
				                	   paramLength:scope.commandParameters[i].paramLength});
				             };
			            }
			             
			            resourceFactory.provisioningMappingResource.save(this.formData, function(data){
			            	location.path('/mappingconfig');
			            });
			        };
		  
		    }
	 });
	  mifosX.ng.application.controller('CreateProvisioningMappingController', [
	  	     '$scope', 
	  	     'ResourceFactory',
	  	     '$location',
	  	     'webStorage',
	  	     'dateFilter',
	 mifosX.controllers.CreateProvisioningMappingController ]).run(function($log) {
	  	     $log.info("CreateProvisioningMappingController initialized");
	});
}(mifosX.controllers || {}));