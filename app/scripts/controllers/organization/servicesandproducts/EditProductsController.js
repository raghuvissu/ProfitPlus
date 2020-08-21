(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditProductsController: function(scope, routeParams, location, resourceFactory,dateFilter) {
		  
		 scope.formData = {};
		 scope.productId = routeParams.id;
    	 scope.services = [];
         scope.statuses = [];
         scope.productArray = [];
         /*scope.serviceCategories = ["Product"];*/
         scope.formData.productCategory = 'Product';
         scope.paramCategories = ["P","S"];
         scope.paramTypes = ["Text","Combo","Date","Boolean"];
         scope.paramValues = ["true","false"];
         scope.serviceFormData = [];
        resourceFactory.productResource.get({productId: scope.productId, template: 'true'} , function(data) {
        	  scope.services= data.serviceTypes;
              scope.statuses= data.status;
              scope.serviceParamsData = data.serviceParamsData;
              scope.productArray=data.productDetailDatas;
              scope.serviceDetailDatas = angular.copy(data.serviceDetailDatas);
              scope.serviceCategorys = data.serviceCategorys;
              
              scope.formData = {
				        			productCode 		: data.productCode,
				        			productDescription 	: data.productDescription,
				          			status 				: data.productStatus,
				          			serviceId   		: data.serviceId,
				          			productCategory     : data.productCategory,
				          			//isOptional 			: data.isOptional,
          						};
              if(scope.formData.productCategory == 'S'){
            		scope.formData.productCategory = 'Service';
            	}else{
            		scope.formData.productCategory = 'Product';
            	}
              if(data.isOptional=="Y"){
    				scope.formData.isOptional=true;
    			}
              
              if(data.isAutoProvision =="Y"){
  				scope.formData.isAutoProvision=true;
  			}
        });
        
        scope.addService = function () {
        	if (scope.serviceFormData.paramName && scope.serviceFormData.paramType && scope.serviceFormData.paramCategory) {
        		scope.productArray
						.push({
							paramName: scope.serviceFormData.paramName,
							codeParamName : scope.serviceFormData.mCodeValue,
							paramType : scope.serviceFormData.paramType,
							paramValue: scope.serviceFormData.paramValue,
							paramCategory: scope.serviceFormData.paramCategory
						});
				scope.serviceFormData.paramName = undefined;
				scope.serviceFormData.paramType = undefined;
				scope.serviceFormData.paramValue = undefined;
				scope.serviceFormData.mCodeValue = undefined;
				scope.serviceFormData.paramCategory = undefined;
        	}
          };
        
          scope.deleteService = function (index) {
	          scope.productArray.splice(index,1);
	      };
	      
	      scope.onAddChangeParam = function(index){
	        	if(index != null){
	            		scope.productArray[index].paramValue = [];
	        	}else{
	        		scope.serviceFormData.paramValue = [];
	        	}
	        };
	        
        scope.submit = function() {
        	if(scope.formData.productCategory == 'Service'){
        		scope.formData.productCategory = 'S';
        	}else{
        		scope.formData.productCategory = 'P';
        	}
        	scope.formData.productArray =new Array();
            if (scope.productArray.length > 0) {
         	   for (var i in scope.productArray) {
         		   scope.formData.productArray.push({
         			   paramName:scope.productArray[i].paramName,
         			   paramType:scope.productArray[i].paramType,
         			   paramValue:scope.productArray[i].paramValue,
         			   paramCategory:scope.productArray[i].paramCategory
         			   });
              };
           }
            this.formData.productArray = scope.formData.productArray;
            delete this.formData.serviceDetailDatas;
        	
             resourceFactory.productResource.update({productId: scope.productId},scope.formData,function(data){
             location.path('/viewproducts/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditProductsController', [
                                                             '$scope',
                                                             '$routeParams',
                                                             '$location', 
                                                             'ResourceFactory',
                                                             'dateFilter',
                                                             mifosX.controllers.EditProductsController]).run(function($log) {
    $log.info("EditProductsController initialized");
  });
}(mifosX.controllers || {}));