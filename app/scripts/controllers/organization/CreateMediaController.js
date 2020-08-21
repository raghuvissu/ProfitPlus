(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateMediaController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
        scope.mediaAttributes = [];
        scope.mediaCategeorydatas = [];
        scope.mediaFormats = [];
        scope.mediaLanguageDatas =[];
        scope.mediaStatus = [];
        scope.mediaTypeDatas = [];
        scope.mediaassetAttributes=[];
        scope.mediaAssetLocations=[];
        scope.contentProviderDatas=[];
        scope.gameData=[];
        scope.attributesFormData={};
        scope.gameAttributesFormData={};
        scope.mediaLocationFormData={};
        scope.release= {};
        scope.release.date = new Date();
        scope.hideForGame = true;
        scope.counter = 0;
        
        var getAll = function(){
        	
        	resourceFactory.mediaTemplateResource.get(function(data) {
        		scope.formData = {  
                };
                scope.mediaAttributes = data.mediaAttributes;
                scope.mediaCategeorydatas = data.mediaCategeorydata;
                for(var i=0;i<scope.mediaCategeorydatas.length;i++){
                	if(scope.mediaCategeorydatas[i].mCodeValue=='Movie'){
                		scope.formData.catageoryId=scope.mediaCategeorydatas[i].id;
                	}
                }
                scope.mediaFormats = data.mediaFormat;
                scope.mediaLanguageDatas = data.mediaLanguageData;
                scope.mediaStatus = data.mediaStatus;
                for(var i=0;i<scope.mediaStatus.length;i++){
                	if(scope.mediaStatus[i].value=='ACTIVE'){
                		scope.formData.status=scope.mediaStatus[i].value;
                	}
                }
                scope.eventCategeorydatas = data.eventCategeorydata;
                scope.contentProviderDatas=data.contentProviderData;
                scope.attributesFormData.attributeType="Cast";
                scope.mediaTypeDatas = data.mediaTypeData;
            });
        	
        };
        
        getAll();
        
        
        scope.setGameScreen = function(){
        	resourceFactory.mediaGameTemplateResource.get(function(data) {
                scope.categorys = data.mediaCategory;
                scope.mediaContentProviders = data.mediaContentProvider;
                scope.mediaTypes = data.mediaType;
                scope.formData = {
               
                  
                };
            });     
        	scope.hideForGame = false;
        };
        
        scope.setMovieScreen = function(){
        	scope.hideForGame = true;
        	getAll();
        };
        
        
        scope.addGameMedia = function(){
        	scope.counter = scope.counter+1;
        	console.log("Add Game Media: "+scope.counter);
								        	scope.gameData
										.push({
											mediaCategory : scope.gameAttributesFormData.mediaCategory,
											mediaContentProvider : scope.gameAttributesFormData.mediaContentProvider,
											mediaType : scope.gameAttributesFormData.mediaType,
											source : scope.gameAttributesFormData.source,
											service : scope.gameAttributesFormData.service,
											amount : scope.gameAttributesFormData.amount,
											sequence : scope.gameAttributesFormData.sequence=scope.counter 
										});
            scope.gameAttributesFormData.mediaCategory = undefined;
            scope.gameAttributesFormData.mediaContentProvider = undefined;
            scope.gameAttributesFormData.mediaType = undefined;
            scope.gameAttributesFormData.source = undefined;
            scope.gameAttributesFormData.service = undefined;
            scope.gameAttributesFormData.sequence = undefined;
            scope.gameAttributesFormData.amount = undefined;
        };

        scope.removeGameMedia = function(index){	
        	if(scope.counter>1){
        		scope.counter = scope.counter-1;
        	}
        	scope.gameData.splice(index,1);
        	console.log("Remove Game Media: "+scope.counter);	
        };
        
        
        scope.getCount = function(){
        	return new Array(scope.counter);
        };

        scope.addMedia = function () {
        	if (scope.attributesFormData.attributeName && scope.attributesFormData.attributevalue 
        			&& scope.attributesFormData.attributeNickname && scope.attributesFormData.attributeImage) {
									              scope.mediaassetAttributes
											.push({
												attributeType : scope.attributesFormData.attributeType,
												attributeName : scope.attributesFormData.attributeName,
												attributevalue : scope.attributesFormData.attributevalue,
												attributeNickname : scope.attributesFormData.attributeNickname,
												attributeImage : scope.attributesFormData.attributeImage
											});
            //alert(mediaassetAttributes.attributeName);
            //  scope.attributesFormData.attributeType ="Cast";
              scope.attributesFormData.attributeName = undefined;
              scope.attributesFormData.attributevalue = undefined;
              scope.attributesFormData.attributeNickname = undefined;
              scope.attributesFormData.attributeImage = undefined;
        	}
          };
          
          scope.addMediaLocation = function () {
           if (scope.mediaLocationFormData.languageId && scope.mediaLocationFormData.location && scope.mediaLocationFormData.formatType) {
                scope.mediaAssetLocations.push({languageId:scope.mediaLocationFormData.languageId, location:scope.mediaLocationFormData.location, 
                	formatType:scope.mediaLocationFormData.formatType});
              
                scope.mediaLocationFormData.languageId = undefined;
                scope.mediaLocationFormData.location = undefined;
                scope.mediaLocationFormData.formatType = undefined;
                
          	}
            };
		
          
            scope.deleteMedia = function (index) {
              scope.mediaassetAttributes.splice(index,1);
            };
            
            scope.removeMediaLocation = function (index) {
                scope.mediaAssetLocations.splice(index,1);
              };
            
              
        scope.submitForGame = function(){
        	scope.formData.gameMediaData = new Array();
        	if(scope.gameData.length>0){
        		for(var i in scope.gameData){
        			scope.formData.gameMediaData.push({
        				mediaCategory : scope.gameData[i].mediaCategory,
						mediaContentProvider : scope.gameData[i].mediaContentProvider,
						mediaType : scope.gameData[i].mediaType,
						source : scope.gameData[i].source,
						service : scope.gameData[i].service,
						sequence : scope.gameData[i].sequence,
						amount : scope.gameData[i].amount,
						locale : scope.optlang.code,
						dateFormat  : "dd MMMM yyyy"
        			});
        		}
        	}
        	this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.locale = scope.optlang.code;
        	resourceFactory.saveMediaGameTemplateResource.save(this.formData,function(data){
                location.path('/viewmedia/' + data.resourceId);
              });
        };      
              
        scope.submit = function() {
        	
        	if(scope.hideForGame == false){
        		scope.submitForGame();
        		return undefined;
        	}
        	
        	 this.formData.locale = scope.optlang.code;
         	 var reqDate = dateFilter(scope.release.date,'dd MMMM yyyy');
             this.formData.dateFormat = 'dd MMMM yyyy';
             this.formData.releaseDate = reqDate;
             this.formData.mediaTypeCheck="ADDMEDIA";
             this.formData.formatType="SD";
             this.formData.languageId="English";
             scope.formData.mediaAssetLocations =new Array();
             scope.formData.mediaassetAttributes =new Array();
             if (scope.mediaassetAttributes.length > 0) {
              
                 for (var i in scope.mediaassetAttributes) {
					                   scope.formData.mediaassetAttributes
												.push({
													attributeType : scope.mediaassetAttributes[i].attributeType,
													attributeName : scope.mediaassetAttributes[i].attributeName,
													attributevalue : scope.mediaassetAttributes[i].attributevalue,
													attributeNickname : scope.mediaassetAttributes[i].attributeNickname,
													attributeImage : scope.mediaassetAttributes[i].attributeImage
												});
                 };
               }
             
             if (scope.mediaAssetLocations.length > 0) {
                
                 for (var i in scope.mediaAssetLocations) {
                	
                   scope.formData.mediaAssetLocations.push({languageId:scope.mediaAssetLocations[i].languageId,formatType:scope.mediaAssetLocations[i].formatType, 
                	   location:scope.mediaAssetLocations[i].location});
                 };
               }
             
            resourceFactory.saveMediaResource.save(this.formData,function(data){
            		location.path('/viewmedia/' + data.resourceId);
          });
        };
        
        
        /**
         * This is for advanced media
         * */
        scope.submitAdvanceMedia = function() {
        	
        	if(scope.hideForGame == false){
        		scope.submitForGame();
        		return undefined;
        	}
        	
        	 this.formData.locale = scope.optlang.code;
         	 var reqDate = dateFilter(scope.release.date,'dd MMMM yyyy');
             this.formData.dateFormat = 'dd MMMM yyyy';
             this.formData.releaseDate = reqDate;
             this.formData.mediaTypeCheck="ADVANCEMEDIA";
             scope.formData.mediaAssetLocations =new Array();
             scope.formData.mediaassetAttributes =new Array();
             if (scope.mediaassetAttributes.length > 0) {
              
                 for (var i in scope.mediaassetAttributes) {
					                   scope.formData.mediaassetAttributes
												.push({
													attributeType : scope.mediaassetAttributes[i].attributeType,
													attributeName : scope.mediaassetAttributes[i].attributeName,
													attributevalue : scope.mediaassetAttributes[i].attributevalue,
													attributeNickname : scope.mediaassetAttributes[i].attributeNickname,
													attributeImage : scope.mediaassetAttributes[i].attributeImage
												});
                 };
               }
             
             if (scope.mediaAssetLocations.length > 0) {
                
                 for (var i in scope.mediaAssetLocations) {
                	
                   scope.formData.mediaAssetLocations.push({languageId:scope.mediaAssetLocations[i].languageId,formatType:scope.mediaAssetLocations[i].formatType, 
                	   location:scope.mediaAssetLocations[i].location});
                 };
             }
             resourceFactory.saveMediaResource.save(this.formData,function(data){
            		location.path('/viewmedia/' + data.resourceId);
             });
        };
        
        
    }
  });
  mifosX.ng.application.controller('CreateMediaController', ['$scope', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.CreateMediaController]).run(function($log) {
    $log.info("CreateMediaController initialized");
  });
}(mifosX.controllers || {}));
