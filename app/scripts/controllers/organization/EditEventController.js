(function(module) {
	mifosX.controllers = _.extend(module,{
		EditEventController : function(scope,routeParams,resourceFactory,dateFilter, location,$rootScope) {
							scope.eventStatus = [];
							scope.chargeData = [];
							scope.availableServices = [];
							scope.allowed = [];
							scope.restricted = [];										
							scope.selectedServices = [];
							scope.formData = {};							
							scope.date = {};
							scope.first={};
							
							resourceFactory.eventEditResource.get({eventId: routeParams.id} , function(data) {								
                                scope.formData=data;                            
                                //scope.formData.allowCancellation=false;
								scope.eventStatus = data.statusData;
								scope.chargeData = data.chargeData;
								scope.selectedServices=data.selectedMedia;
								scope.availableServices = data.mediaAsset;
								if(data.allowCancellation == 'true'){
									scope.formData.allowCancellation=true;
								}
								
								for ( var i in data.selectedMedia) {	
									 //alert('var i in data.selectedMedia'+data.selectedMedia[i].mediaId);
									for ( var j in data.mediaAsset) {	
										 //alert('var j in data.mediaAsset'+data.mediaAsset[j].mediaId);
										if (data.mediaAsset[j].mediaId == data.selectedMedia[i].mediaId) {																		
											scope.availableServices.splice(j, 1);
										}
									}
								}
								scope.restricted=data.selectedMedia;
								scope.eventCategeorydatas = data.eventCategeorydata;
								
								 var actDate = dateFilter(data.eventStartDate,'MM dd,yyyy HH:MM:SS');
						            scope.date.startDate = new Date(actDate);
						            if(scope.date.startDate.getMinutes()==0){
						            	scope.first.starttime = scope.date.startDate.getHours()+':'+scope.date.startDate.getMinutes()+'0';
						            }else{
						            	scope.first.starttime = scope.date.startDate.getHours()+':'+scope.date.startDate.getMinutes();
						            }
						            if(data.eventEndDate){
						            	var endDate = dateFilter(data.eventEndDate,'MM dd,yyyy HH:MM:SS');
						            	scope.date.eventEndDate = new Date(endDate );
						            	if(scope.date.startDate.getMinutes()==0){
						            		scope.first.endtime=scope.date.eventEndDate.getHours()+':'+scope.date.eventEndDate.getMinutes()+'0';
						            		
						            	}else{
						            		scope.first.endtime=scope.date.eventEndDate.getHours()+':'+scope.date.eventEndDate.getMinutes();
						            	}
						      
						            }
						            var eventValidity = dateFilter(data.eventValidity,'dd MMMM yyyy');
						            scope.date.eventValidity = new Date(eventValidity );
							});
							
							$('#timepicker1').timepicker({
					        	showInputs:false,
					        	showMeridian:false
					        });
							$('#timepicker2').timepicker({
					        	showInputs:false,
					        	showMeridian:false
					        });
							

							scope.restrict = function() {								
								for ( var i in this.allowed) {		
									 //alert('var i in this.allowed in restrick'+this.allowed[i]));
									for ( var j in scope.availableServices) {	
										// alert('var j scope.availableServices'+scope.availableServices[j].mediaId);
										if (scope.availableServices[j].mediaId == this.allowed[i]) {	
											
											var temp = {};
											temp.mediaId = this.allowed[i];
											temp.mediaTitle = scope.availableServices[j].mediaTitle;								
											scope.selectedServices.push(temp);
											scope.availableServices.splice(j, 1);
										}
									}
								}
							};
							scope.allow = function() {
								for ( var i in this.restricted) {
									 
									for ( var j in scope.selectedServices) {
										 
										if (scope.selectedServices[j].mediaId == this.restricted[i]) {
											
											var temp = {};
											temp.mediaId = this.restricted[i];
											temp.mediaTitle = scope.selectedServices[j].mediaTitle;									
											scope.availableServices.push(temp);
											scope.selectedServices.splice(j, 1);
										}
									}
								}
							};

							 
							scope.submit = function() {
								
								this.formData.locale = scope.optlang.code;
								this.formData.dateFormat = 'dd MMMM yyyy';
								
								scope.first.time=$('#timepicker1').val();
								scope.first.endtime=$('#timepicker2').val();
								
								this.formData.status=this.formData.statusId;
								
								var reqDate = dateFilter(scope.date.startDate,'dd MMMM yyyy');
								var reqEndDate = dateFilter(scope.date.eventEndDate,'dd MMMM yyyy');
								this.formData.eventValidity = dateFilter(scope.date.eventValidity,'dd MMMM yyyy');
								
								/*this.formData.eventStartDate = dateFilter(scope.date.startDate,'dd MMMM yyyy');
								this.formData.eventEndDate = dateFilter(scope.date.endDate,'dd MMMM yyyy');*/
								
								this.formData.eventStartDate =reqDate+" "+scope.first.starttime+':00';
								this.formData.eventEndDate = reqEndDate+" "+scope.first.endtime+':00';
								
								
								delete this.formData.id;
								delete this.formData.statusData;
								delete this.formData.chargeData;
								delete this.formData.mediaAsset;
								delete this.formData.optType;
								delete this.formData.selectedMedia;
								delete this.formData.statusId;
								delete this.formData.eventCategeorydata;
								
								if(scope.first.time ==''){
									this.formData.eventStartDate = reqDate;
								}

								if(scope.first.endtime ==''){
									this.formData.eventEndDate = reqEndDate;
								}
								
								var temp = [];
								for ( var i in scope.selectedServices) {
									temp[i] = scope.selectedServices[i].mediaId;
								}
								this.formData.mediaData = temp;
								resourceFactory.eventEditResource.update({eventId: routeParams.id},
										this.formData, function(data) {
											location.path('/viewEvent/'
													+ data.resourceId);
										});
							};
						}
					});
	mifosX.ng.application.controller('EditEventController', ['$scope', '$routeParams', 'ResourceFactory','dateFilter', '$location','$rootScope', mifosX.controllers.EditEventController]).run(function($log) {
	    $log.info("EditEventController initialized");
	  });
	
}(mifosX.controllers || {}));