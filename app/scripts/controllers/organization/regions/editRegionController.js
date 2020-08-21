(function(module) {
	mifosX.controllers = _.extend(module, {
		editRegionController : function(scope, routeParams, resourceFactory, location) {
			scope.formData = {};
			scope.allowed = [];
			scope.restricted = [];
			scope.formData = {};
			scope.selectedServices = [];
			scope.availableServices = [];
			scope.regionIdd = routeParams.id;
			resourceFactory.regionResource.get({ regionId : routeParams.id }, function(data) {
				scope.formData = data;
				scope.countrydata = data.countryData;
				scope.Services = data.regionDetails;
				scope.availableServices = data.statesData;
				if (data.isDefault == "Y") {
					scope.checked = true;	
				} else {
					for ( var i in data.regionDetails) {
						var temp = {};
						temp.id = scope.Services[i].id;
						temp.stateName = scope.Services[i].stateName;
						scope.selectedServices.push(temp);
						scope.restricted.push(temp.id);									
					}

					for ( var i in scope.availableServices) {
						var temp = {};
						temp.id = scope.availableServices.id;
						temp.stateName = scope.availableServices.stateName;																								
					}											
				}										
			});

			scope.countryDetails = function(countryId) { 
				resourceFactory.regionResourceGetStates.get({ countryId : countryId }, function(data) {
						scope.availableServices = data.statesData;	
						scope.nonselectedservice = data.statesData;
						scope.selectedServices = [];			
						scope.restricted = [];						
				});				
			};
							
			scope.restrict = function() {				
				for ( var i in this.allowed) {				
					for ( var j in scope.availableServices) {					
						if (scope.availableServices[j].id == this.allowed[i]) {				
							var temp = {};								
							temp.id = this.allowed[i];				
							temp.stateName = scope.availableServices[j].stateName;
							
							scope.selectedServices.push(temp);
							scope.availableServices.splice(j, 1);						
						}					
					}			
				}						
			};
							
			scope.allow = function() {					
				for ( var i in this.restricted) {						
					for ( var j in scope.selectedServices) {							
						if (scope.selectedServices[j].id == this.restricted[i]) {								
							var temp = {};								
							temp.id = this.restricted[i];
							temp.stateName = scope.selectedServices[j].stateName;
							scope.availableServices.push(temp);
							scope.selectedServices.splice(j, 1);						
						}						
					}						
				}					
			};
						
			scope.submit = function() {						
				delete this.formData.statesData;						
				delete this.formData.countryData;							
				delete this.formData.id;					
				delete this.formData.regionDetails;					
				delete this.formData.isDefault;						
				var temp = [];
				
				if (scope.checked) {
					temp[0] = "0";				
					this.formData.states = temp;			
				} else {							
					for ( var i in scope.selectedServices) {					
						temp[i] = scope.selectedServices[i].id;					
					}					
					this.formData.states = temp;					
				}
				
					
				resourceFactory.regionResource.update({'regionId' : routeParams.id }, this.formData, function(data) {								
					location.path('/viewregions/' + data.resourceId);							
				});				
			};					
		}				
	});
	mifosX.ng.application.controller('editRegionController', [ 
	'$scope', 
	'$routeParams', 
	'ResourceFactory', 
	'$location',			
	mifosX.controllers.editRegionController 
	]).run(function($log) {			
		$log.info("editRegionController initialized");		
	});

}(mifosX.controllers || {}));