(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateTaxMappingController: function(scope, resourceFactory, routeParams, location, dateFilter, $rootScope) {
        scope.chargecodetaxs = [];
        scope.typetaxmapdatas = [];
        scope.priceRegionDatas = [];
        scope.date = {};
        scope.start = {};
        scope.formData = {};
        scope.start.date = new Date();
        scope.minDate = new Date();
        
        resourceFactory.taxmappingtemplateResource.getAlltaxmapping({'chargeCode':routeParams.chargeCode}, function(data) {
            scope.taxTypeDatas = data.taxTypeData;
            scope.priceRegionDatas = data.priceRegionData;
            scope.formData = data;
        });
        
        scope.doSomething =function(){
     	
     	   if(scope.end.date){
     		   if(new Date(scope.start.date) > new Date(scope.end.date))
     			   scope.end.date = scope.start.date;
     	   }
        };
                
        scope.submit = function() {
        	this.formData.locale = scope.optlang.code;
        	var reqDate = dateFilter(scope.start.date, 'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.startDate = reqDate;
         
            delete this.formData.priceRegionData;
            delete this.formData.taxTypeData;
            resourceFactory.getTaxmappingResource.save({'taxId':routeParams.chargeCode}, this.formData, function(data){
            		location.path('/taxmapping/' + routeParams.chargeCode + '/' + data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('CreateTaxMappingController', [
       '$scope', 
       'ResourceFactory',
       '$routeParams',
       '$location',
       'dateFilter',
       '$rootScope',
       mifosX.controllers.CreateTaxMappingController
       ]).run(function($log) {
    	   $log.info("CreateTaxMappingController initialized");
       });
}(mifosX.controllers || {}));