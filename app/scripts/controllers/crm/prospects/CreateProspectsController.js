(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateProspectsController : function(scope,resourceFactory, location, dateFilter, $rootScope) {
			
			scope.sourceOfPublicityDatas = [];
			scope.planDatas = [];
			scope.countryDatas = [];
			scope.stateDatas = [];
			scope.cityDatas = [];
			scope.first = {};
			var datetime = new Date();
			scope.first.date = datetime;
			scope.first.time = datetime.getHours() + ":" + datetime.getMinutes();
	
			scope.formData = {};
			scope.minDate = new Date();
			scope.formData.prospectType = "1";
			
			$('#timepicker1').timepicker({
				showInputs : false,
				showMeridian : false,
			});
			resourceFactory.prospectTemplateResource.getTemplate(function(data) {
				scope.sourceOfPublicityDatas = data.sourceOfPublicityData;
				scope.planDatas = data.planData;
				scope.countryDatas = data.countryData;
				scope.stateDatas = data.stateData;
				scope.cityDatas = data.cityData;
										
				for ( var i in scope.sourceOfPublicityDatas) {					
					if (scope.sourceOfPublicityDatas[i].mCodeValue == "Phone") {												
						scope.formData.sourceOfPublicity = scope.sourceOfPublicityDatas[i].mCodeValue;					
					}									
				}

			scope.getStateAndCountry = function(city) {											
				resourceFactory.AddressTemplateResource.get({ city : scope.formData.city }, function(data) {										
					scope.formData.state = data.state;
					scope.formData.country = data.country;														
				 });							
			  };								
		    });
		   scope.submit = function() {			
				this.formData.locale = scope.optlang.code;
				var reqDate = dateFilter(scope.first.date,'yyyy-MM-dd');
				this.formData.preferredCallingTime = reqDate+ " " + $('#timepicker1').val() + ':00';
				this.formData.cityDistrict = this.formData.city;			
				this.formData.city;
								
				resourceFactory.prospectResource.save(this.formData, function(data) {
					location.path('/leads');										
			 });							
		  };	
		  
		}
	});
	mifosX.ng.application.controller('CreateProspectsController', [ 
	 '$scope', 
	 'ResourceFactory', 
	 '$location', 
	 'dateFilter', 
	 '$rootScope',
	mifosX.controllers.CreateProspectsController]).run(function($log) {
	  $log.info("CreateProspectsController initialized");	
    });
}(mifosX.controllers || {}));