(function(module) {
  mifosX.controllers = _.extend(module, {
	  CurrencyConfigurationsController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService,PermissionService,$uibModal,route,$rootScope) {
		  
	       
	        
	        scope.currencyFetchFunction = function(offset, limit, callback) {
				resourceFactory.currencyConfigAllResource.get({offset: offset, limit: limit} , callback);
			};
			
			scope.currencies = paginatorService.paginate(scope.currencyFetchFunction, 14);
		  
		  
			scope.routeTocurrency = function(id){
	              location.path('/viewcurrency/'+ id);
	          };
			
			
		  /*scope.selectedCurrOptions = [];
	      scope.allCurrOptions = [];
	      scope.selected = undefined;
		  
		  scope.getCurrencyConfig=function(){
	         	
	        	 resourceFactory.currencyConfigResource.get(function(data){
	                 scope.selectedCurrOptions = data.selectedCurrencyOptions;
	                 scope.allCurrOptions = data.currencyOptions;
	             });
	          };	
	      	
	        
	        scope.submit = function () {
	            var currencies = [];
	            var curr = {};
	            for(var i=0; i < scope.selectedCurrOptions.length; i++){
	                currencies.push(scope.selectedCurrOptions[i].code);
	            }
	            curr['currencies'] = currencies;
	            resourceFactory.currencyConfigResource.upd(curr , function(){
	                route.reload();
	            });

	    };

	    scope.cancel = function() {
	      route.reload();
	    };
	        scope.deleteCur =  function (code){
	            for(var i=0; i<scope.selectedCurrOptions.length; i++){
	                if(scope.selectedCurrOptions[i].code === code){
	                  scope.selectedCurrOptions.splice(i, 1);  //removes 1 element at position i 
	                  break;
	                }
	            }
	      };
	      
	      scope.addCur = function (){
	          if(scope.selected != undefined && scope.selected.hasOwnProperty('code')) {
	            scope.selectedCurrOptions.push(scope.selected);
	              for(var i=0; i<scope.allCurrOptions.length; i++){
	                  if(scope.allCurrOptions[i].code === scope.selected.code){
	                    scope.allCurrOptions.splice(i, 1);  //removes 1 element at position i 
	                    break;
	                  }
	              }
	          }
	          scope.selected = undefined;
	        };*/
		  
		  
	  }
  });
  mifosX.ng.application.controller('CurrencyConfigurationsController', [
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
  mifosX.controllers.CurrencyConfigurationsController ]).run(function($log) {
     $log.info("CurrencyConfigurationsController initialized");
 });
}(mifosX.controllers || {}));