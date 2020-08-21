(function(module) {
  mifosX.controllers = _.extend(module, {
    EditMediaController: function(scope, routeParams, resourceFactory, location,dateFilter,$rootScope) {
        scope.mediaAssetData = [];
        scope.mediaAttributes = [];
        
        scope.mediaCategeorydatas = [];
        scope.mediaFormats = [];
        scope.mediaLanguageDatas=[];
        scope.mediaAssetLocations=[];
        scope.mediaTypeDatas = [];
        scope.mediaassetAttributes=[];
        scope.services=[];
        scope.attributesFormData=[];
        scope.contentProviderDatas=[];
        scope.date={};
        resourceFactory.saveMediaResource.get({mediaId: routeParams.id, template: 'true'} , function(data) {
            
            scope.planId = data.id;
            scope.mediaId=routeParams.id;
           // scope.provisioingSystem=data.provisionSystem;
            scope.formData= data.mediaAssetData;
            scope.formData.mediatype=parseInt(data.mediaAssetData.mediatype);
            scope.mediaAttributes = data.mediaAttributes;
            scope.mediaCategeorydatas = data.mediaCategeorydata;
            scope.mediaFormats=data.mediaFormat;
            scope.mediaLanguageDatas=data.mediaLanguageData;
            scope.mediaAssetLocations=data.mediaLocationData;
            scope.formData.location=data.mediaLocationData[0].location;
            scope.mediaStatus=data.mediaStatus;
            scope.eventCategeorydatas=data.eventCategeorydata;
            scope.mediaassetAttributes=data.mediaassetAttributes;
            scope.mediaStatus=data.mediaStatus;
            scope.contentProviderDatas=data.contentProviderData;
            scope.mediaAttributes.attributeType="Cast";
            var releaseDate = dateFilter(scope.formData.releaseDate,'dd MMMM yyyy');
            scope.date.releaseDate = new Date(releaseDate );

        });
        
    	
        scope.addMedia = function () {
        	if (scope.attributesFormData.attributeName && scope.attributesFormData.attributeValue) {
              scope.mediaassetAttributes.push({attributeType:scope.attributesFormData.attributeType, attributeName:scope.attributesFormData.attributeName, 
            	  attributeValue:scope.attributesFormData.attributeValue, attributeNickname:scope.attributesFormData.attributeNickname,attributeImage:scope.attributesFormData.attributeImage});
            //alert(mediaassetAttributes.attributeName);
             // scope.attributesFormData.attributeType = undefined;
              scope.attributesFormData.attributeName = undefined;
              scope.attributesFormData.attributeValue = undefined;
              scope.attributesFormData.attributeNickname = undefined;
              scope.attributesFormData.attributeImage = undefined;
        	}
          };
          
          scope.addMediaLocation = function () {
          //	if (scope.mediaLocationFormData.languageId && scope.mediaLocationFormData.location) {
                scope.mediaAssetLocations.push({languageId:scope.mediaLocationFormData.languageId, location:scope.mediaLocationFormData.location, 
                	formatType:scope.mediaLocationFormData.formatType});
                scope.mediaLocationFormData.languageId = undefined;
                scope.mediaLocationFormData.location = undefined;
                scope.mediaLocationFormData.formatType = undefined;
                
          	//}
            };
		
          
          scope.deleteMedia = function (index) {
              scope.mediaassetAttributes.splice(index,1);
            };
            
            scope.removeMediaLocation = function (index) {
                scope.mediaAssetLocations.splice(index,1);
              };
        
        scope.submit = function() {
        	
        	this.formData.mediaRating;
        	/*this.formData.rating=this.formData.mediaRating;
        	this.formData.mediaType=this.formData.mediatype;
        	this.formData.mediaCategoryId=this.formData.catageoryId;*/
           delete this.formData.mediaId;
           /*delete this.formData.mediaImage;
           delete this.formData.mediatype;
           delete this.formData.catageoryId;*/
           delete this.formData.rating;
           //this.formData.locale = 'en';
           this.formData.dateFormat = 'dd MMMM yyyy';
         //  this.formData.releaseDate = '05 August 2013';
        //   this.formData.dateFormat = 'dd MMMM yyyy';
           this.formData.locale = scope.optlang.code;
            this.formData.releaseDate = dateFilter(scope.date.releaseDate,'dd MMMM yyyy');
            this.formData.mediaTypeCheck="EDITMEDIA";
            this.formData.formatType="SD";
            this.formData.languageId="English";
            scope.formData.mediaAssetLocations =new Array();
            scope.formData.mediaassetAttributes =new Array();
            
            
           if (scope.mediaassetAttributes.length > 0) {
               scope.formData.mediaassetAttributes = [];
               for (var i in scope.mediaassetAttributes) {
                 scope.formData.mediaassetAttributes.push({attributeType:scope.mediaassetAttributes[i].attributeType,attributeName:scope.mediaassetAttributes[i].attributeName, 
              	   attributevalue:scope.mediaassetAttributes[i].attributeValue,attributeNickname:scope.mediaassetAttributes[i].attributeNickname,
              	   attributeImage:scope.mediaassetAttributes[i].attributeImage});
               };
             }
           
           if (scope.mediaAssetLocations.length > 0) {
               scope.formData.mediaAssetLocations = [];
               for (var i in scope.mediaAssetLocations) {
              	
                 scope.formData.mediaAssetLocations.push({languageId:scope.mediaAssetLocations[i].languageId,formatType:scope.mediaAssetLocations[i].formatType, 
              	   location:scope.mediaAssetLocations[i].location});
               };
             }
           
             
             
             resourceFactory.saveMediaResource.update({'mediaId':routeParams.id},this.formData,function(data){
             location.path('/viewmedia/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditMediaController', ['$scope', '$routeParams', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.EditMediaController]).run(function($log) {
    $log.info("EditMediaController initialized");
  });
}(mifosX.controllers || {}));
