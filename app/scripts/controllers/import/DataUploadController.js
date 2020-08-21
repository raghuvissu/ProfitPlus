(function(module) {
  mifosX.controllers = _.extend(module, {
	  DataUploadController: function(scope, resourceFactory,paginatorService,route,API_VERSION,$rootScope,PermissionService,TENANT) {
        scope.imports = [];
        scope.PermissionService = PermissionService;
        
        scope.importFetchFunction = function(offset, limit, callback) {
			resourceFactory.importResource.getdata({offset: offset, limit: limit} , callback);
		};
		//if(PermissionService.showMenu('READ_UPLOADSTATUS'))
		scope.imports = paginatorService.paginate(scope.importFetchFunction, 14);
        
       // getAllFiles();
       
        
        scope.getProcessStatus = function(impprocess){
        	if(impprocess == 'NEW')
        		return true;
        	else
        		return false;
        };
        scope.getLogStatus = function(impprocess){
        	if(impprocess != 'NEW' && impprocess != 'Running...')
        		return true;
        	else
        		return false;
        };
        
        scope.processFile = function (id){    	                   
                resourceFactory.importProcessResource.update({uploadfileId: id} , {} , function(data) {
              	  route.reload();
                },function(errorData){
                	route.reload();
                });
                route.reload();     
        }; 
        
        
        scope.downloadFile = function (id){ 
            	 window.open($rootScope.hostUrl+ API_VERSION +'/datauploads/print/'+id+'?tenantIdentifier='+TENANT);
        };
             
        scope.logFile = function (id){ 
        		window.open($rootScope.hostUrl+ API_VERSION +'/datauploads/printlog/'+id+'?tenantIdentifier='+TENANT);
        };
    }
  });
  mifosX.ng.application.controller('DataUploadController', ['$scope', 'ResourceFactory','PaginatorService','$route','API_VERSION','$rootScope','PermissionService','TENANT', mifosX.controllers.DataUploadController]).run(function($log) {
    $log.info("DataUploadController initialized");
  });
}(mifosX.controllers || {}));
