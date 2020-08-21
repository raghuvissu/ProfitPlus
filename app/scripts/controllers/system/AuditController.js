(function(module) {
    mifosX.controllers = _.extend(module, {
        AuditController: function(scope, resourceFactory,dateFilter,location) {
            scope.formData = [];
            scope.isCollapsed = true;
           
            scope.routeTo = function(id){
                location.path('/viewaudit/'+ id);
              };
            scope.date = {};
            resourceFactory.auditResource.get({templateResource: 'searchtemplate'} , function(data) {
                scope.template = data;
            });
            scope.search = function(){
                scope.isCollapsed = true;
                scope.displayResults = true;
                var reqFirstDate = dateFilter(scope.date.first,'yyyy-MM-dd');
                var reqSecondDate = dateFilter(scope.date.second,'yyyy-MM-dd');
                var reqThirdDate = dateFilter(scope.date.third,'yyyy-MM-dd');
                var reqFourthDate = dateFilter(scope.date.fourth,'yyyy-MM-dd');
                var params = {};
                if (scope.formData.action) { params.actionName = scope.formData.action; };

                if (scope.formData.entity) { params.entityName = scope.formData.entity; };

                if (scope.formData.resourceId) { params.resourceId = scope.formData.resourceId; };

                if (scope.formData.user) { params.makerId = scope.formData.user; };

                if (scope.date.first) { params.makerDateTimeFrom = reqFirstDate; };

                if (scope.date.second) { params.makerDateTimeTo = reqSecondDate; };

                if (scope.formData.checkedBy) { params.checkerId = scope.formData.checkedBy; };

                if (scope.date.third) { params.checkerDateTimeFrom = reqThirdDate; };

                if (scope.date.fourth) { params.checkerDateTimeTo = reqFourthDate; };
                resourceFactory.auditResource.search(params , function(data) {
                    scope.searchData = data;
                });

            };
            scope.search();
        }
    });
    mifosX.ng.application.controller('AuditController', [
       '$scope',
       'ResourceFactory',
       'dateFilter',
       '$location', 
       mifosX.controllers.AuditController
       ]).run(function($log) {
    	   $log.info("AuditController initialized");
    });
}(mifosX.controllers || {}));