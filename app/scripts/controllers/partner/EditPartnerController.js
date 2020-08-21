(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditPartnerController: function(scope, resourceFactory, routeParams,location,$rootScope,webStorage,Upload,API_VERSION) {
        scope.offices = [];
        scope.partnerTypes = [];
        scope.currencydatas = [];
        scope.formData = {};
        scope.partnerId =  routeParams.partnerId;
        scope.partnerName =  webStorage.get("partnerName");
       	 
       	resourceFactory.partnerResource.get({partnerId: routeParams.partnerId,template:'true'} , function(data) {
       		
            scope.formData  = data;
            scope.officeId =  scope.formData.officeId;
            scope.partnerName = scope.formData.partnerName;
            webStorage.add("partnerName", scope.formData.partnerName);
            scope.offices = data.allowedParents;
            scope.currencydatas = data.currencyData.currencyOptions;
            scope.cityDatas = data.citiesData;
            scope.formData.officeType  = data.officeTypes[1].id;
            
         
      });
        
        scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData.state = data.state;
            		scope.formData.country = data.country;
        	  });
          };
          scope.onFileSelect = function($files) {
            scope.file = $files[0];
            scope.file = new File([""], "filename");
            console.log(scope.file);
          };
          
          scope.reset123 = function(partnerId,officeId){
          if(partnerId&&officeId){
        	  location.path('/viewpartner/' +partnerId +'/'+ officeId);
          }else{	  
       	   webStorage.add("callingTab", {someString: "Partners" });
          }
          };
        
        scope.submit = function() {  
        	
        scope.formData.locale = scope.optlang.code;
        //scope.formData.roles = [10];
          
          delete scope.formData.id;
          delete scope.formData.officeId;
          delete scope.formData.parentName;
          delete scope.formData.openingDate;
          delete scope.formData.balanceAmount;
          delete scope.formData.creditLimit;
          delete scope.formData.currencyData;
          delete scope.formData.officeTypes;
          delete scope.formData.allowedParents;
          delete scope.formData.configCurrency;
          delete scope.formData.citiesData;
          delete scope.formData.statesData;
          delete scope.formData.countryData;
      
          
          resourceFactory.partnerResource.update({partnerId : scope.partnerId},this.formData,function(data){
        	  
        	  if (scope.file) {
            	  Upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/partners/'+data.officeId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                    // to fix IE not refreshing the model
                    if (!scope.$$phase) {
                      scope.$apply();
                    }
                    location.path('/viewpartner/' +data.resourceId +'/'+data.officeId);
                  });
        	  }else{
        		  location.path('/viewpartner/' +data.resourceId +'/'+data.officeId);
        	  }	
          });
        };
    }
  });
  mifosX.ng.application.controller('EditPartnerController', 
  ['$scope', 
   'ResourceFactory', 
   '$routeParams',
   '$location',
   '$rootScope',
   'webStorage', 
   'Upload',
   'API_VERSION',
    mifosX.controllers.EditPartnerController
    ]).run(function($log) {
    $log.info("EditPartnerController initialized");
  });
}(mifosX.controllers || {}));