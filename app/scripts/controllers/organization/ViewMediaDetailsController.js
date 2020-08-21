(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMediaDetailsController: function(scope, routeParams , location,resourceFactory,PermissionService,$uibModal ) {
        scope.media = [];
        scope.mediaDetails = [];
        scope.PermissionService = PermissionService;
        resourceFactory.saveMediaResource.get({mediaId: routeParams.id} , function(data) {
            scope.media = data.mediaAssetData;
            scope.mediaDetails=data.mediaassetAttributes;
            scope.mediaLocationDatas=data.mediaLocationData;
            scope.mediaAttributes=data.mediaAttributes;
            scope.mediaLanguageDatas=data.mediaLanguageData;
            scope.mediaTypeDatas=data.mediaTypeData;
            scope.mediaCategeorydatas=data.mediaCategeorydata;
            for(var i=0;i<scope.mediaCategeorydatas.length;i++){
            	if(scope.media.catageoryId==scope.mediaCategeorydatas[i].id){
            		scope.catageoryId=scope.mediaCategeorydatas[i].mCodeValue;
            		
            	}
            }
            scope.mediaContententProviderDatas=data.contentProviderData;
            for(var j=0;j<scope.mediaContententProviderDatas.length;j++){
            	
            	if(scope.mediaContententProviderDatas[j].id==scope.media.contentProvider){
            		scope.contentProviderValue=scope.mediaContententProviderDatas[j].mCodeValue;
            	}
            }
           
        });

        scope.deletemedia = function (){
        	
        	$uibModal.open({
				 templateUrl: 'deletemedia.html',
				 controller: deleteMediaController,
				 resolve:{}
			 });
          };
          
          function deleteMediaController($scope, $uibModalInstance) {
        	  	
        	  $scope.approveDeleteMedia = function () {
        		  
        		  resourceFactory.saveMediaResource.remove({mediaId: routeParams.id} , {} , function() {
        			  $uibModalInstance.close('delete');
                      location.path('/mediadetails');
                });
              };
              $scope.cancel = function () {
            	  $uibModalInstance.dismiss('cancel');
              };
          };
    
    }
  });
  mifosX.ng.application.controller('ViewMediaDetailsController', [
  	      '$scope',
  	      '$routeParams',
  	      '$location',
  	      'ResourceFactory',
  	      'PermissionService', 
  	      '$uibModal', 
  	      mifosX.controllers.ViewMediaDetailsController]).run(function($log) {
    $log.info("ViewMediaDetailsController initialized");
  });
}(mifosX.controllers || {}));
