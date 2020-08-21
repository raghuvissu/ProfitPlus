(function(module) {
    mifosX.controllers = _.extend(module, {
        AddCodeController: function(scope, resourceFactory, location,PermissionService) {
        	scope.formData={};
        	scope.modules = ["Client","Ticketing","Master","Order","Scheduler"];
            scope.submit = function() {
                resourceFactory.codeResources.save(this.formData,function(data){
                	if(PermissionService.showMenu('READ_CODE')&&PermissionService.showMenu('READ_CODEVALUE'))
                		location.path('/viewcode/'+data.resourceId);
                	else
                		location.path('/codes');
                });
            };
        }
    });
    mifosX.ng.application.controller('AddCodeController', ['$scope', 'ResourceFactory', '$location','PermissionService', mifosX.controllers.AddCodeController]).run(function($log) {
        $log.info("AddCodeController initialized");
    });
}(mifosX.controllers || {}));

