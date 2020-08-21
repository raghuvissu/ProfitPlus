(function(module) {
  mifosX.controllers = _.extend(module, {
CreateProductsController: function(scope, resourceFactory, location,dateFilter) {
	  scope.formData = {};
	  scope.services = [];
      scope.statuses = [];
      scope.serviceDetailsData = [];
      scope.productArray = [];
      scope.serviceFormData = [];
      scope.paramCategory = "P";
      scope.formData.productCategory = 'Product';
      /*scope.serviceCategories = ["Product"];*/
      scope.paramCategories = ["P","S"];
      scope.paramTypes = ["Text","Combo","Date","Boolean"];
      scope.paramValues = ["true","false"];
      scope.paramType = dateFilter(new Date(),'yyyy-MM-dd');
	    resourceFactory.productTemplateResource.get(function(data) {
	    	 scope.services= data.serviceTypes;
	    	 scope.statuses= data.status;
	    	 scope.serviceParamsData = angular.copy(data.serviceParamsData);
	    	 scope.serviceCategorys = data.serviceCategorys;
	    	 for(var i in scope.statuses){
	    		 if((scope.statuses[i].value).toLowerCase() == "active"){
	    			 scope.formData.status = scope.statuses[i].value;
	    		 }
	    	 }
	         
	    });
        
         scope.deleteService = function (index) {
            scope.productArray.splice(index,1);
          };
        
          /*scope.changeServiceCategory = function(){
        	  scope.productArray = [];
        	  delete scope.formData.serviceId;
          }*/
          
        scope.addService = function () {
        	if (scope.serviceFormData.paramName && scope.serviceFormData.paramType && scope.serviceFormData.paramValue && scope.serviceFormData.paramCategory) {
									              scope.productArray
											.push({
												paramName : scope.serviceFormData.paramName,
												paramType : scope.serviceFormData.paramType,
												paramValue: scope.serviceFormData.paramValue,
												paramCategory: scope.serviceFormData.paramCategory
												
											});
              scope.serviceFormData.paramName = undefined;
              scope.serviceFormData.paramType = undefined;
              scope.serviceFormData.paramValue = undefined;
              scope.serviceFormData.paramCategory = undefined;
        	}
          };
	        scope.onAddChangeParam = function(index){
	        	if(index != null){
	            		scope.productArray[index].paramValue = [];
	        	}else{
	        		scope.serviceFormData.paramValue = [];
	        	}
	        };
	        
	        scope.addDetail = function(paramName,paramType,paramCategory,paramValue){
	        	scope.serviceFormData.paramName = paramName;
				  scope.serviceFormData.paramType = paramType;
				  scope.serviceFormData.paramCategory = paramCategory;
				  scope.serviceFormData.paramValue = paramValue; 
				  scope.addService();
		    };
		    
		    scope.addServiceDetailsForTv = function(){
	    		for(var i in scope.serviceParamsData){
     			  if(scope.serviceParamsData[i].mCodeValue == "Network_node"){
     				 scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select b.id,code_value from m_code a, m_code_value b where a.id = b.code_id and code_name='Provisioning' order by id");
     			  }else if(scope.serviceParamsData[i].mCodeValue != "Network_node" && scope.serviceParamsData[i].mCodeValue != "Technology"){
     				 scope.addDetail(scope.serviceParamsData[i].id,"Text","P","123"); 
     			  }
	    		}
	    }  
	    
	    scope.addServiceDetailsForBB = function(){
	    	for(var i in scope.serviceParamsData){
 			  if(scope.serviceParamsData[i].mCodeValue == "Network_node"){
 				 scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select b.id,code_value from m_code a, m_code_value b where a.id = b.code_id and code_name='Provisioning' order by id");
 			  }else if(scope.serviceParamsData[i].mCodeValue == "Technology"){
 				 scope.addDetail(scope.serviceParamsData[i].id,"Combo","S","select b.id,code_value from m_code a, m_code_value b where a.id = b.code_id and code_name='Technology' order by id"); 
 			  }else if(scope.serviceParamsData[i].mCodeValue == "userName"){
 				 scope.addDetail(scope.serviceParamsData[i].id,"Text","S","Srikanth"); 
 			  }else if(scope.serviceParamsData[i].mCodeValue == "password"){
 				 scope.addDetail(scope.serviceParamsData[i].id,"Text","S","Rajnikanth"); 
 			  }else{
 				 scope.addDetail(scope.serviceParamsData[i].id,"Text","P","123");  
 			  }
    		}
	    };
	        
	    scope.typeChangeFun = function(serviceId){
	    	scope.productArray = [];
	    	
	    	if(scope.formData.serviceCategory == 'Service'){
	    		if(serviceId == "TV" ){
	    			 scope.addServiceDetailsForTv();
	    		}else if(serviceId == "BB" ){
	    			 scope.addServiceDetailsForBB();
	    		}
       		  
       	  }else if(scope.formData.productCategory == 'Product'){
       		resourceFactory.productResourceForDetails.get({productId:serviceId,paramCategory:scope.paramCategory},function(data) {
       			  	scope.serviceDetailsData = data.serviceDetailDatas;
       			  	for(var i in scope.serviceDetailsData){
       			  	  scope.serviceFormData.paramName = scope.serviceDetailsData[i].paramName;
      				  scope.serviceFormData.paramType = scope.serviceDetailsData[i].paramType;
      				  scope.serviceFormData.paramCategory = scope.serviceDetailsData[i].paramCategory;
      				  scope.serviceFormData.paramValue = scope.serviceDetailsData[i].paramValue; 
      				  scope.addService();
       			  	}
       	      });
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
					                   scope.formData.productArray
												.push({
													paramName : scope.productArray[i].paramName,
													paramType : scope.productArray[i].paramType,
													paramValue : scope.productArray[i].paramValue,
													paramCategory : scope.productArray[i].paramCategory
												});
                };
              }
            
          resourceFactory.productResource.save(scope.formData,function(data){
        		  location.path('/services');
          });
        };
    }
  });
 mifosX.ng.application.controller('CreateProductsController', [
                                                              '$scope', 
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              'dateFilter',
                                                              mifosX.controllers.CreateProductsController]).run(function($log) {
    $log.info("CreateProductsController initialized");
  });
}(mifosX.controllers || {}));
