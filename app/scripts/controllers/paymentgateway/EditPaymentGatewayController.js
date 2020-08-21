(function(module) {
	mifosX.controllers = _.extend(module, {
		EditPaymentGatewayController : function(scope, routeParams, resourceFactory, location) {
			scope.formData = {};
			scope.statusData = [];
			scope.updateData = {};
			
			resourceFactory.paymentGatewayResource.getData({'id' : routeParams.id}, this.formData, function(data) {
				scope.formData = data;
				scope.statusData = data.statusData;
				scope.formData.paymentdata = data.statusData[0].code;
			});
			
			scope.submit = function() {
				this.updateData.status = this.formData.paymentdata;
				this.updateData.remarks = this.formData.remarks;
				resourceFactory.paymentGatewayResource.update({'id' : routeParams.id}, this.updateData, function(data) {
					location.path('/paymentGateway');
				});
			};
			
		}
	});
	mifosX.ng.application.controller('EditPaymentGatewayController', [
      	'$scope', 
      	'$routeParams', 
      	'ResourceFactory', 
      	'$location', 
    mifosX.controllers.EditPaymentGatewayController ]).run(function($log) {		
      	$log.info("EditPaymentGatewayController initialized");			
    });
}(mifosX.controllers || {}));