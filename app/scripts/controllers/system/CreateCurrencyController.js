(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateCurrencyController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService,PermissionService,$uibModal,route,$rootScope) {
		  
		  	scope.selectedCurrOptions = [];
	        scope.allCurrOptions = [];
	        scope.hideview = false;
	        scope.selected = undefined;
	        scope.PermissionService = PermissionService;
	        scope.formData = {};
	        scope.formData.type = "Currency";

	        /*resourceFactory.currencyConfigResource.get(function(data){
	            scope.selectedCurrOptions = data.selectedCurrencyOptions;
	            scope.allCurrOptions = data.currencyOptions;

	        });*/
	        
	        
	        scope.currencyValue = function(item,model,label){
	        	if(item || model || label){
	        		var codeData = item || model || label;
	        		for(var i in scope.allCurrOptions){
	        			if(codeData.code == scope.allCurrOptions[i].code){
	        				scope.formData.name = scope.allCurrOptions[i].name;
	        				scope.formData.decimalplaces = scope.allCurrOptions[i].decimalPlaces;
	        			};
	        		}
	        	}
	        }
	        
	        /*scope.deleteCur =  function (code){
	              for(var i = 0; i < scope.selectedCurrOptions.length; i++){
	                  if(scope.selectedCurrOptions[i].code == code){
	                    scope.selectedCurrOptions.splice(i, 1);  //removes 1 element at position i 
	                    break;
	                  }
	              }
	        };*/

	        /*scope.addCur = function (){
	          if(scope.selected != undefined && scope.selected.hasOwnProperty('code')) {
	            scope.selectedCurrOptions.push(scope.selected);
	              for(var i = 0; i < scope.allCurrOptions.length; i++){
	                  if(scope.allCurrOptions[i].code == scope.selected.code){
	                    scope.allCurrOptions.splice(i, 1);  //removes 1 element at position i 
	                    break;
	                  }
	              }
	          }
	          scope.selected = undefined;
	        };*/

	        scope.submit = function () {
	                /*var currencies = [];
	                var curr = {};
	                for(var i = 0; i < scope.selectedCurrOptions.length; i++){
	                    currencies.push(scope.selectedCurrOptions[i].code);
	                }
	                curr["currencies"] = currencies;*/
	        		scope.formData.locale =scope.optlang.code;
	        		if(type == 'Non-Currency'){
	        			var n;
	        			scope.formData.currencyId = (1000+n);
	        		}
	        		resourceFactory.currencyConfigResource.save(this.formData,function(data){
	        			location.path('/currencyconfig/');
	        		});
	                /*resourceFactory.currencyConfigResource.upd(curr , function(data){
	                	  location.path('/mappingconfig/');
	                });*/

	        };

	        scope.cancel = function() {
	        	 location.path('/currencyconfig/');
	        };
	        
	  }
  });
  mifosX.ng.application.controller('CreateCurrencyController', [
         '$scope',
         'webStorage', 
         '$routeParams', 
         '$location', 
         'ResourceFactory',
         'PaginatorService',
         'PermissionService', 
         '$uibModal',
         '$route',
         '$rootScope',
  mifosX.controllers.CreateCurrencyController ]).run(function($log) {
     $log.info("CreateCurrencyController initialized");
 });
}(mifosX.controllers || {}));