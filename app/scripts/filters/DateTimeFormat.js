(function(module) {
    mifosX.filters = _.extend(module, {
    	DateTimeFormat: function (dateFilter,localStorageService) {
            return function(input) {
                if(input){
                    var tDate = new Date(input);
                    return dateFilter(tDate,localStorageService.getFromLocalStorage('dateformat')+' HH:mm');
                }

            }
        }
    });
    mifosX.ng.application.filter('DateTimeFormat', ['dateFilter','localStorageService',mifosX.filters.DateTimeFormat]).run(function($log) {
        $log.info("DateTimeFormat filter initialized");
    });
}(mifosX.filters || {}));
