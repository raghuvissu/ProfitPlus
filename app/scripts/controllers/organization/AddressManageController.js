(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddressManageController: function(scope, resourceFactory,location,paginatorService,$uibModal,routeParams,route,PermissionService) {

      scope.addressManages = [];
      scope.PermissionService = PermissionService;
        
      scope.addressManagesFetchFunction = function(offset, limit, callback) {
          resourceFactory.addressResource.getAllAddresses({offset: offset, limit: limit} , callback);
      };      
      scope.addressManages = paginatorService.paginate(scope.addressManagesFetchFunction, 14);
      
    	  scope.addCountry = function(){
          	
          	  $uibModal.open({
                    templateUrl : 'addCountry.html',
                    controller : addCountryController,
                    resolve : {}
                });
            };
            var addCountryController = function ($scope, $uibModalInstance) {
        	  	$scope.formData = {};
        	  $scope.submit = function () {
        		  resourceFactory.addCountryResource.get($scope.formData,function(data){
        			  $uibModalInstance.close('delete');
        			  location.path('/addresstreeview');
		          });
              };
              $scope.cancel = function () {
            	  console.log('hi1');
                  $uibModalInstance.dismiss('cancel');
              };
          };
          
     }
  });
  mifosX.ng.application.controller('AddressManageController', ['$scope', 'ResourceFactory','$location','PaginatorService','$uibModal','$routeParams','$route','PermissionService', mifosX.controllers.AddressManageController]).run(function($log) {
    $log.info("AddressManageController initialized");
  });
}(mifosX.controllers || {}));
