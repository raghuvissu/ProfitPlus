(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPlanController: function(scope, routeParams, resourceFactory,dateFilter, location,$rootScope) {
    	
    	scope.planId = routeParams.id;
    	scope.formData = {};
    	scope.planStatus = [];
        scope.billRuleDatas = [];
        scope.provisionSysDatas = [];
        scope.date = {};
        scope.products=[];
        scope.selectedProducts = [];
        scope.volumeTypes=[];
        scope.planTypeData=[];
        scope.currencydatas = [];
        
        resourceFactory.planResource.get({planId: scope.planId, template: 'true'} , function(data) {
        	
        	
            scope.formData = {
            					planCode 				: data.planCode,
            					status 					: data.status,
            					planDescription 		: data.planDescription,
            					billRule 				: data.billRule,
            					planType				: data.planType,
            					currencyId				: data.currencyId
            				  };
            
            scope.planStatus=data.planStatus;
            scope.billRuleDatas = data.billRuleDatas;
            scope.provisionSysDatas=data.provisionSysData;
            scope.planTypeData=data.planTypeData;
            scope.currencydatas = data.currencydata.currencyOptions;
            
            var startDate =data.startDate; 
            var endDate =data.endDate;
            
            scope.date.startDate = dateFilter(new Date(startDate),'dd MMMM yyyy');
            if(endDate){
            	 scope.date.endDate = dateFilter(new Date(endDate),'dd MMMM yyyy');
            }
            scope.products = data.products;
            scope.selectedProducts = data.selectedProducts;
            scope.volumeTypes=data.volumeTypes;
            
            if(data.allowTopup == 'Y'){
            	scope.formData.allowTopup = true;
            	scope.formData.volume = data.volume;
            	scope.formData.units = data.units;
            }else{
            	scope.formData.allowTopup = false;
            }
            scope.formData.provisioingSystem = data.provisionSystem =="Provision"?true:false;
            scope.formData.isPrepaid = data.isPrepaid =='Y'?true:false;
            scope.formData.isHwReq = data.isHwReq =='Y'?true:false;
            
        });
        
        scope.getBothcurrency = function(code,name){
        	return code+"----"+name;
        };
        
    	
        scope.restrict = function(){
            for(var i in scope.allowed)
            {
                for(var j in scope.products){
                    if(scope.products[j].id == scope.allowed[i])
                    {
                        scope.selectedProducts.push(scope.products[j]);
                        scope.products.splice(j,1);
                    }
                }
            }
        };
        scope.allow = function(){
            for(var i in scope.restricted)
            {
                for(var j in scope.selectedProducts){
                    if(scope.selectedProducts[j].id == scope.restricted[i])
                    {
                        scope.products.push(scope.selectedProducts[j]);
                        scope.selectedProducts.splice(j,1);
                    }
                }
            }
        };
        
        scope.submit = function() {
          
          // reformatting selected products
             scope.formData.products = [];
             for(var i in scope.selectedProducts){
            	 scope.formData.products[i] = scope.selectedProducts[i].id;
             }
             if(scope.formData.provisioingSystem == true){
         		scope.formData.provisioingSystem = 'Provision';
         	 }else{ 
         		scope.formData.provisioingSystem = 'None';
         	 }
             if(scope.formData.isPrepaid){
             	scope.formData.units =0;
             	scope.formData.volume = "None";
             	}
             scope.formData.locale = scope.optlang.code;
             scope.formData.dateFormat = 'dd MMMM yyyy';
             scope.formData.volume='None';
         	scope.formData.units=0;
             scope.formData.startDate = dateFilter(scope.date.startDate,scope.formData.dateFormat);
             scope.formData.endDate = dateFilter(scope.date.endDate,scope.formData.dateFormat);
             resourceFactory.planResource.update({'planId':scope.planId},scope.formData,function(data){
            	 location.path('/viewplan/' + data.resourceId);
             });
        };
    }
  });
  mifosX.ng.application.controller('EditPlanController', [
   '$scope', 
   '$routeParams', 
   'ResourceFactory', 
   'dateFilter',
   '$location',
   '$rootScope', 
   mifosX.controllers.EditPlanController]).run(function($log) {
    $log.info("EditPlanController initialized");
  });
}(mifosX.controllers || {}));
