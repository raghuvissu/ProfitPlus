(function(module) {
	mifosX.controllers = _.extend(module, {
		EditProspectsController : function(scope, routeParams, route, location, resourceFactory, http, dateFilter, $rootScope) {
			
			scope.editprospects = [];
			scope.sourceOfPublicityDatas = [];
			scope.planDatas = [];
			scope.countryDatas = [];
			scope.stateDatas = [];
			scope.cityDatas = [];
			scope.first = {};
			scope.first.time = {};
			scope.first.date = new Date();
			scope.publicityFlag = false;
			scope.minDate = new Date();
			
			$('#timepicker1').timepicker({				
				showMeridian : false				
			});
			
			resourceFactory.prospectResource.getViewProspects({ prospectId : routeParams.id }, function(data) {
			
				scope.editprospects = data;								
				scope.sourceOfPublicityDatas = data.sourceOfPublicityData;
				scope.planDatas = data.planData;
				scope.countryDatas = data.countryData;
				scope.stateDatas = data.stateData;
				scope.cityDatas = data.cityData;
				scope.first.date = scope.getDateData(data.preferredCallingTime);
				
				for ( var i = 0; i < scope.sourceOfPublicityDatas.length; i++) {
					if (scope.sourceOfPublicityDatas[i].mCodeValue == scope.editprospects.sourceOfPublicityInt) {								
						scope.publicityFlag = true;								
					}								
				}
				
				if (scope.publicityFlag == true) {												
					scope.editprospects.sourceOfPublicity = scope.editprospects.sourceOfPublicityInt;							
				} else if (scope.publicityFlag == false) {													
					scope.editprospects.sourceOther = scope.editprospects.sourceOfPublicityInt;								
					scope.editprospects.sourceOfPublicity = "Other";							
				}											
			});
			
			scope.getStateAndCountry = function() {
				
				resourceFactory.AddressTemplateResource.get({ city : scope.editprospects.cityDistrict }, function(data) {					
					scope.editprospects.state = data.state;				
					scope.editprospects.country = data.country;				
				});				
			};
			
			scope.submit = function() {						
				delete scope.editprospects.planData;
				delete scope.editprospects.countryData;
				delete scope.editprospects.stateData;
				delete scope.editprospects.cityData;

				delete scope.editprospects.sourceOfPublicityInt;

				if (scope.editprospects.sourceOfPublicity != 'Other') {				
					delete scope.editprospects.sourceOther;								
				}
				
				scope.editprospects.locale = scope.optlang.code;				
				delete scope.editprospects.sourceOfPublicityData;
								
				var reqDate = dateFilter(new Date(scope.first.date), 'yyyy-MM-dd');
		
				scope.editprospects.preferredCallingTime = reqDate + " " + $('#timepicker1').val() + ":00";  
				//scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
			
				/*scope.editprospects.sourceOfPublicity = scope.editprospects.sourceOfPublicityInt;*/							
				scope.editprospects.preferredPlan = scope.editprospects.preferredPlanInt;
			
				resourceFactory.prospectResource.update({ prospectId : routeParams.id }, scope.editprospects, function(data) {				
					location.path('/viewprospects/' + data.resourceId);						
				});						
			};

			scope.convertProspect = function() {					
				resourceFactory.prospectConvertResource.save({ deleteProspectId : routeParams.id }, {}, function(data) {					
					location.path('/viewclient/' + data.resourceId);							
				});							
			};
			
           scope.getDateData = function(dateData) {
				
				var splitedString = dateData.replace(",", "");
				splitedString = splitedString.split(" ");
				var month = splitedString[0];
				var day = splitedString[1];
				var year = splitedString[2];
				var time = splitedString[3];
				month = scope.getFullName(month);
				day = day.length < 2 ? "0" + day : day;
				dateData = day + " " + month + " " + year;
				scope.first.time = time.substring(0, time.lastIndexOf(":"));
				return dateData;			
			};
			
    scope.getFullName = function(month) {
				
				var x = undefined;				
				if (month == "Jan")				
					x = "January";			
				else if (month == "Feb")				
					x = "February";
				else if (month == "Mar")
					x = "March";
				else if (month == "Apr")
					x = "April";
				else if (month == "May")
					x = "May";
				else if ((month == "June") || (month == "Jun"))
					x = "June";
				else if (month == "Jul")
					x = "July";
				else if (month == "Aug")
					x = "August";
				else if (month == "Sep")
					x = "September";
				else if (month == "Oct")
					x = "October";
				else if (month == "Nov")
					x = "November";
				else if (month == "Dec")
					x = "December";
				else
					x = undefined;				
				return x;			
			};
				
		}
		
	});
	mifosX.ng.application.controller('EditProspectsController', [ 
     	'$scope', 
     	'$routeParams', 
     	'$route', 
     	'$location',
     	'ResourceFactory', 
     	'$http', 
     	'dateFilter', 
     	'$rootScope',
   mifosX.controllers.EditProspectsController ]).run(function($log) {		
     	$log.info("EditProspectsController initialized");
   });
}(mifosX.controllers || {}));