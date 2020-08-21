(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddGRNController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,$rootScope,http,API_VERSION) {
        scope.itemDatas = [];
        scope.officeId = [];
        scope.officeDatas = [];
        scope.supplierDatas = [];
        scope.formData = {};
        scope.formData.purchaseDate = new Date();
        
        resourceFactory.grnTemplateResource.get(function(data) {
        	scope.itemDatas = data.itemData;
            scope.officeDatas = data.officeData;
            scope.supplierDatas = data.supplierData;
            scope.officeId=data.officeId;
            
        });
        
        scope.getData = function(query){
        	return http.get($rootScope.hostUrl+API_VERSION+'/grn/template', {
        	      params: {
        	    	  		query: query
        	      		   }
        	
        	    }).then(function(result){
        	    	scope.officeDatas = [];
	        	      for(var i in result.data.officeData){
	        	    	  scope.officeDatas.push(result.data.officeData[i]);
	        	    	  console.log(result.data.officeData[i]);
	        	    	  if(i == 7)
	        	    		  break;
	        	      }

	        	    if(scope.officeDatas.length == 0){
	        	    	delete scope.formData.name;
	        	    	delete scope.formData.nameDecorated;
	        	    	delete scope.formData.externalId;
	        	    }
        	      return scope.officeDatas;
        	    });
        };
        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
        };
        scope.selectedGRN=function(){
        	webStorage.add("callingTab", {someString: "grn" });
        };
        scope.changeSupplierFun = function(){
        	resourceFactory.supplierItemsResource.query({supplierId: scope.formData.supplierId},function(data) {
        		scope.itemDatas = data;
        	});
        };
        scope.getBothSup =function(supplierCode,supplierDescription){
        	return supplierCode+"--"+supplierDescription;
        };
        
        scope.getBothItem = function(itemCode, itemDescription){
        	return itemCode+"--"+itemDescription;
        };
        
       scope.reset123 = function(){
    	   webStorage.add("callingTab", {someString: "grn" });
       };
                
        scope.submit = function() {
        	this.formData.locale = scope.optlang.code;
        	var reqDate = dateFilter(scope.formData.purchaseDate,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.purchaseDate = reqDate;
            for(var i in scope.officeDatas){
           		if(scope.officeDatas[i].externalId == scope.formData.officeId){
           			scope.formData.officeId = scope.officeDatas[i].id;break;
           		}
           	}
            resourceFactory.grnResource.save(this.formData,function(data){
            if(PermissionService.showMenu('READ_GRN'))
            	location.path('/viewgrn/' + data.resourceId);
            else
            	location.path('/inventory');
            	webStorage.add("callingTab", {someString: "grn" });
          });
        };
    }
  });
  mifosX.ng.application.controller('AddGRNController', ['$scope','webStorage', 'ResourceFactory', '$location','dateFilter','PermissionService','$rootScope', '$http', 
                                                        'API_VERSION', mifosX.controllers.AddGRNController]).run(function($log) {
    $log.info("AddGRNController initialized");
  });
}(mifosX.controllers || {}));
