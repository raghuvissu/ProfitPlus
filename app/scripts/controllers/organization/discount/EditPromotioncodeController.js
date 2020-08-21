(function(module) {
	mifosX.controllers = _.extend(module, {
		EditPromotioncodeController : function(scope, resourceFactory, location, routeParams, dateFilter, $rootScope) {
			
			scope.promotiondatas = [];
			scope.durationTypes = [];
			scope.promotiondata = [];
			scope.start = {};
			scope.date = {};

			resourceFactory.promotionResource.getPrmotioncodeDetails({promotioncodeId : routeParams.id, template : 'true'}, function(data) {
				scope.promotiondata = data;
				scope.promotiondatas = data.discountTypeData;
				scope.durationTypes = data.contractTypedata;
				var actDate = dateFilter(data.startDate, 'dd MMMM yyyy');
				scope.start.startDate = new Date(actDate);
				scope.formData = {
					promotionCode : data.promotionCode,
					promotionDescription : data.promotionDescription,
					discountRate : data.discountRate,
					duration : data.duration,
					discountType : data.discountType,
					durationType : data.durationType,

				};
			});

			scope.submit = function() {
				
				this.formData.locale = scope.optlang.code;
				this.formData.dateFormat = "dd MMMM yyyy";
				var startdate = dateFilter(scope.start.startDate,'dd MMMM yyyy');
				this.formData.startDate = startdate;

				resourceFactory.promotionResource.update({promotioncodeId : routeParams.id}, this.formData, function(data) {
					location.path('/viewpromotioncode/' + data.resourceId);
				});
			};

		}
	});
	mifosX.ng.application.controller('EditPromotioncodeController',	[
	   '$scope', 
	   'ResourceFactory', 
	   '$location', 
	   '$routeParams',
	   'dateFilter',
	   '$rootScope',
	   mifosX.controllers.EditPromotioncodeController
	   ]).run(function($log) {
		   $log.info("EditPromotioncodeController initialized");
	});
}(mifosX.controllers || {}));
