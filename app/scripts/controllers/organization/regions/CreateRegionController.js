(function(module) {
	mifosX.controllers = _.extend(module,{
		CreateRegionController : function(scope, resourceFactory, location, routeParams) {

			scope.allowed = [];
			scope.restricted = [];
			scope.nonselectedservice = [];
			scope.formData = {};
			scope.selectedServices = [];
			scope.availableServices = [];
			resourceFactory.regionResourceTemplate.getAllRegions(function(data) {
				scope.countrydata = data.countryData;
			});

			scope.countryDetails = function(countryId) {
				resourceFactory.regionResourceGetStates.get({ countryId : countryId }, function(data) {
					scope.availableServices = data.statesData;
					scope.nonselectedservice = data.statesData;
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
								
				resourceFactory.regionResource.save( this.formData, function(data) {									
					location.path('/regions');									
				});						
			};			
		}			
	});
	mifosX.ng.application.controller('CreateRegionController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'$routeParams',
	mifosX.controllers.CreateRegionController ]).run(
			function($log) {
				$log.info("CreateRegionController initialized");			
			});
}(mifosX.controllers || {}));
