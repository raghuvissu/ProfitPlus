(function(module) {
    mifosX.filters = _.extend(module, {
        CodeValidate: function (webStorage) {
            return function(input) {
            	var value = null;
            	/** /^[+-]?[0-9]*(\\.[0-9]{0,2})?$/*/
           
            	switch (input) {
				case "code":
					value = webStorage.get("uiConfigData").codeDefinitionLength;
					break;
				case "integer":
					value = "/^[0-9]+$/";
					break;
				case "decimal":
					value = "/^[0-9]*(\\.[0-9]{0,2})?$/";  /**   accepts two digits only after point('.')   */ 
					break;
				default:
					break;
				}
                return value;
            };
        }
    });
    mifosX.ng.application.filter('CodeValidate', ['webStorage',mifosX.filters.CodeValidate]).run(function($log) {
        $log.info("CodeValidate filter initialized");
    });
}(mifosX.filters || {}));
