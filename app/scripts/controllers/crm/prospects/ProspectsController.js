(function(module) {
	mifosX.controllers = _.extend(module, {
		ProspectsController : function(scope, resourceFactory, route, paginatorService, location, PermissionService, webStorage,$rootScope) {
			
			scope.prospects = [];
			scope.clientconfig = false;
		    scope.clientconfigfalse = false;
		    
		    scope.PermissionService = PermissionService;
			scope.routeTo = function(id) {
				location.path('/viewprospects/' + parseInt(id));
			};
			
			scope.prospectFetchFunction = function(offset, limit, callback) {
				resourceFactory.getAllProspectResource.getAllDetails({ offset : offset, limit : limit }, callback);
			};
			 /*scope.prospects = paginatorService.paginate( scope.prospectFetchFunction, 14 );*/
			
			if($rootScope.hasPermission('LIST_PROSPECT')){
			 scope.prospects = paginatorService.paginate( scope.prospectFetchFunction, 14 );
			};
			
			scope.search123 = function( offset, limit, callback ) {
				resourceFactory.getAllProspectResource.getAllDetails({ offset : offset, limit : limit,
					sqlSearch : scope.filterText }, callback);
			};
			
			scope.search = function(filterText) {
				scope.prospects = paginatorService.paginate(scope.search123, 14);
				scope.filterText = "";
			};
			
			scope.getVal = function(flag) {
				if (flag === "Closed" || flag === "Canceled") {
					return false;
				} else {
					return true;
				}
			};
			
			scope.convertProspect = function(prospectId) {
				resourceFactory.prospectConvertResource.save({ deleteProspectId : prospectId }, {}, function(data) {
					location.path('/viewclient/' + data.resourceId);
					/*if (PermissionService.showMenu('READ_CLIENT'))
						location.path('/viewclient/' + data.resourceId);
					else
						route.reload();*/
				});
			};
		   
		}
	});
	mifosX.ng.application.controller('ProspectsController', [ 
	  '$scope', 
	  'ResourceFactory', 
	  '$route',
	  'PaginatorService', 
	  '$location',				
	  'PermissionService', 
	  'webStorage',		
	  '$rootScope',
   mifosX.controllers.ProspectsController]).run(function($log) {			
	  $log.info("ProspectsController initialized");		
   });
}(mifosX.controllers || {}));