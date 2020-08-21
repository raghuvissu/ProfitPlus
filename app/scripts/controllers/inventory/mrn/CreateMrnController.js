(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateMrnController: function(scope,webStorage, resourceFactory, location,dateFilter,$rootScope,http,API_VERSION) {
    	 scope.officeDatas = [];
    	 scope.itemMasterDatas = [];
    	 scope.first = {};
    	 scope.first.date = new Date();
        resourceFactory.mrnTemplateResource.get(function(data) {
        	scope.officeDatas = data.officeData;
        	scope.itemMasterDatas = data.itemMasterData;
        	scope.formData = data;
        });
        scope.getData = function(query){
        	return http.get($rootScope.hostUrl+API_VERSION+'/itemsales/template', {
        	      params: {
        	    	  		query: query
        	      		   }
        	    }).then(function(result){
        	    	scope.officeDatas = [];
	        	      for(var i in result.data.officeDatas){
	        	    	  scope.officeDatas.push(result.data.officeDatas[i]);
	        	    	  if(i == 7)
	        	    		  break;
	        	      }

	        	    if(scope.officeDatas.length == 0){
	        	    	delete scope.formData.name;
	        	    	delete scope.formData.nameDecorated;
	        	    	delete scope.formData.externalId;
	        	    }
        	      return scope.officeDatas;
        	    });
        };
        scope.groupByOffice = function(externalId, name){
        	return externalId+"--"+name;
        };
        scope.getbothitem = function(itemCode, itemDescription){
        	return itemCode+"--"+itemDescription;
        }
        
        scope.selectedMRN=function(){
        	webStorage.add("callingTab", {someString: "mrn" });
        };
        scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "mrn" });
	       };
        scope.submit = function() {
        	
        	this.formData.locale = scope.optlang.code;
        	/*var reqDate = dateFilter(scope.formData.requestedDate,'dd MMMM yyyy');
        	this.formData.dateFormat = 'dd MMMM yyyy';
        	this.formData.requestedDate = reqDate;
        	*/
        	
        	
        	
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');//.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.requestedTime = " "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
            this.formData.requestedDate = reqDate;
            
        	delete this.formData.itemMasterData;
        	delete this.formData.officeData;
        	for(var i in scope.officeDatas){
           		if(scope.officeDatas[i].externalId == scope.formData.fromOffice){
           			scope.formData.fromOffice= scope.officeDatas[i].id;break;
           		}
           	}
            for(var i in scope.officeDatas){
           		if(scope.officeDatas[i].externalId == scope.formData.toOffice){
           			scope.formData.toOffice = scope.officeDatas[i].id;break;
           		}
           	}
        	resourceFactory.mrnResource.save(this.formData,function(data){
        			location.path('/inventory');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateMrnController', ['$scope','webStorage', 'ResourceFactory', '$location','dateFilter','$rootScope','$http', 
                                                           'API_VERSION', mifosX.controllers.CreateMrnController]).run(function($log) {
    $log.info("CreateMrnController initialized");
  });
}(mifosX.controllers || {}));
