(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewSchedulerJobController: function(scope, routeParams , resourceFactory,PermissionService) {
    	
      scope.PermissionService = PermissionService;
      resourceFactory.jobsResource.getJobDetails({jobId : routeParams.id}, function(data) {
        scope.job = data;
      });
    }
  });
  mifosX.ng.application.controller('ViewSchedulerJobController', ['$scope', '$routeParams','ResourceFactory','PermissionService', mifosX.controllers.ViewSchedulerJobController]).run(function($log) {
    $log.info("ViewSchedulerJobController initialized");
  });
}(mifosX.controllers || {}));
