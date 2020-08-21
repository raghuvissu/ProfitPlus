(function(module) {
  mifosX.services = _.extend(module, {
	  PermissionService: function(webStorage, httpService, resourceFactory,localStorageService) {
		  
		  var permissionsArray = [];
		  this.showMenu = function(){
			  permissionsArray = localStorageService.getFromLocalStorage("permissionsArray");
			  if(hasAllFunction() == true) return true;
			   var readFunc=showRead();
			  for(var k in permissionsArray){
				  for (var i=0; i < arguments.length; i++){
					 if(permissionsArray[k] == arguments[i].toUpperCase()){
						 return true;
					 }
					 else if(readFunc){
						 var read = arguments[i].split("_");
						 //console.log(read[0].toUpperCase());
						 if(read[0].toUpperCase() == "READ" || (arguments[i].toUpperCase() == "REPORTING_SUPER_USER")){
							 return true;
						 } 
					 }
				  }
			 }
		  };
		  function showRead(){
			  permissionsArray = localStorageService.getFromLocalStorage("permissionsArray");
			  //console.log("show Read");
			  if(hasAllFunctionRead() == true) {
				   return true;
			  }
			  
		  };
		  function hasAllFunction(){  
			  //console.log("all fun");
		      for(var i in permissionsArray)
				 if(permissionsArray[i] == "ALL_FUNCTIONS") return true;
		  }
		  function hasAllFunctionRead(){  
			  //console.log("all fun read");
		      for(var j in permissionsArray)
				 if(permissionsArray[j] == "ALL_FUNCTIONS_READ") return true;
		  }
		 }
  });
  mifosX.ng.services.service('PermissionService', [
    'webStorage',
    'HttpService',
    'ResourceFactory',
    'localStorageService',
    mifosX.services.PermissionService
  ]).run(function($log) {
    $log.info("PermissionService initialized");
  });
}(mifosX.services || {}));