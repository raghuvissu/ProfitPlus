(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateTicketController: function(scope,webStorage, resourceFactory, location, translate,dateFilter,routeParams,$rootScope,http,API_VERSION,Upload) {
           
		  var locationOrigin = window.location.origin;
      	var locationPathname = window.location.pathname;
      	
      	    scope.subCategory = [];
			scope.priorityTypes = [];
			scope.formData={};						
			scope.problemsDatas = [];
			scope.usersDatas=[];
			scope.sourceData=[];
			 scope.start = {};
			 //the datetime date is only for display
			 scope.dateTime = new Date().toString().replace("GMT+0530 (IST)","").trim();
			 //the start.date saves the date in NBG db 
			 scope.start.date = new Date();
			 scope.minDate= scope.start.date;
			 
			 scope.first = {};
			 //scope.first.date = new Date();
		     //scope.first.time = "10:10";
		     
			 $('#timepicker1').timepicker({
		        	showInputs:false,
		        	showMeridian:false
		        });
			 
			 scope.clientId=routeParams.id;
			 scope.walletConfig = webStorage.get('is-wallet-enable');
			 var clientData = webStorage.get('clientData');
			    scope.displayName=clientData.displayName;
			    scope.hwSerialNumber=clientData.hwSerialNumber;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.currency=clientData.currency;
			    scope.imagePresent=clientData.imagePresent;
			    scope.categoryType=clientData.categoryType;
		        scope.email=clientData.email;
		        scope.phone=clientData.phone;
		        if(scope.imagePresent){
		        scope.image=clientData.image;
		        }
		        
		        var sessionData=webStorage.get('sessionData');
		        scope.formData.assignedTo=sessionData.userId;
		       
            resourceFactory.ticketResourceTemplate.get(function(data){ 
            	
              scope.date = data.ticketDate;
              scope.priorityTypes=data.priorityType;
              for(var i=0;i<scope.priorityTypes.length;i++){
            	  
              	if(scope.priorityTypes[i].value=='LOW'){
              		scope.formData.priority=scope.priorityTypes[i].value;
              	}
              }
              scope.subCategory = data.subCategory;
              scope.problemsDatas=data.problemsDatas;
              scope.usersDatas=data.usersData;
              scope.sourceData=data.sourceData;
              for(var i=0;i<scope.sourceData.length;i++){
            	  
                	if(scope.sourceData[i].mCodeValue=='Phone'){
                		scope.formData.sourceOfTicket=scope.sourceData[i].mCodeValue;
                	}
                }
             
            });
            
            
            
        
            scope.getSubCategory=function(query) {
            	console.log(query);
            	return http.get($rootScope.hostUrl+API_VERSION+'/tickets/subcategory',{
            		params:{
            			category:query
            		}
            	}).then(function(result){
            		
            		scope.subCategory = [];
            	
                    for(var i in result.data.subCategory){
                    	console.log(result.data.subCategory[i]);
                        scope.subCategory.push(result.data.subCategory[i]);
                      
                     }

            		return scope.subCategory;
            	});
            };
           
            
         
            
            
            
            scope.reset123 = function(){
         	   webStorage.add("callingTab", {someString: "Tickets" });
         	   delete scope.first.time;
            };
            
            scope.onFileSelect = function($files) {
		        scope.file = $files[0];
		      };
           
			scope.submit = function() { 
				scope.first.time=$('#timepicker1').val();
				var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
				if(scope.first.date==null||scope.first.time==''){
					delete scope.formData.dueTime;
				}else{
					scope.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
				}
				scope.formData.dateFormat = 'dd MMMM yyyy';
				scope.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId;
				scope.formData.ticketTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
                	scope.ticketdata = {};
					scope.ticketdata.assignedTo=scope.formData.assignedTo;
					scope.ticketdata.comments=scope.formData.comments;
					scope.ticketdata.status=scope.formData.status;
					scope.ticketdata.priority = scope.formData.priority;
					scope.ticketdata.problemCode = scope.formData.problemCode;
					scope.ticketdata.subCategory = scope.formData.subCategory;
					scope.ticketdata.description=scope.formData.description;
					scope.ticketdata.dateFormat = scope.formData.dateFormat;
					if(scope.formData.dueTime) scope.ticketdata.dueTime = scope.formData.dueTime;
					scope.ticketdata.locale = scope.optlang.code;
					scope.ticketdata.priority = scope.formData.priority;
					scope.ticketdata.sourceOfTicket = scope.formData.sourceOfTicket;
					scope.ticketdata.ticketDate = dateFilter(scope.start.date,'dd MMMM yyyy');
					scope.ticketdata.ticketTime = scope.formData.ticketTime;
					scope.ticketdata.ticketURL = scope.formData.ticketURL;
					
					
					Upload.upload({
						  url: $rootScope.hostUrl+ API_VERSION +'/tickets/'+scope.clientId, 
				          data: scope.ticketdata,
				          file: scope.file
				        }).then(function(data) {
				        	if (!scope.$$phase) {
				                scope.$apply();
				              }
				        	location.path('/assignedtickets');
				        });	
         };
    }
  });
  mifosX.ng.application.controller('CreateTicketController', ['$scope', 'webStorage','ResourceFactory', '$location', '$translate','dateFilter', 
                                                              	'$routeParams','$rootScope','$http','API_VERSION','Upload', mifosX.controllers.CreateTicketController]).run(function($log) {
    $log.info("CreateTicketController initialized");
  });
}(mifosX.controllers || {}));
