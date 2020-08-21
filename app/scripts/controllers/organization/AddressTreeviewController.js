(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddressTreeviewController: function(scope, resourceFactory,$uibModal,route,PermissionService) {
     
      var idToNodeMap = {};

       scope.PermissionService = PermissionService;
        var str = "new";

        
        scope.elementSelect = function(id,nodeName,nodeCode){
        	scope.nodeId = id;
        	scope.nodeName = nodeName;
        	scope.nodeCode = nodeCode;
        	scope.elementId = id.split("-");
        };
        scope.addCountry = function(){
        	
      	  $uibModal.open({
                templateUrl : 'addCountry.html',
                controller : addCountryController,
                resolve : {}
            });
        };
        scope.editCountry = function(){
        	
        	  $uibModal.open({
                  templateUrl: 'editCountry.html',
                  controller: editCountryController,
                  resolve:{}
              });
          };
          scope.deleteCountry = function(){
        	  var stateCount = 0;
        	  for (var i in scope.stateObject){
        		  if(scope.nodeId == scope.stateObject[i].parentId){
        			  stateCount++;
        			  break;
        		  }
        	 	}
        		 if(stateCount)
        			 $uibModal.open({
        				 templateUrl: 'countryAlert.html',
        				 controller: countryAlertController,
        				 resolve:{}
        			 });
        		 else
        			 $uibModal.open({
        				 templateUrl: 'deleteCountry.html',
        				 controller: deleteCountryController,
        				 resolve:{}
        			 });
        	
          };
        scope.addState = function(){
        	  $uibModal.open({
                  templateUrl: 'addState.html',
                  controller: addStateController,
                  resolve:{}
              });
          };
          scope.editState = function(){
          	
        	  $uibModal.open({
                  templateUrl: 'editState.html',
                  controller: editStateController,
                  resolve:{}
              });
          };
          scope.deleteState = function(){
            	
        	  var cityCount = 0;
        	  for (var i in scope.cityObject){
        		  if(scope.nodeId == scope.cityObject[i].parentId){
        			  cityCount++;
        			  break;
        		  }
        	 	}
        	  if(cityCount)
        		  $uibModal.open({
        			  templateUrl: 'stateAlert.html',
        			  controller: stateAlertController,
        			  resolve:{}
        		  });
        	  else
        		  $uibModal.open({
        			  templateUrl: 'deleteState.html',
        			  controller: deleteStateController,
        			  resolve:{}
        		  });
          };
          scope.addCity = function(){
        	  $uibModal.open({
                  templateUrl: 'addCity.html',
                  controller: addCityController,
                  resolve:{}
              });
          };
          scope.editCity = function(){
            	
        	  $uibModal.open({
                  templateUrl: 'editCity.html',
                  controller: editCityController,
                  resolve:{}
              });
          };
          scope.deleteCity = function(){
          	
        	  $uibModal.open({
                  templateUrl: 'deleteCity.html',
                  controller: deleteCityController,
                  resolve:{}
              });
          };
          
          
          var addCountryController = function ($scope, $uibModalInstance) {
        	  	$scope.formData = {};
        	  $scope.submit = function () {
        		  
        		  resourceFactory.addCountryResource.get($scope.formData,function(data){
        			  $uibModalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          };
          var editCountryController = function ($scope, $uibModalInstance) {
        	  		
        	  		$scope.formData={};
        	  		$scope.formData.entityCode = scope.nodeCode;
	 				$scope.formData.entityName = scope.nodeName;
        	  $scope.submit = function () {
        		  	
        		  var countryId=scope.elementId[1];
        		  resourceFactory.editCountryResource.update({id:countryId},$scope.formData,function(data){
        			  $uibModalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          };
          var deleteCountryController = function ($scope, $uibModalInstance) {
        	  	
        	  $scope.approveDeleteCountry = function () {
        		  $scope.countryId=scope.elementId[1];
        		  resourceFactory.editCountryResource.remove({id:$scope.countryId},{},function(data){
        			  $uibModalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
              };
          };
          
          var countryAlertController = function ($scope, $uibModalInstance) {
        	  $scope.countryName = scope.nodeName;
        	  $scope.approve = function () {
        		  $uibModalInstance.close('delete');
              };
          };
          
          var addStateController = function ($scope, $uibModalInstance) {
        	  $scope.formData = {};
        	  $scope.nodeName=scope.nodeName;
	        	  $scope.submit = function () {
	        		  
	        		  $scope.formData.parentEntityId = scope.elementId[1];
	        		  resourceFactory.addStateResource.get($scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	          };
	       var editStateController = function ($scope, $uibModalInstance) {
	    	   		
	    	   		$scope.formData={};
    	 			$scope.formData.entityCode = scope.nodeCode;
    	 			$scope.formData.entityName = scope.nodeName;
	        	  $scope.submit = function () {
	        		  
	        		  var stateId=scope.elementId[1];
	        		  resourceFactory.editStateResource.update({id:stateId},$scope.formData,function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	        var deleteStateController = function ($scope, $uibModalInstance) {
	        	  $scope.approveDeleteState = function () {
	        		  $scope.stateId=scope.elementId[1];
	        		  resourceFactory.editStateResource.remove({id:$scope.stateId},{},function(data){
	        			  $uibModalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $uibModalInstance.dismiss('cancel');
	              };
	        };
	        var stateAlertController = function ($scope, $uibModalInstance) {
	        	  $scope.stateName = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $uibModalInstance.close('delete');
	              };
	          };

	        var addCityController = function ($scope, $uibModalInstance) {
	        	 $scope.formData = {};
	        	  $scope.nodeName=scope.nodeName;
		        	  $scope.submit = function (newCode,newName) {
		        		  
		        		  $scope.formData.parentEntityId = scope.elementId[1];
		        		  resourceFactory.addCityResource.get($scope.formData,function(data){
		        			  $uibModalInstance.close('delete');
		        			  route.reload();
		        	        },function(errData){
				          });
		              };
		              $scope.cancel = function () {
		                  $uibModalInstance.dismiss('cancel');
		              };
		      };
		     var editCityController = function ($scope, $uibModalInstance) {
		    	   		
		    	   		$scope.formData={};
 		    	 			$scope.formData.entityCode = scope.nodeCode;
		    	 			$scope.formData.entityName = scope.nodeName;
			        	  $scope.submit = function () {
			        		  
			        		  var cityId=scope.elementId[1];
			        		  resourceFactory.editCityResource.update({id:cityId},$scope.formData,function(data){
			        			  $uibModalInstance.close('delete');
			        			  route.reload();
			        	        },function(errData){
					          });
			              };
			              $scope.cancel = function () {
			                  $uibModalInstance.dismiss('cancel');
			              };
			   };
			   var deleteCityController = function ($scope, $uibModalInstance) {
			        	  $scope.approveDeleteCity = function () {
			        		  $scope.cityId=scope.elementId[1];
			        		  resourceFactory.editCityResource.remove({id:$scope.cityId},{},function(data){
			        			  $uibModalInstance.close('delete');
			        			  route.reload();
			        	        },function(errData){
					          });
			              };
			              $scope.cancel = function () {
			                  $uibModalInstance.dismiss('cancel');
			              };
			   };
	         
        resourceFactory.addressResource.getAllAddresses(function(data){
        	        	
        	 scope.stateObject=[];
        	 scope.cityObject=[];
        	 scope.countryObject=[];
          for(var i in data.pageItems){
        	  scope.countryObject.push({id:"A-"+data.pageItems[i].countryId,code:data.pageItems[i].countryCode,name:data.pageItems[i].countryName,children:[]});
        	  
        	  if(data.pageItems[i].stateId!=0)
        		  scope.stateObject.push({id:"B-"+data.pageItems[i].stateId,code:data.pageItems[i].stateCode,name:data.pageItems[i].stateName,parentId:"A-"+data.pageItems[i].countryId,children:[]});
        	  if(data.pageItems[i].cityId!=0)
        		  scope.cityObject.push({id:"C-"+data.pageItems[i].cityId,code:data.pageItems[i].cityCode,name:data.pageItems[i].cityName,parentId:"B-"+data.pageItems[i].stateId,children:[]});
          }
          
          scope.rootArray=[];
         scope.stateObject=_.uniq(scope.stateObject,function(item,key,id){
              return item.id;
          });
         scope.countryObject=_.uniq(scope.countryObject,function(item,key,id){
             return item.id;
         });
         scope.cityObject=_.uniq(scope.cityObject,function(item,key,id){
             return item.id;
         });
        /* console.log(scope.countryObject);
         console.log("----------------------");
         console.log(scope.stateObject);
         console.log("----------------------");
         console.log(scope.cityObject);*/
          for(var i in scope.countryObject){ 
        	  
            scope.rootArray.push(scope.countryObject[i]);
          }
                   
          for(var i in scope.stateObject){
        	  
        	  scope.rootArray.push(scope.stateObject[i]);
           }
          for(var i in scope.cityObject){ 
              scope.rootArray.push(scope.cityObject[i]);
           }
          
             for(var i in scope.rootArray){
            	
                 idToNodeMap[scope.rootArray[i].id] = scope.rootArray[i];
             }
             
             function sortByParentId(a, b){
                 return a.parentId - b.parentId;
             }
             data.pageItems.sort(sortByParentId);
             var glAccountsArray = scope.rootArray;
            
             var root = [];
            for(var i = 0; i < glAccountsArray.length; i++) {
            	 var currentObj = glAccountsArray[i];
                 if(currentObj.children){
                     currentObj.collapsed = "true";
                 }

               if(typeof currentObj.parentId === "undefined") {
                     root.push(currentObj);        
               } else {
            	   
                     parentNode = idToNodeMap[currentObj.parentId];
                     parentNode.children.push(currentObj);
               };
             }
            scope.treedata = root;
        });
        
        
     }
  });
  mifosX.ng.application.controller('AddressTreeviewController', ['$scope', 'ResourceFactory','$uibModal','$route','PermissionService', mifosX.controllers.AddressTreeviewController]).run(function($log) {
    $log.info("AddressTreeviewController initialized");
  });
}(mifosX.controllers || {}));
