(function(module) {
	mifosX.controllers = _.extend(module,{
		EditTicketController : function(scope,webStorage,routeParams,resourceFactory, location, http,API_VERSION,$rootScope,Upload) {
							scope.formData = {};	
							scope.data={};
							var locationOrigin = window.location.origin;
				        	var locationPathname = window.location.pathname;
							var clientData = webStorage.get('clientData');
						    scope.displayName=clientData.displayName;
						    scope.statusActive=clientData.statusActive;
						    scope.hwSerialNumber=clientData.hwSerialNumber;
						    scope.accountNo=clientData.accountNo;
						    scope.officeName=clientData.officeName;
						    scope.balanceAmount=clientData.balanceAmount;
						    scope.currency=clientData.currency;
						    scope.imagePresent=clientData.imagePresent;
						    scope.categoryType=clientData.categoryType;
					        scope.email=clientData.email;
					        scope.phone=clientData.phone;
							resourceFactory.editTicketResource.get({clientId: routeParams.clientId, id: routeParams.id} , function(data) {	
                                scope.formData=data;                            
								scope.statusTypes = data.statusType;
								if(data.statusCode){
									scope.formData.status = data.statusCode;
								}else{
									
									for(var i = 0; i < scope.statusTypes.length; i++){
					                	if(scope.statusTypes[i].mCodeValue == 'Working'){
					                		scope.formData.status = scope.statusTypes[i].mCodeValue;
					                	}
					              }
								}
								 
								scope.problemsDatas = data.problemsDatas;
								scope.priorityTypes = data.priorityType;
								scope.usersData = data.usersData;
								//scope.formData.status=14;
								scope.clientId=routeParams.clientId;
								scope.ticketId=routeParams.id;
							});		
							
							scope.reset123 = function(){
						     	   webStorage.add("callingTab", {someString: "Tickets" });
						        };
							scope.onFileSelect = function($files) {
							        scope.file = $files[0];
							      };
							      
							scope.submit = function() {
								this.data.assignedTo=this.formData.userId;
								this.data.comments=this.formData.comments;
								this.data.status=this.formData.status;
								console.log("hello "+this.data.status);
								this.data.priority = this.formData.priority;
								this.data.problemCode = this.formData.problemCode;
								this.data.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId+"/";
								Upload.upload({
						          url: $rootScope.hostUrl+ API_VERSION +'/clients/'+routeParams.clientId+'/documents/'+routeParams.id+'/attachment', 
						          data: scope.data,
						          file: scope.file
						        }).then(function(data) {
						        	if (!scope.$$phase) {
						                scope.$apply();
						              }
						        	location.path('/viewclient/'
											+ routeParams.clientId);
						        });	
						        scope.reset123();
							};
						}
					});
	mifosX.ng.application.controller('EditTicketController', ['$scope','webStorage' ,'$routeParams', 'ResourceFactory', '$location', '$http','API_VERSION','$rootScope','Upload', mifosX.controllers.EditTicketController]).run(function($log) {
	    $log.info("EditTicketController initialized");
	  });
	
}(mifosX.controllers || {}));