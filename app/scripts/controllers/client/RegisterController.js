(function(module) {
  mifosX.controllers = _.extend(module, {
	  RegisterController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,
			                         route,$uibModal,$rootScope, $filter, $upload, API_VERSION, $timeout) {

      scope.formData = {
                          "entryType":"IND",
                          "clientCategory":20,
                          "locale":"en",
                          "active":true,
                          "dateFormat":"dd MMMM yyyy",
                          "activationDate":dateFilter(new Date(),'dd MMMM yyyy'),
                          "flag":false
      };

      scope.cafIdChange = function(cafId){
          delete scope.displayName;
          resourceFactory.getClientwithCafIdResource.get({cafId : cafId}, function(data) {
                var clientData = data.clientData;
                scope.displayName = clientData.displayName;
                scope.formData.officeId = clientData.officeId;
                scope.formData.addressNo = clientData.addressNo;
                scope.formData.city = clientData.city;
                scope.formData.state = clientData.state;
                scope.formData.country = clientData.country;
                if(clientData.zip) scope.formData.zipCode = clientData.zip;
         });
      }

      function registerSuccessFun(){
        $rootScope.registerSuccess = true;
        $rootScope.isRegister = false;
        $timeout(function(){
          $rootScope.registerSuccess = false;
        }, 5000);
      }
		  
        
      scope.submitRegister = function() {
        	scope.flag = true;
          if(scope.clientId){
            if (scope.clientImage) {
                $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+scope.clientId+'/images', 
                  data: {},
                  file: scope.clientImage
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  scope.flag = false;
                  registerSuccessFun();
                  //location.path('/clients');
                });
              } else{
                 scope.flag = false;
                 registerSuccessFun();
                  //location.path('/clients');
              }

          } else {
              resourceFactory.clientResource.create(scope.formData,function(data){
                        scope.clientId = data.clientId;
                        if (scope.clientImage) {
                          $upload.upload({
                            url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                            data: {},
                            file: scope.clientImage
                          }).then(function(imageData) {
                            // to fix IE not refreshing the model
                            if (!scope.$$phase) {
                              scope.$apply();
                            }
                            scope.flag = false;
                            registerSuccessFun();
                            //location.path('/clients');
                          });
                        } else{
                           scope.flag = false;
                           registerSuccessFun();
                            //location.path('/clients');
                        }
                      },function(errData){
                        scope.flag = false;
              });
          }
       };
     }
  });
  mifosX.ng.application.controller('RegisterController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', 
                                                            '$location','dateFilter','$route',
                                                            '$uibModal','$rootScope','$filter', 'Upload', 
                                                            'API_VERSION', '$timeout', mifosX.controllers.RegisterController]).run(function($log) {
    $log.info("RegisterController initialized");
  });
}(mifosX.controllers || {}));
