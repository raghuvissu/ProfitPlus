(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory,PermissionService,rootScope,API_VERSION,route,paginatorService,location,$http) {
        scope.voucherpins = [];
        scope.PermissionService = PermissionService;
        scope.voucherpin = {};
        
        resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        });
        
         scope.downloadFile = function (id){
        	window.open(rootScope.hostUrl+ API_VERSION +'/vouchers/'+id+'?tenantIdentifier=default');
        };
        
        scope.processFile = function(id){
         if(!rootScope.voucherPinProcess){
        	rootScope.dynamicVar = id;
        	rootScope.voucherPinProcess = true;
        	resourceFactory.voucherpinResource.save({voucherId:id},function(data) {
        		rootScope.dynamicVar = 0;
        		rootScope.voucherPinProcess = false;
        		route.reload();
            },function(errorData){
            	rootScope.dynamicVar = 0;
            	rootScope.voucherPinProcess = false;
            });
         };
        };
        
        scope.routeTo = function(voucherId){
        	location.path("/viewvouchers/"+voucherId);
        }
    }
  
  });
  mifosX.ng.application.controller('VoucherpinController', [
                                                            '$scope', 
                                                            'ResourceFactory',
                                                            'PermissionService',
                                                            '$rootScope',
                                                            'API_VERSION',
                                                            '$route',
                                                            'PaginatorService',
                                                            '$location',
                                                            '$http',
                                                            mifosX.controllers.VoucherpinController]).run(function($log) {
	  
    $log.info("VoucherpinController initialized");
  });
}(mifosX.controllers || {}));
