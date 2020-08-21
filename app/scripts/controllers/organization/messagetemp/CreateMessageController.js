(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateMessageController : function(scope, resourceFactory, location) {
			scope.messageTypee = {};
			scope.formData = {};
			scope.formData.messageParams = [];
			scope.messageFormData = {};
			
			resourceFactory.messageTemplateResource.get(function(data) {
				scope.messageTypee = data.messageTypes;
			});

			scope.addMessage = function() {			
				    scope.formData.messageParams.push({
					parameter : scope.messageFormData.parameter
				});
			        scope.messageFormData.parameter = undefined;
			};

			scope.deleteMessageParam = function(index) {
				    scope.formData.messageParams.splice(index, 1);
			};

			scope.submit = function() {
				resourceFactory.messageSaveResource.save(scope.formData,function() {
					 location.path('/message');
		     	});
			};
		}
	});
	mifosX.ng.application.controller('CreateMessageController',[ 
		 '$scope', 
		 'ResourceFactory', 
		 '$location',
   mifosX.controllers.CreateMessageController ]).run(function($log) {
	   	 $log.info("CreateMessageController initialized");
   });
}(mifosX.controllers || {}));
