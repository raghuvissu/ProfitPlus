(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditGRNController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,routeParams,$rootScope,http,API_VERSION) {
        scope.itemDatas = [];
        scope.officeDatas = [];
        scope.officeId = [];
        scope.supplierDatas = [];
        scope.formData = {};
        scope.grn={};
        
        resourceFactory.grnTemplateResource.get(function(data) {
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
        
        scope.changeSupplierFun = function(fromUI){
        	if(fromUI){
        		delete scope.formData.itemMasterId;
        	}
        	resourceFactory.supplierItemsResource.query({supplierId: scope.formData.supplierId},function(data) {
        		scope.itemDatas = data;
        	});
        };
        
        resourceFactory.grnResource.get({grnId: routeParams.id} , function(data) {
        	var purchaseDate = dateFilter(data.purchaseDate,'dd MMMM yyyy');
        	scope.formData.purchaseDate = new Date(purchaseDate);
        	scope.formData.purchaseNo=data.purchaseNo;
        	scope.formData.supplierId=data.supplierId;
        	scope.formData.officeId=data.officeId;
        	scope.formData.itemMasterId=data.itemMasterId;
        	scope.formData.orderdQuantity=data.orderdQuantity;
        	scope.changeSupplierFun(false);
        });
        
        scope.selectedGRN=function(){
        	webStorage.add("callingTab", {someString: "grn" });
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
            
            resourceFactory.grnResource.update({grnId:routeParams.id},this.formData,function(data){
            if(PermissionService.showMenu('READ_GRN'))
            	location.path('/viewgrn/' + data.resourceId);
            else
            	location.path('/inventory');
          });
        };
    }
  });
  mifosX.ng.application.controller('EditGRNController', ['$scope','webStorage', 'ResourceFactory', '$location','dateFilter','PermissionService','$routeParams','$rootScope','$http', 'API_VERSION', mifosX.controllers.EditGRNController]).run(function($log) {
    $log.info("EditGRNController initialized");
  });
}(mifosX.controllers || {}));
