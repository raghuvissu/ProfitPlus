(function(module) {
  mifosX.controllers = _.extend(module, {
    UserListController: function(scope,route,resourceFactory,location,$uibModal,PermissionService) {
        scope.users = [];
        scope.PermissionService=PermissionService;
        	resourceFactory.userListResource.getAllUsers(function(data) {
        		scope.users = data;
        	});
        	
        	 scope.open = function (userId) {
        		 scope.userId=userId;
                 $uibModal.open({
                     templateUrl: 'password.html',
                     controller: ModalInstanceCtrl
                 });
             };
             scope.deleteuser = function (userId){
            	 scope.userId=userId;
                 $uibModal.open({
                     templateUrl: 'deleteuser.html',
                     controller: UserDeleteCtrl
                 });
             };
             
             var ModalInstanceCtrl = function ($scope, $uibModalInstance) {
                 $scope.save = function (staffId) {
                     resourceFactory.userListResource.update({'userId': scope.userId},this.formData,function(data){
                         route.reload();
                     });
                     $uibModalInstance.close('activate');
                 };
                 $scope.cancel = function () {
                     $uibModalInstance.dismiss('cancel');
                 };
             };

             var UserDeleteCtrl = function ($scope, $uibModalInstance) {
                 $scope.delete = function () {
                     resourceFactory.userListResource.delete({userId:scope.userId} , {} , function(data) {
                         location.path('/users');
                         // added dummy request param because Content-Type header gets removed
                         // if the request does not contain any data (a request body)
                     });
                     $uibModalInstance.close('delete');
                 };
                 $scope.cancel = function () {
                     $uibModalInstance.dismiss('cancel');
                 };
             };
    
        scope.routeTo = function(id){
        	location.path('/viewuser/'+ id);
          };
        
    }
  
  });
  mifosX.ng.application.controller('UserListController', ['$scope', '$route','ResourceFactory','$location','$uibModal','PermissionService', mifosX.controllers.UserListController]).run(function($log) {
    $log.info("UserListController initialized");
  });
}(mifosX.controllers || {}));
