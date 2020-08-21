(function(module) {
	 mifosX.controllers = _.extend(module, {
		 CreatePlanController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
			
			 scope.billRuleDatas = [];
		     scope.availableServices = [];
		     scope.selectedServices = [];
		     scope.planStatus =[];
		     scope.provisionSysDatas = [];
		     scope.subscriptiondata = [];
		     scope.volumeTypes = [];
		     scope.allowed = [];
		     scope.restricted = [];
		     scope.nonselectedservice = [];
		     scope.services=[];
		     scope.allowed = [];
		     scope.date = {};
		     scope.start={};
		     scope.end={};
		     scope.restricted = [];
		     scope.products = [];
		     scope.restrictedProducts =[];
		     scope.start.date = new Date();
		     scope.minDate = new Date();
		     scope.minendDate = new Date();
		     scope.currencydatas = [];
		     resourceFactory.planTemplateResource.get(function(data) {
		    	 
		    	 scope.billRuleDatas = data.billRuleDatas;
		         scope.availableServices = data.products;
		         scope.planStatus = data.planStatus;
		         scope.provisionSysDatas = data.provisionSysData;
		         scope.subscriptiondata = data.subscriptiondata;
		         scope.volumeTypes = data.volumeTypes;
		         scope.productmix = data;
		         scope.allowedProducts = data.products;
		         scope.planTypeData = data.planTypeData;
		         scope.currencydatas = data.currencydata.currencyOptions;
		         
		         scope.formData = {
		                 isPrepaid:false,
		                 status :scope.planStatus[0].id,
		                 provisioingSystem:true
		             };
		     	});
		     scope.$watch('start.date', function() {
		    	    scope.doSomething();  
		    	});
		     
		     scope.doSomething =function(){
		    	   scope.minendDate=scope.start.date;
		    	   if(scope.end.date){
		    		   if(new Date(scope.start.date) > new Date(scope.end.date))
		    			   scope.end.date = scope.start.date;
		    	   }
		       };
		       
		       scope.restrict = function(){
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availableServices){
		                    if(scope.availableServices[j].id == this.allowed[i])
		                    {
		                        var temp = {};
		                        temp.id = this.allowed[i];
		                        temp.name = scope.availableServices[j].productDescription;
		                        scope.selectedServices.push(temp);
		                        scope.allowedProducts.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedServices){
		                    if(scope.selectedServices[j].id == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.id = this.restricted[i];
		                        temp.productDescription = scope.selectedServices[j].name;
		                     //   temp.includeInBorrowerCycle = scope.restrictedProducts[j].includeInBorrowerCycle;
		                        scope.availableServices.push(temp);
		                        scope.selectedServices.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.getBothcurrency = function(code,name){
		        	return code+"----"+name;
		        };
		        
		        
		        scope.submit = function() {
		        	scope.formData.locale = scope.optlang.code;
		        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		        	var reqEndDate = dateFilter(scope.end.date,'dd MMMM yyyy');
		        	if(scope.formData.provisioingSystem == true){
		        		scope.formData.provisioingSystem = 'Provision';
		        	}else{ 
		        		scope.formData.provisioingSystem = 'None';
		        	}
		        	scope.formData.dateFormat = 'dd MMMM yyyy';
		        	scope.formData.startDate = reqDate;
		        	scope.formData.endDate = reqEndDate;
		        	if(scope.formData.isPrepaid){
		        	scope.formData.units =0;
		        	scope.formData.volume = "None";
		        	}
		        	 var temp = [];
		             for(var i in scope.selectedServices){
		                 temp[i] = scope.selectedServices[i].id;
		             }
		             scope.formData.products = temp;
		             resourceFactory.planResource.save(this.formData,function(data){
		             		location.path('/plans');
		              });
		             
		        };
		   }
	 });
	 
mifosX.ng.application.controller('CreatePlanController', [
	     '$scope', 
	     'ResourceFactory', 
	     '$location',
	     'dateFilter',
	     '$rootScope', 
mifosX.controllers.CreatePlanController]).run(function($log) {
$log.info("CreatePlanController initialized");
});
}(mifosX.controllers || {}));