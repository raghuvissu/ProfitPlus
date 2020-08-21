(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewSchedulerJobHistoryController: function(scope, resourceFactory , paginatorService, routeParams,$rootScope,API_VERSION) {
        scope.jobhistory = [];
        var fetchFunction = function(offset, limit, callback) {
          resourceFactory.jobsResource.getJobHistory({jobId : routeParams.id, resourceType : 'runhistory', offset: offset, limit: limit} , callback);
        };
        scope.logFile = function (id){ 
	         window.open($rootScope.hostUrl+ API_VERSION +'/jobs/printlog/'+id+'?tenantIdentifier=default');
	    };
        scope.jobhistory = paginatorService.paginate(fetchFunction, 14);
    }
  });
  mifosX.ng.application.controller('ViewSchedulerJobHistoryController', ['$scope', 'ResourceFactory', 'PaginatorService', '$routeParams','$rootScope','API_VERSION', mifosX.controllers.ViewSchedulerJobHistoryController]).run(function($log) {
    $log.info("ViewSchedulerJobHistoryController initialized");
  });
}(mifosX.controllers || {}));

