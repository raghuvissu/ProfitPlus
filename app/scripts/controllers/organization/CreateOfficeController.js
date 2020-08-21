(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateOfficeController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
    	
        scope.offices = [];
        scope.officeTypes = [];
        scope.businessTypes = [];
        scope.first = {};
        scope.first.date = new Date();
        
        resourceFactory.officeTemplateResource.get({} , function(data) {
            scope.offices = data.allowedParents;
            scope.officeTypes = data.officeTypes;
            scope.businessTypes = data.businessTypes;
            //scope.addressData=data.addressData;
            scope.cities=data.addressData.cityData;
            
            for(var i in data.officeTypes){
          	  if(data.officeTypes[i].name == "Office"){
          		scope.officeType = data.officeTypes[i].id;
          	  }
            }
            scope.formData = {
              parentId : scope.offices[0].id,
              officeType :scope.officeType,
            };
        });
        
        scope.getStateAndCountry=function(city){
    	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
        		scope.formData.state = data.state;
        		scope.formData.country = data.country;
    	  });
        };
         
        scope.onFileSelect = function($files) {
            scope.file = $files[0];
          };
          
        scope.submit = function() {   
          this.formData.locale = scope.optlang.code;
          var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
          this.formData.dateFormat = 'dd MMMM yyyy';
          this.formData.openingDate = reqDate;
          resourceFactory.officeResource.save(this.formData,function(data){
        		 location.path('/viewoffice/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateOfficeController', ['$scope', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.CreateOfficeController]).run(function($log) {
    $log.info("CreateOfficeController initialized");
  });
}(mifosX.controllers || {}));
