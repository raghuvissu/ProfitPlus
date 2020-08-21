(function(module) {
  mifosX.controllers = _.extend(module, {
    EditOfficeController: function(scope, routeParams, resourceFactory, location,dateFilter,$rootScope) {
    	
        scope.formData = {};
        scope.first = {};
        resourceFactory.officeResource.get({officeId: routeParams.id, template: 'true'} , function(data) {
        	if(data.openingDate){
            var editDate = dateFilter(data.openingDate,'dd MMMM yyyy');
            scope.officeTypes = data.officeTypes;
            scope.first.date = new Date(editDate);
            scope.businessTypes = data.businessTypes;
            scope.offices = data.allowedParents;
            //scope.addressData = data.addressData;
            }
            
            for(var i in data.officeTypes){
            	if(data.officeTypes[i].name == data.officeType){
            		scope.formData.officeType = data.officeTypes[i].id;
            	}
            }
            for(var i in data.offices){
            	if(data.offices[i].name == data.offices){
            		scope.formData.office = data.offices[i].id;
            	}
            }
            scope.formData = {
              name : data.name,
              externalId : data.externalId,
              officeType : scope.formData.officeType,
              city : data.city,
              state : data.state,
              country : data.country,
              addressName : data.addressName,
              phoneNumber : data.phoneNumber,
              email : data.email,
              contactPerson : data.contactPerson,
              zip : data.zip,
              businessType : data.businessType,
              //parentId : scope.formData.office,
              parentId : data.parentId
          };
           
        });
         
        scope.getStateAndCountry=function(city){
      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
          		scope.formData.state = data.state;
          		scope.formData.country = data.country;
      	  });
        };
        
        scope.submit = function() {
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            this.formData.locale = scope.optlang.code;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.openingDate = reqDate;
            resourceFactory.officeResource.update({'officeId': routeParams.id},this.formData,function(data){
             location.path('/viewoffice/' + data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('EditOfficeController', ['$scope', '$routeParams', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.EditOfficeController]).run(function($log) {
    $log.info("EditOfficeController initialized");
  });
}(mifosX.controllers || {}));
