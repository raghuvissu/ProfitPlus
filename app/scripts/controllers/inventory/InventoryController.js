(function(module) {
  mifosX.controllers = _.extend(module, {
    InventoryController: function(scope,webStorage, routeParams, location,$uibModal, resourceFactory, paginatorService,PermissionService,route,$rootScope,dateFilter) {
        
    	scope.items = [];
        scope.grn = [];
        scope.itemdetails = [];
        scope.mrn = [];
        scope.itemhistory = [];
        scope.supplier = [];
        scope.modelProvisionDatas = [];
        scope.call={status:""}; 
        scope.source = 'ALL';
        scope.officeDatas = [];
        scope.itemMasterDatas = [];
        
        var callingTab = webStorage.get('callingTab',null);
        if(callingTab === null){
        	callingTab="";
        }else{
		  scope.displayTab=callingTab.someString;
		  if( scope.displayTab == "items"){
			  scope.itemsTab = true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "itemDetails"){
			  scope.itemDetailsTab =  true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "supplier"){
			  scope.supplierTab =  true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "grn"){
			  scope.grnTab = true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "mrn"){
			  scope.mrnTab =  true;
			  webStorage.remove('callingTab');
		  }else
		  {
			  webStorage.remove('callingTab');
		  }
        }
        
        scope.routeTo = function(id){
        	if(id !== 0 && id!=undefined && id!=null){
        		location.path('/viewclient/account_no/'+id);
        	}else{}
        };
        
        scope.routeTogrn = function(id){
            location.path('/viewgrn/'+ parseInt(id));
        };
        
        scope.routeTomrn = function(id){
       	 	id=id.replace(/[{()}]/g,'');
       	 	scope.val = id.split(" ");
       	 	if(angular.uppercase(scope.val[0]) == 'MRN'){
       	 		location.path('/viewmrn/'+ scope.val[1]+'/mrn');
       	 	}else{
       	 		location.path('/viewmrn/'+ scope.val[2]+'/sales');
       	 	}
        };
        
        scope.routeToitem = function(id,totalItem){
            location.path('/viewitem/'+ parseInt(id)+'/item/'+totalItem);
        };
        
        
    	scope.itemDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
        
    	scope.getItemdetail = function () {
    		scope.itemdetails = paginatorService.paginate(scope.itemDetailsFetchFunction, 14);
    		resourceFactory.itemDetailTemplateDropdownResource.get({} , function(data) {
    			scope.officeDatas = data.officeData;
    			scope.itemMasterDatas = data.itemMasterData;
    			
    	           
            });
    		
    	};
    	
    	if($rootScope.hasPermission('LIST_ITEMDETAILS')){
    		scope.getItemdetails = function () {
    		  scope.itemdetails = paginatorService.paginate(scope.itemDetailsFetchFunction, 14);
    		};
    		resourceFactory.itemDetailTemplateDropdownResource.get({} , function(data) {
      			scope.officeDatas = data.officeData;
      			scope.itemMasterDatas = data.itemMasterData;
      			
      	           
           });
    	};
    	
    
		scope.getItemdetail();
		scope.searchItemDetails123 = function(offset, limit, callback) {
			resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
		};
	  		
  		scope.searchItemDetails = function(filterText) {
  			scope.filterText = filterText;
  			scope.itemdetails = paginatorService.paginate(scope.searchItemDetails123, 14);
  		};
  		
  		
  		scope.searchStatusDetails = function(offset, limit, callback) {
      	  if(scope.source == 'ALL')
	    	  resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit,officeName : scope.officeName,itemCode : scope.itemCode} , callback);
      	  else
      		  resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit , 
		    		  sqlSearch: scope.source ,officeName : scope.officeName,itemCode : scope.itemCode} , callback);
	    };
	  		
	    scope.searchSource = function(source) {
	    	scope.source = source;
	    	scope.itemdetails = paginatorService.paginate(scope.searchStatusDetails, 14);
	    };
	  
		 scope.getGRNdetails = function () {
			scope.grn = paginatorService.paginate(scope.grnDetailsFetchFunction, 14);
		};
 
        scope.grnDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.grnResource.get({offset: offset, limit: limit} , callback);
		};
        
		scope.getMRNdetails = function () {
        	scope.mrn = paginatorService.paginate(scope.mrnDetailsFetchFunction, 14);
        };
	
        scope.mrnDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.viewMrnResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
		

		scope.searchMRN = function(filterText) {
  			scope.mrn = paginatorService.paginate(scope.searchMRN123, 14);
  		};
  		
  		scope.searchMRN123 = function(offset, limit, callback) {
  			resourceFactory.viewMrnResource.getAlldetails({offset: offset, limit: limit, sqlSearch:  scope.filterText } , callback); 
	    };
	    
	    scope.getItems = function(){
			scope.items = paginatorService.paginate(scope.itemFetchFunction, 14);
		};
	    
		scope.itemFetchFunction = function(offset, limit, callback) {
			resourceFactory.itemResource.get({offset: offset, limit: limit} , callback);
		};
		
		scope.showAudit = function(id,itotalItems){
			location.path('/viewitem/'+id+'/audit/'+itotalItems);
		};
		
		scope.getsupplierdetails = function () {
			scope.supplier = paginatorService.paginate(scope.supplierFetchFunction, 14);          
        };
		
        scope.supplierFetchFunction = function(offset, limit, callback) {
			resourceFactory.supplierResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
		
		scope.searchSupplier123 = function(offset, limit, callback) {
			resourceFactory.supplierResource.getAlldetails({offset: offset, limit: limit, sqlSearch:  scope.filterText } , callback); 
	    };
	  		
  		scope.searchSupplier = function(filterText) {
  			scope.supplier = paginatorService.paginate(scope.searchSupplier123, 14);
  		};
  		
  		scope.editSupplier= function(id){
	      	  scope.errorStatus=[];
	      	  scope.errorDetails=[];
	      	  scope.supplierId=id;
	        	  $uibModal.open({
	                templateUrl: 'editsuppliers.html',
	                controller:editSupplierController ,
	                resolve:{}
	            });
	    };
	    
	    var editSupplierController=function($scope,$uibModalInstance){
        	$scope.formData = {}; 
            $scope.statusData=[];
            resourceFactory.supplierResource.get({'id': scope.supplierId},function(data) {
                $scope.formData= data[0];
            });
         	$scope.accept = function(){
         		$scope.flag=true;
         		delete $scope.formData.id;
         		resourceFactory.supplierResource.update({'id': scope.supplierId},$scope.formData,function(data){ 
                  route.reload();
                  webStorage.add("callingTab", {someString: "supplier" });
                  $uibModalInstance.close('delete');
                 },function(errData){
                	 $scope.flag = false;
                 });
         	};  
    		$scope.reject = function(){
    			$uibModalInstance.dismiss('cancel');
    		};
        };
        
	    scope.editProvSerial= function(itemId,valueQuality,provisionalserialNum,itemModel){
            scope.itemid=itemId;
            scope.valueQuality=valueQuality;
            scope.provisionalserialNum=provisionalserialNum;
            scope.itemModel=itemModel;
            console.log(scope.valueQuality);
            console.log(scope.itemModel);
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $uibModal.open({
                  templateUrl: 'EditProvSerial.html',
                  controller: EditQualityController,
                  resolve:{}
              });
         };
        
        scope.editQuality = function(itemId,valueQuality,provisionalserialNum,serialNumber,itemModel){
            scope.itemid=itemId;
            scope.valueQuality=valueQuality;
            scope.provisionalserialNum=provisionalserialNum;
            scope.serialNumber=serialNumber;
            scope.itemModel=itemModel;
            console.log(scope.valueQuality);
            console.log(scope.itemModel);
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $uibModal.open({
                  templateUrl: 'EditQuality.html',
                  controller: EditQualityController,
                  resolve:{}
              });
        };
        
        scope.itemHistoryPopup = function(serialNumber){
   		   scope.serialNumber = serialNumber;
              $uibModal.open({
                  templateUrl: 'itemhistory.html',
                  controller: ItemhistoryController,
                  resolve:{}
            });
      	};
      	
      	scope.deleteItemDetail = function(id){
        	scope.itemDetailId=id;
            $uibModal.open({
                templateUrl: 'approvedelete.html',
                controller: approveToDelete,
                resolve:{}
            });
    	};
    	
    	scope.editGrnQuantity = function(grn){
    	   $uibModal.open({
                  templateUrl: 'EditGRNQuality.html',
                  controller: EditGRNQualityController,
                  resolve:{
                	  grndata:function(){
                		  return grn;
                		 }
    	   
                  }
              });
	    };
        
	    var EditGRNQualityController = function ($scope, $uibModalInstance,grndata) {
	    	   $scope.formData = {};
	    	   var purchaseDate = dateFilter(grndata.purchaseDate,'dd MMMM yyyy');
		       $scope.formData.purchaseDate = new Date(purchaseDate);
		       var reqDate = dateFilter($scope.formData.purchaseDate,'dd MMMM yyyy');
		       $scope.formData.purchaseDate = reqDate;
	    	   $scope.formData.orderdQuantity = grndata.orderdQuantity;
	    	   $scope.formData.locale = scope.optlang.code;
	    	   $scope.formData.dateFormat = 'dd MMMM yyyy';
	    	   $scope.formData.purchaseNo=grndata.purchaseNo;
	    	   $scope.formData.supplierId=grndata.supplierId;
	    	   $scope.formData.officeId=grndata.officeId;
	    	   $scope.formData.itemMasterId=grndata.itemMasterId;
	    	   $scope.approvQuantity = function(){
	    		   resourceFactory.grnResource.update({grnId:grndata.id},$scope.formData,function(data){
	    			   $uibModalInstance.close('delete');
	    			   location.path("/inventory/");
	    			   webStorage.add("callingTab", {someString: "grn" });
	             	});
	    	   }
	    	   $scope.cancelQuantity = function () {
	    		   $uibModalInstance.dismiss('cancel');
	    	   };
	       };
	    
        var EditQualityController = function ($scope, $uibModalInstance) {
          	resourceFactory.itemDetailTemplateResource.get(function(data) {
          		 $scope.modelProvisionMappingData = angular.copy(data.modelProvisionMappingData);
                 for(var i in $scope.modelProvisionMappingData){
               	  if(scope.itemModel == $scope.modelProvisionMappingData[i].model){
               		  $scope.itemModel = $scope.modelProvisionMappingData[i].id;break;
               	  }
                 }  
          		$scope.qualityDatas = data.qualityDatas;
                  $scope.quality=scope.valueQuality;
                  $scope.provserialnum=scope.provisionalserialNum;
                  $scope.serialNumber= scope.serialNumber;
                 
                  
                  console.log($scope.itemModel);
              });
        	  $scope.approveQuality = function (value,provserialnum,itemModel,serialNumber) {
        		//  alert(value);
        		  $scope.flagEditQuality=true;
        		  //if(this.formData == undefined || this.formData == null){
        			  this.formData = {"quality":value,"itemModel":itemModel};
        			  this.formData = {"quality":value,"provisioningSerialNumber":provserialnum,"serialNumber":serialNumber,"itemModel":itemModel};
        		  //}
        		  resourceFactory.itemDetailsResource.update({'itemId': scope.itemid},this.formData,function(data){
        	          $uibModalInstance.close('delete');
        	          location.path("/viewitemdetails/"+data.resourceId);
        	        },function(errData){
		        		$scope.flagEditQuality = false;
		          });
              };
              $scope.cancelQuality = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          };
          
          var ItemhistoryController=function($scope,$uibModalInstance){
	    		$scope.searchHistory123 = function(offset, limit, callback) {
			    	  resourceFactory.itemhistoryResource.getAlldetails({offset: offset, limit: limit , 
			    		  sqlSearch:  scope.serialNumber } , callback); 
			     };
			  		
			     $scope.itemhistory = paginatorService.paginate($scope.searchHistory123, 14);
			     
	    		$scope.accept = function(){
	    			$uibModalInstance.close('delete');
	    		};
	        };
	        
	    	var approveToDelete = function ($scope, $uibModalInstance) {
	            $scope.approveToDelete = function () {
	               resourceFactory.itemDetailsforDeleteResource.delete({'itemId':scope.itemDetailId},{},function(data){ 
	            	  route.reload();
	            	 webStorage.add("callingTab", {someString: "itemDetails"});

	            });
	                $uibModalInstance.close('delete');
	            };
	            $scope.cancelItem = function () {
	                $uibModalInstance.dismiss('cancel');
	            };
	        };
	        
	        scope.modelProvisionFetchFunction = function(offset, limit, callback) {
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
	      			    location.path('/inventory');
	      			    webStorage.add("callingTab", {someString: "modelProvisionTab" });
	      			    route.reload();
	            });
	              	 $uibModalInstance.dismiss('delete');
	           };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	           };
	       } 
          
						        
       }
  });
  mifosX.ng.application.controller('InventoryController', ['$scope','webStorage', '$routeParams', '$location','$uibModal', 'ResourceFactory','PaginatorService','PermissionService','$route','$rootScope', 'dateFilter',mifosX.controllers.InventoryController]).run(function($log) {
    $log.info("InventoryController initialized");
  });
}(mifosX.controllers || {}));


	
