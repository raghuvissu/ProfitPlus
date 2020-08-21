(function(module) {
	mifosX.controllers = _
			.extend(
					module,
					{
						CreateEventController : function(scope,
								resourceFactory, dateFilter, location, routeParams, $rootScope) {

							scope.eventStatus = [];
							scope.chargeData = [];
							scope.availableServices = [];
							scope.allowed = [];
							scope.restricted = [];
							scope.nonselectedservice = [];
							scope.services = [];							
							scope.selectedServices = [];
							scope.date = {};
							scope.first = {};
							
							scope.restrict = function() {						
								for ( var i in this.allowed) {																	
									for ( var j in scope.availableServices) {			
									
										if (scope.availableServices[j].mediaId == this.allowed) {											
											var temp = {};
											temp.id = this.allowed[i];
											temp.name = scope.availableServices[j].mediaTitle;
											// temp.includeInBorrowerCycle =
											// scope.allowedProducts[j].includeInBorrowerCycle;
											scope.selectedServices.push(temp);
											scope.allowedProducts.splice(j, 1);
										}
									}
								}
							};
							scope.allow = function() {
								for ( var i in this.restricted) {
									for ( var j in scope.selectedServices) {
									
										if (scope.selectedServices[j].name == this.restricted[i]) {
											var temp = {};
											temp.mediaId = this.restricted[i];
											temp.mediaTitle = scope.selectedServices[j].name;
											// temp.includeInBorrowerCycle =
											// scope.restrictedProducts[j].includeInBorrowerCycle;
											scope.availableServices.push(temp);
											scope.selectedServices.splice(j, 1);
										}
									}
								}
							};
							
							resourceFactory.eventTemplateResource.get(function(
									data) {
								scope.formData = {};
								scope.eventStatus = data.statusData;
								for(var i=0;i<scope.eventStatus.length;i++){
									if(scope.eventStatus[i].value=='ACTIVE'){
										scope.formData.status=scope.eventStatus[i].id;
									}
								}
								scope.chargeData = data.chargeData;

								scope.availableServices = data.mediaAsset;
								scope.productmix = data;
								scope.allowedProducts = data.mediaAsset;
								scope.eventCategeorydatas = data.eventCategeorydata;
								
								/**
								 * This condition call when we come from Media 
								 * */
								if(routeParams.from=='MEDIA'){
									scope.formData.eventDescription=routeParams.mediaTittle;
									scope.allowed=routeParams.mediaId;
									scope.restrict();
									
								}
							});
							
							$('#timepicker1').timepicker({
					        	showInputs:false,
					        	showMeridian:false
					        });
						 
							$('#timepicker2').timepicker({
					        	showInputs:false,
					        	showMeridian:false
					        });
							
							
							scope.submit = function() {
								this.formData.locale = scope.optlang.code;
								this.formData.dateFormat = 'dd MMMM yyyy';
								
					        	var reqDate = dateFilter(scope.date.startDate,'dd MMMM yyyy');
					        	var reqEndDate = dateFilter(scope.date.eventEndDate,'dd MMMM yyyy');
					        	var reqEventValididty= dateFilter(scope.date.eventValidity,'dd MMMM yyyy');
					        	
					            this.formData.eventStartDate = reqDate;
					            this.formData.eventEndDate = reqEndDate;
					            this.formData.eventValidity = reqEventValididty;
					            
					            if(this.formData.eventCategory == 'Live Event' &&
					            		$('#timepicker1').val() !=''){
					            	
					            	this.formData.eventStartDate = reqDate+" "+$('#timepicker1').val()+':00';
								}
					            if(this.formData.eventCategory == 'Live Event' && 
					            		$('#timepicker2').val() !=''){
					           
					            	this.formData.eventEndDate = reqEndDate+" "+$('#timepicker2').val()+':00';
								}
								
								var temp = [];
								var final = {};
								for ( var i in scope.selectedServices) {
									temp[i] = scope.selectedServices[i].id;

								}
								this.formData.mediaData = temp;

								// var services=[];

								resourceFactory.eventResource.save(
										this.formData, function(data) {
												location.path('/event');
														
										});
							};
						}
					});
	mifosX.ng.application.controller(
			'CreateEventController',
			[ '$scope', 'ResourceFactory', 'dateFilter','$location','$routeParams','$rootScope',
					mifosX.controllers.CreateEventController ]).run(
			function($log) {
				$log.info("CreateEventController initialized");
			});
}(mifosX.controllers || {}));