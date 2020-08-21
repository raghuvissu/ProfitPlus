(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateClientServiceController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter,
				  																	$rootScope,API_VERSION,http) {
		  
			  scope.clientId=routeParams.clientId;
			  var officeId=routeParams.officeId;
			  scope.formData = {};
			  scope.date = {};
			  scope.officesDatas = [];
			  scope.itemDatas = [];
			  scope.details = [];
			  scope.formData.clientServiceDetails = [];
			  scope.paramValues = ["true","false"];
			  
			  var clientData = webStorage.get('clientData');
			  if(webStorage.get('clientData')){
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.displayName=clientData.displayName;
				    scope.statusActive=clientData.statusActive;
				    scope.accountNo=clientData.accountNo;
				    scope.officeName=clientData.officeName;
				    scope.balanceAmount=clientData.balanceAmount;
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.currency=clientData.currency;
				    scope.imagePresent=clientData.imagePresent;
				    scope.categoryType=clientData.categoryType;
			        scope.email=clientData.email;
			        scope.phone=clientData.phone;
			        scope.addressNo=clientData.addressNo;
			        scope.street=clientData.street;
			        scope.city=clientData.city;
			        scope.state=clientData.state;
			        scope.country=clientData.country;
			        scope.walletAmount=clientData.walletAmount;
			        scope.activationDate=clientData.activationDate;
			        if(scope.imagePresent){
			        	scope.image=clientData.image;
			        }
		  		}
			 
			  resourceFactory.clientserviceTemplateResource.get(function(data) {
				  scope.serviceData = data.serviceData;
			  });
			  scope.getBothService = function(serviceCode, serviceDescription){
				  return serviceCode+"--"+serviceDescription;
			  };
			  scope.changeServiceFun = function(){
				  resourceFactory.clientserviceparamResource.get({serviceId: scope.formData.serviceId,paramCategory:"S"}, function(data) {
					  scope.serviceDetail = angular.copy(data);
					  scope.details = data;
				  });
			  };
	        
	        /*scope.reset123 = function(){
	        	location.path('/viewclient/' + routeParams.clientId);
	         };*/
	         
	         scope.submit = function(){
	        	 scope.formData.clientId = parseInt(routeParams.clientId);
	        	 for(var i in scope.serviceDetail){
	        		 scope.formData.clientServiceDetails
						.push({
							 status: 'new',
							 parameterId: parseInt(scope.serviceDetail[i].paramName),
							 parameterValue: scope.serviceDetail[i].paramValue
							 
						});
	        	 }
	        	 
	        	 resourceFactory.clientservicesaveResource.save(scope.formData, function(data) {
	        		 location.path('/viewclient/id/' + scope.formData.clientId);
	   		  	 });
	         };
	         
	    }
	  });
	  mifosX.ng.application.controller('CreateClientServiceController', [
	                                                           '$scope',
	                                                           'webStorage',
	                                                           '$routeParams',
	                                                           '$location',
	                                                           'ResourceFactory',
	                                                           'dateFilter',
	                                                           '$rootScope',
	                                                           'API_VERSION',
	                                                           '$http',
	                                                           mifosX.controllers.CreateClientServiceController]).run(function($log) {
        $log.info("CreateClientServiceController initialized");
    });
}(mifosX.controllers || {}));