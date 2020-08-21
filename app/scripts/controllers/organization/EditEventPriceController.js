(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditEventPriceController: function(scope, routeParams , location,resourceFactory,$rootScope) {		
      
       scope.OptTypes=[];
		scope.ClientTypes=[]; 
		scope.Format=[];
		scope.Discountdatas=[];
		scope.formData={};
        resourceFactory.eventPriceEditResource.geteventpricedetail({id: routeParams.id} , function(data) {       	 	
        	scope.formData=data;
        	scope.OptTypes = data.optTypes;				
			scope.Format = data.format;				
			scope.Discountdatas = data.discountdata;				
			scope.ClientTypes = data.clientTypes;
                                  
        });

        scope.submit = function() { 
        	this.formData.clientType = this.formData.clientTypeId ;
        	delete this.formData.discount;
        	delete this.formData.clientTypeId;
        	delete this.formData.eventName;
        	delete this.formData.optTypes;
        	delete this.formData.format;
        	delete this.formData.discountdata;
        	delete this.formData.clientTypes;
        	delete this.formData.id;
        	 this.formData.locale = scope.optlang.code;
        	
            resourceFactory.eventPriceUpdateResource.update({'id': routeParams.id},this.formData,function(data){
                location.path('/viewEventPrice/' + data.resourceId);
             });
        };
    
    }
  });
  mifosX.ng.application.controller('EditEventPriceController', ['$scope', '$routeParams', '$location','ResourceFactory','$rootScope', mifosX.controllers.EditEventPriceController]).run(function($log) {
    $log.info("EditEventPriceController initialized");
  });
}(mifosX.controllers || {}));