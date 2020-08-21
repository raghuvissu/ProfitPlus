(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateUserCatalogeController: function(scope, resourceFactory, location,webStorage) {
			
			 /*scope.formdata={};
		     scope.appUserDatas = {};
		     scope.salesCatalogeDatas = {};
			
		     resourceFactory.usercatalogeTemplateResource.gettemplate(function(data) {
				  scope.appUserDatas = data.appUserDatas;
				  scope.salesCatalogeDatas = data.salesCatalogeDatas;
			});
		     
	        scope.reset123 = function(){
	            location.path('/catalogemapping');
	            webStorage.add("callingTab", {someString: "usercataloge" });
	  	    }; 
		     
            scope.submit = function(){
	     		resourceFactory.usercatalogeResource.save(scope.formData,function(data){
	     			location.path('/catalogemapping');
	     			webStorage.add("callingTab", {someString: "usercataloge" });
	     		});	
	       };*/
			 scope.formData = {};
			 scope.appUserDatas = {};
			 scope.availableCatalog = [];
			 scope.availableSalesCataloges = [];
		     scope.selectedSalesCataloges = [];
			 scope.allowed = [];
		     scope.restricted = [];
		     scope.formData.salesCatalogeDetails = [];
		     
		     resourceFactory.usercatalogeTemplateResource.get(function(data) {
		    	 scope.appUserDatas = data.appUserDatas;
		    	 scope.availableSalesCataloges = data.availableCatalog;
				  scope.allowedsalesCataloges = data.availableCatalog;
		     });
			
		     scope.restrict = function(){
		            for(var i in this.allowed)
		            {
		                for(var j in scope.availableSalesCataloges){
		                    if(scope.availableSalesCataloges[j].id == this.allowed[i])
		                    {
		                        var temp = {};
		                        temp.id = this.allowed[i];
		                        temp.name = scope.availableSalesCataloges[j].name;
		                        scope.selectedSalesCataloges.push(temp);
		                        scope.allowedsalesCataloges.splice(j,1);
		                    }
		                }
		            }
		        };
		     
		        scope.allow = function(){
		            for(var i in this.restricted)
		            {
		                for(var j in scope.selectedSalesCataloges){
		                    if(scope.selectedSalesCataloges[j].id == this.restricted[i])
		                    {
		                        var temp = {};
		                        temp.id = this.restricted[i];
		                        temp.name = scope.selectedSalesCataloges[j].name;
		                        scope.availableSalesCataloges.push(temp);
		                        scope.selectedSalesCataloges.splice(j,1);
		                    }
		                }
		            }
		        };
		        
		        scope.reset123 = function(){
		            location.path('/catalogemapping');
		  	    };
		  	    
		  	  scope.submit = function() {  
		        	scope.formData.salesCatalogeDetails = [];
		        	scope.formData.locale = "en";
		        	var temp = [];
		             for(var i in scope.selectedSalesCataloges){
		                 temp[i] = scope.selectedSalesCataloges[i].id;
		             }
		             scope.formData.salesCatalogeDetails = temp;
		             resourceFactory.usercatalogeResource.save(this.formData,function(data){
		             		location.path('/catalogemapping');
		              });
		         
		        };
		        
			
		  	 
		}
	});
	mifosX.ng.application.controller('CreateUserCatalogeController', [
           	 '$scope', 
           	 'ResourceFactory', 
           	 '$location',
           	 'webStorage',
   mifosX.controllers.CreateUserCatalogeController]).run(function($log) {
     $log.info("CreateUserCatalogeController initialized");
   });
}(mifosX.controllers || {}));