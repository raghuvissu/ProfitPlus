(function(module) {
	mifosX.controllers = _.extend(module, {
		EditChargeCodeController : function(scope, routeParams,resourceFactory, location, $rootScope) {
			scope.chargeTypes = [];
			scope.durationTypes = [];
			scope.billFrequencyCodes = [];
			scope.chargeCodeId = routeParams.id;

			resourceFactory.chargecodeResource.get({chargeCodeId : routeParams.id,	template : 'true'}, function(data) {
				scope.chargeTypes = data.chargeTypeData;
				scope.durationTypes = data.durationTypeData;
				scope.billFrequencyCodes = data.billFrequencyCodeData;
				scope.formData = data;
				scope.chargeCodeId = routeParams.id;

				if (data.taxInclusive === 1) {
					scope.formData.taxInclusive = true;
				}
				
				if (data.isAggregate === 1) {
					scope.formData.isAggregate = true;
				}
               
			});

			scope.submit = function() {
				delete this.formData.id;
				delete this.formData.chargeTypeData;
				delete this.formData.durationTypeData;
				delete this.formData.billFrequencyCodeData;
				this.formData.locale = scope.optlang.code;
				resourceFactory.chargecodeResource.update({'chargeCodeId' : routeParams.id}, this.formData, function(data) {
					location.path('/viewchargecode/' + data.resourceId);
				});
			};
		}
	});
	mifosX.ng.application.controller('EditChargeCodeController',[
	     '$scope',
	     '$routeParams', 
	     'ResourceFactory',
	     '$location',	
	     '$rootScope',
	     mifosX.controllers.EditChargeCodeController 
	     ]).run(function($log) {
	    	 $log.info("EditChargeCodeController initialized");
	     });
}(mifosX.controllers || {}));
