(function(module) {
  mifosX.controllers = _.extend(module, {
	  MappingController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService,PermissionService,$uibModal,route,$rootScope) {

		  	scope.servicemappingdatas = [];
	        scope.hardwaremappingdatas= [];
	        scope.provisiongsystemData= [];
	        scope.selectedCurrOptions = [];
	        scope.allCurrOptions = [];
	        scope.currentPage = 1;
	        scope.numPerPage = 15;
	        scope.formData = {};
	        scope.hideview = false;
	        scope.selected = undefined;
	        scope.PermissionService = PermissionService;
	        scope.planmappingdatas = [];
	        scope.pageItems = [];
	       // scope.currencyOptions = [];
	       // scope.selectedCurrencyOptions = [];
	       // scope.currencies [];
	       // scope.modelProvisionDatas = [];
	        
	        //scope.configIPTV = webStorage.get("client_configuration").IPTV;
	        
	        /*var callingTab = webStorage.get('callingTab',null);
	        if(callingTab == null){
	        	callingTab="";
	        }else{
			  scope.displayTab=callingTab.someString;
			 
	         if( scope.displayTab === "planMappingTab"){
				  
				  scope.planMappingTab =  true;
				  webStorage.remove('callingTab');
				  
			}else if( scope.displayTab === "hardwarePlanMapping"){
				  
				  scope.hardwarePlanMappingTab =  true;
				  webStorage.remove('callingTab');
				  
		    }else if( scope.displayTab === "provisioningCommandTab"){
				  
				  scope.provisioningCommandTab =  true;
				  webStorage.remove('callingTab');
				  
		   }else if( scope.displayTab === "eventActionTab"){
				  
				  scope.eventActionTab =  true;
				  webStorage.remove('callingTab');
				  
	       }else if( scope.displayTab === "currencyConfigTab"){
				  
				  scope.currencyConfigTab =  true;
				  webStorage.remove('callingTab');
				  
	        }else if( scope.displayTab === "eventValidationTab"){
				  
				  scope.eventValidationTab =  true;
				  webStorage.remove('callingTab');
	      }else if( scope.displayTab === "modelProvisionTab"){
	        	  scope.modelProvisionTab =  true;
		          webStorage.remove('callingTab');
          }else{
				  webStorage.remove('callingTab');
			   }
	        }*/
	        
	       
	        /*service mapping data*/
	        scope.serviceMapFetchFunction = function(offset, limit, callback) {
	        	resourceFactory.mappingResource.get({offset: offset, limit: limit} , function(data){
	        		scope.totalServices = data.totalFilteredRecords;
	        		
	        		if(scope.totalServices%scope.numPerPage == 0)	
	            		scope.totalPages = scope.totalServices/scope.numPerPage;
	            	else
	            		scope.totalPages = Math.floor(scope.totalServices/scope.numPerPage)+1;
	        		
	        		
	        		callback(data);
	        	});
	        	
	        	
			};
	        scope.getServiceMappingDetails = function(){
	        	scope.servicemappingdatas = paginatorService.paginate(scope.serviceMapFetchFunction, scope.numPerPage-1);
	            };
	       
	        scope.pageChanged = function(pageNo){
	        	
	        	if(scope.totalPages >= pageNo){
	        		scope.servicemappingdatas.nextOrPrevoius(pageNo, scope.numPerPage);
	        	}
	        	
	        };
	        scope.setPage = function (pageNo) {
	        	if(scope.totalPages >= pageNo){
	        		scope.servicemappingdatas.nextOrPrevoius(pageNo, scope.numPerPage);
	        	}
	            scope.currentPage = pageNo;
	        };
	        /*plan mapping data*/
	        scope.getplanMappingdetails = function(){
	        	
	        	resourceFactory.planMappingResource.get(function(data) {
	           	 scope.planmappingdatas=data; 
	           });
	        };
	     
	       /* hardware planmapping  data*/
	        
	        	resourceFactory.hardwareMappingResource.query(function(data) {
	           	 scope.hardwaremappingdatas=data; 
	           });
	      
	        
	        /* provisionCommand  data*/
	        scope.getProvisiongCommandData=function(){
	         	 
	         	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
	             	 scope.provisiongsystemData=data; 
	             });
	         };
	         
	         scope.deleteProvisioning = function (id){
	         	scope.provisionId=id;
	          	 $uibModal.open({
	  	                templateUrl: 'provision.html',
	  	                controller: approve,
	  	                resolve:{}
	  	        });
	          };
	          
	      	function  approve($scope, $uibModalInstance) {
	      		$scope.approve = function () {
	      			 resourceFactory.provisioningMappingResource.remove({provisioningId: scope.provisionId} , {} , function() {
	      			    location.path('/mappingconfig');
	      			  scope.getProvisiongCommandData();
	              });
	              	 $uibModalInstance.dismiss('delete');
	           };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	            };
	          }
	      	
	      	/*NEW Currency data*/
	      	scope.getCurrencyConfig = function () {
	        	scope.currencies = paginatorService.paginate(scope.currencyFetchFunction, 14);
	        };
	        
	        scope.currencyFetchFunction = function(offset, limit, callback) {
				resourceFactory.currencyConfigAllResource.get({offset: offset, limit: limit} , callback);
			};
	      	
	      	
	      	
				
				
		        
	      	/* eventAction  data*/
	      /* scope.getEventActionMappingData=function(){
	        	
	        	resourceFactory.EventActionMappingResource.query(function(data) {
	           	 scope.datas=data; 
	           });
	         };
	         
	         scope.isDeletedEventAction=function(id,value){
	       	  
	       	     resourceFactory.EventActionMappingResource.remove({id: id} , {} , function() {
	                    location.path('/mappingconfig');
	                    scope.getEventActionMappingData();
	           });
	         };
	      	*/
	      	
	         /* currencyconfig  data*/
	        /* scope.getCurrencyConfig=function(){
	         	
	        	 resourceFactory.currencyConfigResource.get(function(data){
	                 scope.selectedCurrOptions = data.selectedCurrencyOptions;
	                 scope.allCurrOptions = data.currencyOptions;
	             });
	          };*/	
	      	
	        
	        scope.submit = function () {
	            var currencies = [];
	            var curr = {};
	            for(var i=0; i < scope.selectedCurrOptions.length; i++){
	                currencies.push(scope.selectedCurrOptions[i].code);
	            }
	            curr['currencies'] = currencies;
	            resourceFactory.currencyConfigResource.upd(curr , function(){
	                route.reload();
	            });

	    };

	    scope.cancel = function() {
	      route.reload();
	    };
	        scope.deleteCur =  function (code){
	            for(var i=0; i<scope.selectedCurrOptions.length; i++){
	                if(scope.selectedCurrOptions[i].code === code){
	                  scope.selectedCurrOptions.splice(i, 1);  //removes 1 element at position i 
	                  break;
	                }
	            }
	      };
	      
	      scope.addCur = function (){
	          if(scope.selected != undefined && scope.selected.hasOwnProperty('code')) {
	            scope.selectedCurrOptions.push(scope.selected);
	              for(var i=0; i<scope.allCurrOptions.length; i++){
	                  if(scope.allCurrOptions[i].code === scope.selected.code){
	                    scope.allCurrOptions.splice(i, 1);  //removes 1 element at position i 
	                    break;
	                  }
	              }
	          }
	          scope.selected = undefined;
	        };
	        
		 
	        /*event validation*/
	        scope.getEventValidationData=function(){
	        	
	        	resourceFactory.EventValidationResource.get(function(data) {
	           	 scope.eventValidationDatas=data; 
	           });
	        };
	        
	        scope.getProvisioningActionData =function(){
	        	resourceFactory.provisionactionsResource.get(function(data) {
	              	 scope.provisionactionDatas=data; 
	              });
	        }
	          
	          scope.isDeletedForValidation=function(id,value){
	        	  if(value == 'N'){
	        		  scope.formData.status='true';  
	        	  }else{
	        		  scope.formData.status='false';
	        	  }
	        	   resourceFactory.provisionactionsResource.update({'id':id},scope.formData,function(data){
	        		   location.path('/mappingconfig');
	              	 scope.getProvisioningActionData();
	               });
	        	 
	          };
	          
	          /*route to different view locations */         
	          scope.routeToservice = function(id){
	        		location.path('/viewServiceMapping/'+ id);
	            };
	          scope.routeToplanmapping = function(id){
	                location.path('/viewplanmapping/'+ id);
	           };
	          scope.routeTohardware = function(id){
	             location.path('/viewhardwareplanmapping/'+ id);
	          };
	          scope.routeToprovisioning = function(id){
	              location.path('/viewprovisioningmapping/'+ id);
	          };
	          scope.routeTocurrency = function(id){
	              location.path('/viewcurrency/'+ id);
	          };
	          
	          // popup for sortBy
	          scope.editSortservice = function (serviceId){
			    	 scope.serviceId = serviceId;
			     	 $uibModal.open({
						 templateUrl: 'sortby.html',
						 controller: editSortByController,
						 resolve:{}
					 });
			   }; 
			       
			   function editSortByController($scope, $uibModalInstance) {
				   $scope.formData = {};
				   $scope.formData.sortBy = "";
			     	  $scope.approveDeleteService = function () {
			     		  this.formData.locale = $rootScope.locale.code;
			     		  resourceFactory.serviceMappingResource.update({'serviceMappingId': scope.serviceId}, $scope.formData, function() {
			     			  $uibModalInstance.close('delete');
		        			  route.reload();
			             });
			     		
			           };
			           $scope.cancel = function () {
			               $uibModalInstance.dismiss('cancel');
			           };
			   };
			   
			  /* scope.modelProvisionFetchFunction = function(offset, limit, callback) {
					resourceFactory.modelProvisionMappingResource.get({ offset : offset, limit : limit }, function(data){
					scope.totalpropeties = data.totalFilteredRecords;
		        	scope.allDatas = data.pageItems;
		        	if(scope.totalpropeties%15 == 0)	
		        		scope.totalPages = scope.totalpropeties/15;
		        	else
		        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
		        	callback(data);
					});
			  };
				
			  scope.getModelProvisionData = function(){
				scope.modelProvisionDatas = paginatorService.paginate( scope.modelProvisionFetchFunction, 14);
			  };
			  
			  scope.deleteModelProvisionMapping = function(id){
				   scope.modelProvisionMappingId=id;
		          	 $uibModal.open({
		  	                templateUrl: 'deleteModelProvisionMapping.html',
		  	                controller: deleteModelProvisionMappingCtrl,
		  	                resolve:{}
		  	        });
			  };
			  
			  function  deleteModelProvisionMappingCtrl($scope, $uibModalInstance) {
		      		$scope.approve = function () {
		      			 resourceFactory.modelProvisionMappingResource.remove({modelProvisionMappingId: scope.modelProvisionMappingId} , {} , function() {
		      			    location.path('/mappingconfig');
		      			    webStorage.add("callingTab", {someString: "modelProvisionTab" });
		      			    route.reload();
		            });
		              	 $uibModalInstance.dismiss('delete');
		           };
		              $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		           };
		       } */
		  
		  
	      }
   });
  mifosX.ng.application.controller('MappingController', [
     '$scope',
     'webStorage', 
     '$routeParams', 
     '$location', 
     'ResourceFactory',
     'PaginatorService',
     'PermissionService', 
     '$uibModal',
     '$route',
     '$rootScope',
  mifosX.controllers.MappingController ]).run(function($log) {
     $log.info("MappingController initialized");
  });
}(mifosX.controllers || {}));