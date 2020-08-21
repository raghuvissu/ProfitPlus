(function(module) {
	 mifosX.controllers = _.extend(module, {
		 CreateSalesCatalogeController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
			 scope.formData = {};
			 scope.planDatas = [];
			 scope.availablePlans = [];
		     scope.selectedPlans = [];
			 scope.allowed = [];
		     scope.restricted = [];
		     scope.formData.planDetails = [];
			 
			 resourceFactory.salescatalogemappingTemplateResource.get(function(data) {
				  scope.availablePlans = data.planDatas;
				  scope.allowedPlans = data.planDatas;
			 });
			 
			 scope.restrict = function(){
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availablePlans){
		                    if(scope.availablePlans[j].id == this.allowed[i])
		                    {
		                        var temp = {};
		                        temp.id = this.allowed[i];
		                        temp.name = scope.availablePlans[j].planDescription;
		                        scope.selectedPlans.push(temp);
		                        scope.allowedPlans.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedPlans){
		                    if(scope.selectedPlans[j].id == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.id = this.restricted[i];
		                        temp.planDescription = scope.selectedPlans[j].name;
		                     //   temp.includeInBorrowerCycle = scope.restrictedProducts[j].includeInBorrowerCycle;
		                        scope.availablePlans.push(temp);
		                        scope.selectedPlans.splice(j,1);
		                    }
		                }
		            }
		        };
			 
			 scope.reset123=function(){
		    		location.path('/catalogemapping');
		        };
		        
		        scope.submit = function() {  
		        	scope.formData.planDetails = [];
		        	//console.log(scope.selectedPlans);
		        	scope.formData.locale = "en";
		             /*for(var i in scope.selectedPlans){
		                 scope.formData.planDetails.push(scope.selectedPlans[i]);
		             }
		        	//scope.formData.planDetails = scope.selectedPlans;
		            resourceFactory.salescatalogeResource.save(scope.formData,function(data){
		            	location.path('/salescataloges');
		            });*/
		        	var temp = [];
		             for(var i in scope.selectedPlans){
		                 temp[i] = scope.selectedPlans[i].id;
		             }
		             scope.formData.planDetails = temp;
		             resourceFactory.salescatalogeResource.save(this.formData,function(data){
		             		location.path('/catalogemapping');
		              });
		         
		        };
		 }
	});
	 mifosX.ng.application.controller('CreateSalesCatalogeController', [
  	     '$scope', 
  	     'ResourceFactory', 
  	     '$location',
  	     'dateFilter',
  	     '$rootScope', 
  	mifosX.controllers.CreateSalesCatalogeController]).run(function($log) {
    $log.info("CreateSalesCatalogeController initialized");
    });
}(mifosX.controllers || {}));