(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientController: function(scope, resourceFactory , paginatorService,location,webStorage,$uibModal,TENANT,$rootScope) {
        
      scope.clients = [];
      scope.config = {};
      scope.allDatas = [];
      //scope.PermissionService = PermissionService;
      scope.pageNo = 1;
      scope.newClients = 0;
      scope.activeClients = 0;
      scope.InActiveClients = 0;
      scope.PendingClients = 0;
      scope.totalPages = 1;
      scope.status = 'ALL';
      scope.isPasswordShow = false;
      scope.isOnline = " ";
      scope.config = webStorage.get('uiConfigData').clientListing || ""; 
      scope.configValues = webStorage.get('uiConfigData');
      /*scope.clientconfig = false;
      scope.clientconfigfalse = false;*/
      
      scope.IsClientIndividual =  webStorage.get('uiConfigData').IsClientIndividual;
      /*scope.IsGridEnable =  webStorage.get('uiConfigData').IsGridEnable;
      if(scope.IsGridEnable=='true'){
    	  scope.clientconfig = function(){
    		  return scope.clientconfig;
    	  };
    	  }else{
    		  scope.clientconfigfalse = function(){
    		  	return scope.clientconfigfalse;
    	  	  }; 
    	  }*/
      
      /**
       * @default
       * we call this function from below
       * scope.clients = paginatorService.paginate(fetchFunction, 14);
       * */
      	
      	scope.configs = [];
      	/*if(scope.IsGridEnable=='false'){
		  	resourceFactory.configurationResource.get({tenant:TENANT},function(data) {
		  		scope.clientConfiguration = data.clientConfiguration;
		  	});
      	}*/
      
      var passwordSetToStar = function(){
    	  for (var i in scope.allDatas){
		        	
         		if(scope.allDatas[i].clientPassword != undefined && scope.allDatas[i].clientPassword.length>0){
         			var stars = "";
         			for (var k in scope.allDatas[i].clientPassword){
 				        	if(k>=0 && k<scope.allDatas[i].clientPassword.length){
 				        		
 				        		stars += "*";
 				        	}
 				    }
         			if(scope.isPasswordShow){
         				scope.allDatas[i].password = scope.allDatas[i].clientPassword;
         			}
         			scope.allDatas[i].clientPassword = stars;
         			// console.log(scope.allDatas[i].clientPassword);
         		}
 		    }
      };
      
      if(scope.config != null && scope.config.password == 'true'){
 		 scope.isPasswordShow = true;
 	  }
      
      /*if(PermissionService.showMenu('SHOW_PASSWORD')){
    	  if(scope.config != null && scope.config.password == 'true'){
    		 scope.isPasswordShow = true;
    	  }
      }*/
      
	      var fetchFunction = function(offset, limit, callback) {
	        resourceFactory.clientResource.getAllClients({offset: offset, limit: limit} , function(data){
	        	scope.totalClients = data.totalFilteredRecords;
	        	scope.allDatas = data.pageItems;
	        	if(scope.totalClients%25 == 0)	
	        		scope.totalPages = scope.totalClients/25;
	        	else
	        		scope.totalPages = Math.floor(scope.totalClients/25)+1;
	        	
	        	if(scope.config.password == 'true'){
	        		passwordSetToStar();
	        	}
	        	
	        	callback(data);
	        });
	      };
	      
	      /*resourceFactory.runReportsResource.get({reportSource: 'ClientCounts',genericResultSet:false} , function(data) {
	    	  for(var i in data){
	    		  if(data[i].status == 'New')
	    			  scope.newClients = data[i].ccounts;
	    		  if(data[i].status == 'Active')
	    			  scope.activeClients = data[i].ccounts;
	    		  if(data[i].status == 'Inactive')
	    			  scope.InActiveClients = data[i].ccounts;
	    		  if(data[i].status == 'Pending')
	    			  scope.PendingClients = data[i].ccounts;
	    	  }
	    	  scope.totalClients = scope.newClients+scope.activeClients
	    	  					   +scope.InActiveClients+scope.PendingClients;
	    	  if(scope.totalClients%15 == 0)
	    		  scope.totalPages = scope.totalClients/15;
	    	  else
	    		  scope.totalPages = Math.floor(scope.totalClients/15)+1;
	      });*/
      
       
      scope.nextPageNo = function(){
    	  if(scope.pageNo < scope.totalPages)
    	   scope.pageNo +=1;
      };
      
      scope.previousPageNo = function(){
    	  if(scope.pageNo >1)
    	  scope.pageNo -=1;
      };
      
      scope.lastPageNo = function(){
    	  scope.pageNo =scope.totalPages;
      };
      
      scope.firstPageNo = function(){
    	  scope.pageNo =1;
      };
      
      scope.routeTo = function(clientId){
          location.path('/viewclient/id/'+ clientId);
        };
        
    	scope.routeToGroup = function(name){
            location.path('/viewgroupdetails/'+ name);
       };
       /*if(scope.IsGridEnable=='false'){ 
    	   //if(PermissionService.showMenu('READ_CLIENT'))
    		   scope.clients = paginatorService.paginate(fetchFunction, 24);
       }*/
      
       if($rootScope.hasPermission('LIST_CLIENTS')){
    	   scope.clients = paginatorService.paginate(fetchFunction, 24);
       };
       
      scope.search123 = function(offset, limit, callback) {
          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit , sqlSearch: scope.filterText } , function(data){
        	  scope.allDatas = data.pageItems;
        	  if(scope.config.password == 'true'){
        		  passwordSetToStar();
 	          }
 	        	callback(data);
          }); 
      };
       
       scope.search = function(filterText) {
    	   scope.filterText = filterText;
        scope.clients = paginatorService.paginate(scope.search123, 24);
       };
       
       /**
        * @ Changing status
        * */
       scope.searchSource=function(sourceStatus){
    	   /**
    	    * This function used for specific status
    	    * like New,Active... etc
    	    * */
    	   scope.searchSources123 = function(offset, limit, callback) {
    			   resourceFactory.clientResource.getAllClients({offset: offset, limit: limit,status: sourceStatus} , function(data){
       	        	scope.totalClients = data.totalFilteredRecords;
       	        	scope.allDatas = data.pageItems;
       	        	if(scope.totalClients%25 == 0)	
       	        		scope.totalPages = scope.totalClients/25;
       	        	else
       	        		scope.totalPages = Math.floor(scope.totalClients/25)+1;
       	        	
       	        	if(scope.config.password == 'true'){
       	        		passwordSetToStar();
       	        	}
       	        	callback(data);
       	        });
    	   };
    	   
    	   if(sourceStatus == 'ALL'){
			   scope.clients = paginatorService.paginate(fetchFunction, 24);
		   }else{
			   scope.clients = paginatorService.paginate(scope.searchSources123, 24);
		   }
    	   
       };
       
       scope.routeToCheckOnline=function(clientNameForOnlineUser,clientId){
    	   if(clientNameForOnlineUser == undefined){
    		   scope.clientNameForOnlineUser = '';
    	   }else{
    		   scope.clientNameForOnlineUser = clientNameForOnlineUser;
    	   }
    	   resourceFactory.radiusOnlineUser.get({checkOnline:true,userName:scope.clientNameForOnlineUser},function(data) {
    		   scope.checkOnlineClient = data.pageItems;
    		 //  $scope.count = $scope.checkOnlineClient[0].count;
    		   console.log(scope.checkOnlineClient[0].count);
    		   scope.onlineUserName = scope.clientNameForOnlineUser;
    		   scope.checkOnlineClient[0].count > 0 ?scope.isOnline = "Online"+clientId:scope.isOnline = "Offline"+clientId;
           });
    	
       };
       
    }
  });
  mifosX.ng.application.controller('ClientController', ['$scope', 'ResourceFactory', 'PaginatorService','$location','webStorage','$uibModal','TENANT','$rootScope',mifosX.controllers.ClientController]).run(function($log) {
    $log.info("ClientController initialized");
  });
}(mifosX.controllers || {}));
