(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditSalesCatalogeController: function(scope, routeParams, resourceFactory,dateFilter, location,$rootScope) {	        
	        scope.salescatalogeId = routeParams.id;
	        scope.formData = {};
			 scope.planDatas = [];
			 scope.availablePlans = [];
		     scope.selectedPlans = [];
			 scope.allowed = [];
		     scope.restricted = [];
		     scope.formData.planDetails = [];
		     
		     resourceFactory.salescatalogeResource.get({salescatalogeId: scope.salescatalogeId, template: 'true'} , function(data) {
		      scope.salesCatalogeData = data.salesCatalogeData;
		            scope.formData = {
		            		            name :data.salesCatalogeData.name,
		            				  };
		          
		            scope.availablePlans = data.plans;
		            scope.selectedPlans = data.selectedPlans;
		            
		        });
		     
		     scope.restrict = function(){
		            for(var i in scope.allowed)
		            {
		                for(var j in scope.availablePlans){
		                    if(scope.availablePlans[j].id == scope.allowed[i])
		                    {
		                        scope.selectedPlans.push(scope.availablePlans[j]);
		                        scope.availablePlans.splice(j,1);
		                    }
		                }
		            }
		        };
		        scope.allow = function(){
		            for(var i in scope.restricted)
		            {
		                for(var j in scope.selectedPlans){
		                    if(scope.selectedPlans[j].id == scope.restricted[i])
		                    {
		                        scope.availablePlans.push(scope.selectedPlans[j]);
		                        scope.selectedPlans.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.submit = function() {
		            
		            // reformatting selected services
		        	scope.formData.planDetails = [];
		             for(var i in scope.selectedPlans){
		            	 scope.formData.planDetails[i] = scope.selectedPlans[i].id;
		             }
		             
		        	/*var temp = [];
		             for(var i in scope.selectedPlans){
		                 temp[i] = scope.selectedPlans[i].id;
		             }
		             scope.formData.planDetails = temp;*/
		             scope.formData.locale = scope.optlang.code;
		               resourceFactory.salescatalogeResource.update({'salescatalogeId':scope.salescatalogeId},scope.formData,function(data){
		              	 location.path('/viewsalescataloge/' + data.resourceId);
		               });
		          }
		        
    }
   });
   mifosX.ng.application.controller('EditSalesCatalogeController', [
      '$scope', 
      '$routeParams',
      'ResourceFactory', 
      'dateFilter',
      '$location',
      '$rootScope', 
   mifosX.controllers.EditSalesCatalogeController]).run(function($log) {
      $log.info("EditSalesCatalogeController initialized");
   });
}(mifosX.controllers || {}));