(function(module) {
  mifosX.controllers = _.extend(module, {
	  PriceController: function(scope,routeParams, resourceFactory,location,route, $uibModal) {
        scope.prices = [];
        scope.planId=routeParams.id;
        
        scope.routeTo = function(priceId,planId){
            location.path('/viewprice/'+priceId+"/"+planId);
         };
         
        resourceFactory.priceResource.get({planId: routeParams.id} , function(data) {
            scope.prices = data.pricingData;
            if(scope.prices.length>0){
            	scope.planName = scope.prices[0].planCode;
            	for(var i in scope.prices){
	            	if(scope.prices[i].productId == 0){
        				scope.prices[i].productCode = "None";
	        		}
	            }
            }
        });
        
        scope.deletePrice = function (priceId,planId){
        	scope.priceId = priceId;
        	$uibModal.open({
                 templateUrl: 'delete.html',
                 controller: Approve,
                 resolve:{}
             });
         };
         function Approve($scope, $uibModalInstance) {
       	  
             $scope.approve = function () {
                 resourceFactory.deletePriceResource.remove({priceId: scope.priceId} , {} , function() {
                     route.reload();
                 });
                 $uibModalInstance.close('delete');
             };
             $scope.cancel = function () {
            	 $uibModalInstance.dismiss('cancel');
             };
         }
	  }      	
           
  });
  mifosX.ng.application.controller('PriceController', [
    '$scope', 
    '$routeParams',
    'ResourceFactory', 
    '$location',
    '$route',
    '$uibModal',
     mifosX.controllers.PriceController]).run(function($log) {
    $log.info("PriceController initialized");
  });
}(mifosX.controllers || {}));