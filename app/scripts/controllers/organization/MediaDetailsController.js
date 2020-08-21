(function(module) {
  mifosX.controllers = _.extend(module, {
	  MediaDetailsController: function(scope, resourceFactory,location,PermissionService,$uibModal,route) {
        scope.mediaDetailsData = [];
        scope.fromMedia="MEDIA";
        scope.PermissionService = PermissionService;
        
        resourceFactory.mediaDetailsResource.query(function(data) {
            scope.mediaDetailsData= data;
        });
        
        scope.routeTo = function(mediaid){
            location.path('/viewmedia/'+ mediaid);
        };
          
        /**
  		 * popup for media Locations
  		 * */
          
  		   scope.createMediaLocations = function(mediaId){
  				scope.errorStatus=[];
  				scope.errorDetails=[];
  				scope.mediaId=mediaId;
  				$uibModal.open({
  				  templateUrl: 'createmedialocation.html',
  				  controller:createMediaLocationsController ,
  				  resolve:{}
  				});
  			};
  				         
  		  function createMediaLocationsController($scope,$uibModalInstance){
  				$scope.formData = {}; 
  				$scope.mediaLanguageDatas=[];
  				$scope.mediaFormats=[];
  				$scope.formData.mediaAssetLocations=[];
  				
  				/**
  				 * retrieving data
  				 * */
  				resourceFactory.mediaTemplateResource.get(function(data) {
  	                $scope.mediaLanguageDatas = data.mediaLanguageData;
  	                $scope.mediaFormats=data.mediaFormat;
  	            });
  				/**
  				 * adding locations
  				 * */
  				$scope.addMediaLocation = function () {
  		           if ($scope.formData.languageId && $scope.formData.location && $scope.formData.formatType) {
  		        	   
  		                $scope.formData.mediaAssetLocations.push({
  		                								  languageId	: $scope.formData.languageId, 
  		                								  location		: $scope.formData.location, 
  		                								  formatType 	: $scope.formData.formatType
  		                								});
  		              
  		                delete $scope.formData.languageId;
  		                delete $scope.formData.location;
  		                delete $scope.formData.formatType;
  		                
  		          	}
  		        };
  		        /**
  				 * removing locations
  				 * */
  		        $scope.removeMediaLocation = function (index) {
  		        	$scope.formData.mediaAssetLocations.splice(index,1);
                };
                /**
                 * Submit
                 * */
  				$scope.accept = function(){
  				  $scope.formData.mediaDetailType="LOCATIONS";
  				  
  				  $scope.disabledMediaLocationSaveBtn=true;
  				  resourceFactory.mediaLocationAttributesResource.save({'mediaId': scope.mediaId},$scope.formData,function(){ 
  					$uibModalInstance.close('delete');
  				      route.reload();
  				  },function(errData){
  					  $scope.disabledMediaLocationSaveBtn = false;
  				  });
  				};  
  				$scope.reject = function(){
  					$uibModalInstance.dismiss('cancel');
  				};
  			};
  			
  			
  			/**
  	  		 * popup for media Attributes
  	  		 * */
  	          
  	  		scope.createMediaAttributes= function(mediaId){
  	  				scope.errorStatus=[];
  	  				scope.errorDetails=[];
  	  				scope.mediaId=mediaId;
  	  			$uibModal.open({
  	  				  templateUrl: 'createmediaattribute.html',
  	  				  controller:createMediaAttributesController ,
  	  				  resolve:{}
  	  				});
  	  		};
  	  				         
  	  		function createMediaAttributesController($scope,$uibModalInstance){
  	  				$scope.formData = {}; 
  	  				$scope.mediaAttributes = [];
  	  				$scope.formData.mediaassetAttributes=[];
  	  				/**
  	  				 * retrieving data
  	  				 * */
  	  				resourceFactory.mediaTemplateResource.get(function(data) {
  	  	                $scope.mediaAttributes = data.mediaAttributes;
  	  	                $scope.formData.attributeType="Cast";
  	  	            });
  	  				/**
  	  				 * adding Attributes
  	  				 * */
  	  					$scope.addMediaAttributes = function () {
  	  						if ($scope.formData.attributeName && $scope.formData.attributevalue 
  	  								&& $scope.formData.attributeNickname && $scope.formData.attributeImage) {
  	  							
  	  				             $scope.formData.mediaassetAttributes.push({
					  	  												attributeType 	    : $scope.formData.attributeType,
					  	  												attributeName 		: $scope.formData.attributeName,
					  	  												attributevalue 		: $scope.formData.attributevalue,
					  	  												attributeNickname 	: $scope.formData.attributeNickname,
					  	  												attributeImage 		: $scope.formData.attributeImage
					  	  											  });
  	  				             delete $scope.formData.attributeName;
  	  				             delete $scope.formData.attributevalue;
  	  				             delete $scope.formData.attributeNickname;
  	  				             delete $scope.formData.attributeImage;
  	  						}
  	  					};
  	  		        /**
  	  				 * removing Attributes
  	  				 * */
  	            		$scope.deleteMediaAttributes = function (index) {
  	            			$scope.formData.mediaassetAttributes.splice(index,1);
  	            		};
  	            		
  	                /**
  	                 * Submit
  	                 * */
  	  				$scope.accept = function(){
  	  					
  	  				  $scope.formData.mediaDetailType="ATTRIBUTES";
  	  				  delete $scope.formData.attributeType;
  	  				  
  	  				  $scope.disabledMediaAttributesSaveBtn=true;
  	  				  resourceFactory.mediaLocationAttributesResource.save({'mediaId': scope.mediaId},$scope.formData,function(){ 
  	  					$uibModalInstance.close('delete');
  	  				      route.reload();
  	  				  },function(){
  	  					  $scope.disabledMediaAttributesSaveBtn = false;
  	  				  });
  	  				};
  	  				
  	  				$scope.reject = function(){
  	  				$uibModalInstance.dismiss('cancel');
  	  				};
  	  			};
  	  			
  	  		scope.deletemedia = function (mediaId){
  	        	
  	  			scope.mediaId = mediaId;
  	  		$uibModal.open({
  					 templateUrl: 'deletemedia.html',
  					 controller: deleteMediaController,
  					 resolve:{}
  				 });
  	          };
  	          
  	          function deleteMediaController($scope, $uibModalInstance) {
  	        	  	
  	        	  $scope.approveDeleteMedia = function () {
  	        		  
  	        		  resourceFactory.saveMediaResource.remove({mediaId: scope.mediaId} , {} , function() {
  	        			$uibModalInstance.close('delete');
  	        			  route.reload();
  	                });
  	              };
  	              $scope.cancel = function () {
  	            	$uibModalInstance.dismiss('cancel');
  	              };
  	          };

  				        
    }
  });
  mifosX.ng.application.controller('MediaDetailsController', [
        '$scope', 
        'ResourceFactory',
        '$location',
        'PermissionService',
        '$uibModal',
        '$route',
    mifosX.controllers.MediaDetailsController]).run(function($log) {$log.info("MediaDetailsController initialized");
  });
}(mifosX.controllers || {}));
