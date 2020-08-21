(function(module) {
  mifosX.controllers = _.extend(module, {
	  UploadAndProcessMrnDetailsController: function(scope, resourceFactory,http,location,API_VERSION,$rootScope,Upload) {
		      
		    scope.subscriptions = [];
	        scope.formData={};
	        scope.formData.status="Move itemsale";
	        
	        scope.onFileSelect = function ($files) {
	        	scope.file = $files[0];
	        };
            scope.downloadFile = function (value){
            	if(value == "MediaAssets"){
            		window.open("Xls/"+value+".xlsx");
	            }else
	             {	 
	               window.open("csv/"+value+".csv");
	             }
           };
           
           scope.submit = function () {
         	  Upload.upload({/*41.75.85.206:8080*/
         		  url: $rootScope.hostUrl+ API_VERSION +'/datauploads/documents?isProcess=true', 
         		  data: scope.formData,
         		  file: scope.file
               }).then(function(data) {
                 // to fix IE not refreshing the model
                 if (!scope.$$phase) {
                   scope.$apply();
                 }
               });
         	  location.path('/inventory');
            };
	  
	   }
  });
  mifosX.ng.application.controller('UploadAndProcessMrnDetailsController', [
      '$scope',
      'ResourceFactory', 
      '$http', 
      '$location',
      'API_VERSION',
      '$rootScope',
      'Upload', 
   mifosX.controllers.UploadAndProcessMrnDetailsController]).run(function($log) {
	  $log.info("UploadAndProcessMrnDetailsController initialized");
  });
}(mifosX.controllers || {}));