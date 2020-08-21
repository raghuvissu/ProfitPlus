(function(module) {
	mifosX.controllers = _.extend(module, {
		EditUserCatalogeController: function(scope, routeParams, resourceFactory, location,webStorage) {
			
			/*scope.formData = {};
	        scope.usercatalogeId=routeParams.id;
	        
	        resourceFactory.usercatalogeResource.get({usercatalogeId: routeParams.id, template: 'true'} , function(data) {
	    		  scope.appUserDatas = data.appUserDatas;
	    		  scope.salesCatalogeDatas = data.salesCatalogeDatas;
	    		  
	    		  scope.formData = {
	    				   userId:data.userId,
	            		   catalogeId:data.catalogeId,
	              };
	        });
	        
	        scope.submit = function() {
	              resourceFactory.usercatalogeResource.update({usercatalogeId: routeParams.id},scope.formData,function(data){
	              location.path('/viewusercataloge/' + data.resourceId);
	             });
	        };*/ 
			
			scope.usercatalogeId = routeParams.id;
	        scope.formData = {};
			 scope.appUserDatas = [];
			 scope.salesCatalogeDatas= [];
			 scope.availableSalesCataloges = [];
		     scope.selectedSalesCataloges = [];
			 scope.allowed = [];
		     scope.restricted = [];
		     scope.formData.salesCatalogeDetails = [];
		     
		     resourceFactory.usercatalogeResource.get({usercatalogeId: routeParams.id, template: 'true'} , function(data) {
	    		  scope.appUserDatas = data.appUserDatas;
	    		  scope.salesCatalogeDatas = data.salesCatalogeDatas;
	    		  
	    		  scope.formData = {
	    				   userId:data.userId,
	            		   catalogeId:data.catalogeId,
	              };
	    		    scope.availableSalesCataloges = data.availableCatalog;
		            scope.selectedSalesCataloges = data.selectedCatalog;
	        });
		     
		     scope.restrict = function(){
		            for(var i in scope.allowed)
		            {
		                for(var j in scope.availableSalesCataloges){
		                    if(scope.availableSalesCataloges[j].id == scope.allowed[i])
		                    {
		                        scope.selectedSalesCataloges.push(scope.availableSalesCataloges[j]);
		                        scope.availableSalesCataloges.splice(j,1);
		                    }
		                }
		            }
		        };
		        scope.allow = function(){
		            for(var i in scope.restricted)
		            {
		                for(var j in scope.selectedSalesCataloges){
		                    if(scope.selectedSalesCataloges[j].id == scope.restricted[i])
		                    {
		                        scope.availableSalesCataloges.push(scope.selectedSalesCataloges[j]);
		                        scope.selectedSalesCataloges.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.submit = function() {
		            
		        	scope.formData.salesCatalogeDetails = [];
		             for(var i in scope.selectedSalesCataloges){
		            	 scope.formData.salesCatalogeDetails[i] = scope.selectedSalesCataloges[i].id;
		             }		             
		             scope.formData.locale = scope.optlang.code;
		               resourceFactory.usercatalogeResource.update({'usercatalogeId':scope.usercatalogeId},scope.formData,function(data){
		              	 location.path('/viewusercataloge/' + data.resourceId);
		               });
		          }
			
			
		
		}
	});
	mifosX.ng.application.controller('EditUserCatalogeController', [
     	 '$scope', 
     	 '$routeParams', 
     	 'ResourceFactory', 
     	 '$location', 
     	 'webStorage',
    mifosX.controllers.EditUserCatalogeController]).run(function($log) {
     	$log.info("EditUserCatalogeController initialized");
    });
}(mifosX.controllers || {}));