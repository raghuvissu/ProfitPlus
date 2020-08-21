(function (module) {
    mifosX.services = _.extend(module, {
        AuthenticationService: function (scope, httpService, SECURITY, localStorageService,timeout, webStorage,TENANT,resourceFactory) {
            var onSuccess = function (data) {
                scope.$broadcast("UserAuthenticationSuccessEvent", data);
                localStorageService.addToLocalStorage('userData', data);
                webStorage.add("userData",data);
                
	                scope.setDf = function(){
	                	resourceFactory.configurationResource.get({tenant:TENANT},function(data) {
	                		scope.globalconfigs = data.globalConfiguration;
	                		webStorage.add("global_configuration",scope.globalconfigs);
	                        	
	                    	for(var i in data.globalConfiguration){
	                            if(data.globalConfiguration[i].name=="device-agrement-type"){
	                            	  webStorage.add("CPE_TYPE",data.globalConfiguration[i].value);
	                            	  
	                            }if(data.globalConfiguration[i].name=="registration-requires-device"){
	                            	  webStorage.add("Registration_requires_device",data.globalConfiguration[i].enabled);
	                            	  
	                            }if(data.globalConfiguration[i].name=="is-wallet-enable"){
	                            	  webStorage.add("is-wallet-enable",data.globalConfiguration[i].enabled);
	                            	  
	                            }if(data.globalConfiguration[i].name=="is-propertycode-enabled"){
	                            	  webStorage.add("is-propertycode-enabled",data.globalConfiguration[i].enabled);
	
	                            }if(data.globalConfiguration[i].name=="client-additional-data"){
	                            	  webStorage.add("client-additional-data",data.globalConfiguration[i].enabled);
	                            }
	                            
	                        }
	                    });
	           
	                	scope.df = scope.dateformat;
	                };
	                scope.setDf();	
            };

            var onFailure = function (data, status) {
                scope.$broadcast("UserAuthenticationFailureEvent", data, status);
            };

            var apiVer = '/obsplatform/api/v1';

            var getUserDetails = function(data){

                localStorageService.addToLocalStorage('tokendetails', data);
                setTimer(data.expires_in);
                httpService.get( apiVer + "/userdetails?access_token=" + data.access_token)
                    .success(onSuccess)
                    .error(onFailure);

            }

            var updateAccessDetails = function(data){
                var sessionData = webStorage.get('sessionData');
                sessionData.authenticationKey = data.access_token;
                webStorage.add("sessionData",sessionData);
                localStorageService.addToLocalStorage('tokendetails', data);
                var userDate = localStorageService.getFromLocalStorage("userData");
                userDate.accessToken =  data.access_token;
                localStorageService.addToLocalStorage('userData', userDate);
                httpService.setAuthorization(data.access_token);
                setTimer(data.expires_in);
            }

            var setTimer = function(time){
                timeout(getAccessToken, time * 1000);
            }

            var getAccessToken = function(){
                var refreshToken = localStorageService.getFromLocalStorage("tokendetails").refresh_token;
                httpService.cancelAuthorization();
                httpService.post( "/obsplatform/api/oauth/token?&client_id=community-app&grant_type=refresh_token&client_secret=123&refresh_token=" + refreshToken)
                    .success(updateAccessDetails);
            }

            this.authenticateWithUsernamePassword = function (credentials) {
                scope.$broadcast("UserAuthenticationStartEvent");
        		if(SECURITY === 'oauth'){
	                httpService.post( "/obsplatform/api/oauth/token?username=" + credentials.username + "&password=" + credentials.password +"&client_id=community-app&grant_type=password&client_secret=123")
	                    .success(getUserDetails)
	                    .error(onFailure);
        		} else {
	                httpService.post(apiVer + "/authentication?username=" + credentials.username + "&password=" + credentials.password)
	                    .success(onSuccess)
	                    .error(onFailure);
        		}
            };
        }
    });
    mifosX.ng.services.service('AuthenticationService', ['$rootScope', 'HttpService', 'SECURITY', 'localStorageService','$timeout','webStorage','TENANT','ResourceFactory', mifosX.services.AuthenticationService]).run(function ($log) {
        $log.info("AuthenticationService initialized");
    });
}(mifosX.services || {}));