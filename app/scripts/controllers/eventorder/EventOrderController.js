(function(module) {
	mifosX.controllers = _.extend(module, {
		EventOrderController : function(scope, webStorage, resourceFactory,
				routeParams, location, dateFilter,$rootScope) {

			scope.formData = {};
			scope.clientId = routeParams.id;
			scope.priceFormData = {};
			scope.walletConfig = webStorage.get('is-wallet-enable');
			var clientData = webStorage.get('clientData');
			scope.hwSerialNumber = clientData.hwSerialNumber;
			scope.displayName = clientData.displayName;
			scope.statusActive = clientData.statusActive;
			scope.accountNo = clientData.accountNo;
			scope.officeName = clientData.officeName;
			scope.balanceAmount = clientData.balanceAmount;
			scope.currency = clientData.currency;
			scope.imagePresent = clientData.imagePresent;
			scope.categoryType = clientData.categoryType;
			scope.email = clientData.email;
			scope.phone = clientData.phone;
	        if(scope.imagePresent){
			scope.image=clientData.image;
			}
			scope.requireDevice = webStorage.get('Registration_requires_device');
			console.log(scope.requireDevice);
			scope.start = {};
			scope.start.date = new Date();
			scope.minDate = scope.start.date;

			resourceFactory.eventOrderTemplateResource.get({clientId : routeParams.id}, function(data) {
				scope.devices = data.devices;
				scope.events = data.events;
				scope.optTypes = data.optType;
				scope.codes = data.codes;
				scope.clientTypes = data.clientType;
			});

			scope.reset123 = function() {
				webStorage.add("callingTab", {someString : "eventordertab"});
			};

			scope.submit = function() {
				this.formData.locale = scope.optlang.code;
				this.formData.clientId =routeParams.id;
				this.formData.deviceId =scope.hwSerialNumber;
				this.formData.dateFormat = "dd MMMM yyyy";
				var adjustmentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
				this.formData.eventBookedDate = adjustmentDate;
				resourceFactory.eventOrderTemplateResource.save(this.formData,function(data) {
					location.path('/viewclient/' + routeParams.id);
				});
			};

		}
	});
	mifosX.ng.application.controller(
			'EventOrderController',
			[ '$scope', 'webStorage', 'ResourceFactory', '$routeParams',
					'$location', 'dateFilter','$rootScope',
					mifosX.controllers.EventOrderController ]).run(
			function($log) {
				$log.info("EventOrderController initialized");
			});
}(mifosX.controllers || {}));
