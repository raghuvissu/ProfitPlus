(function (module) {
    mifosX.controllers = _.extend(module, {
        ReportsController: function (scope, resourceFactory, location,$uibModal,PaginatorService) {
          

            scope.routeTo= function (id) {
                location.path('/system/viewreport/' + id);
            };

            /*if (!scope.searchCriteria.manrep) {
                scope.searchCriteria.manrep = null;
                scope.saveSC();
            }
            scope.filterText = scope.searchCriteria.manrep || '';

            scope.onFilter = function () {
                scope.searchCriteria.manrep = scope.filterText;
                scope.saveSC();
            }

            resourceFactory.reportsResource.getReport(function (data) {
                scope.reports = data;
            });*/
        	

           /* scope.reports = [];
            scope.PermissionService = PermissionService;
            
            scope.search123 = function(offset, limit, callback) {
                resourceFactory.reportsResource.getReport({offset: offset, limit: limit , sqlSearch: scope.filterText } , callback); 
               };
             
             scope.search = function(filterText) {
            	 scope.reports = PaginatorService.paginate(scope.search123, 14);
             };*/
             
            scope.fetchReports = function(offset, limit, callback) {
            	resourceFactory.reportsResource.getReport({offset: offset, limit: limit} , callback);
            };
            
            scope.deletereport = function (reportId){
            	scope.reportId=reportId;
                $uibModal.open({
                    templateUrl: 'deletenoncorereport.html',
                    controller: NoncoreReportDeleteCtrl
                });
            };
            
            var NoncoreReportDeleteCtrl = function ($scope, $uibModalInstance) {
                $scope.delete = function () {
                    resourceFactory.reportsResource.delete({id:scope.reportId} , {} , function(data) {
                        location.path('/reports');
                    });
                    $uibModalInstance.close('delete');
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
            
            scope.reports = PaginatorService.paginate(scope.fetchReports, 14);
            
           /* scope.routeToreport = function(id){
            	//alert(id);
            	location.path('/system/viewreport/'+ id);
              };*/
        
        }
    });
    mifosX.ng.application.controller('ReportsController', ['$scope', 'ResourceFactory', '$location','$uibModal','PaginatorService', mifosX.controllers.ReportsController]).run(function ($log) {
        $log.info("ReportsController initialized");
    });
}(mifosX.controllers || {}));