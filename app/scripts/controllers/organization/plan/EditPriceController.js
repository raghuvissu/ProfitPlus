(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPriceController: function(scope, routeParams, resourceFactory, location,$rootScope) {
        scope.serviceDatas = [];
        scope.chargeDatas= [];
        scope.chargevariants=[];
        scope.discountdatas=[];
        scope.priceRegionDatas=[];
        /*scope.currencyCode = "";
        scope.currencyId = "";*/        
        resourceFactory.getPriceResource.get({priceId: routeParams.id, template: 'true'} , function(data) {
            scope.formData = data;
            scope.formData.currencyId = data.currencyId;
            scope.formData.productId = data.productId;
            scope.formData.duration=data.contractPeriod;
            scope.planId = data.id;
            scope.serviceDatas = data.serviceData;
            scope.chargeDatas= data.chargeData;
            scope.priceRegionDatas=data.priceRegionData;
            scope.chargevariants=data.chargevariant;
            scope.discountdatas=data.discountdata;
            scope.subscriptiondata = data.contractPeriods;
            scope.serviceDatas.push({"id":0,"productCode":"none","productDescription":"None"});
         
        });

        
        scope.submit = function() {
        	
        	scope.formData.chargevariant= scope.formData.chargeVariantId;
        	scope.formData.locale = scope.optlang.code;
        	
             delete this.formData.chargeData; 
             delete this.formData.serviceData;
             delete this.formData.discountdata; 
             delete this.formData.priceRegionData;
             delete this.formData.planId;
             delete this.formData.serviceId;
             delete this.formData.chargeId;
             delete this.formData.chargeVariantId;
             delete this.formData.priceId;
             delete this.formData.contractPeriods;
             delete this.formData.contractPeriod;
             delete this.formData.currencyCode;
            /* delete this.formData.currencyId;*/
             delete this.formData.currencydata;
             resourceFactory.updatePriceResource.update({'priceId':routeParams.id},scope.formData,function(data){
             location.path('/viewprice/' + data.resourceId+'/'+routeParams.id);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditPriceController', [
    '$scope', 
    '$routeParams', 
    'ResourceFactory', 
    '$location',
    '$rootScope', 
    mifosX.controllers.EditPriceController]).run(function($log) {
    $log.info("EditPriceController initialized");
  });
}(mifosX.controllers || {}));

