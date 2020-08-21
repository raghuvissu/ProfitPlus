(function(module) {
    mifosX.directives = _.extend(module, {
    	RightClickDirective: function($parse) {
            return function(scope, element, attrs) {
                var fn = $parse(attrs.ngRightClick);
                element.bind('contextmenu', function(event) {
                    scope.$apply(function() {
                        event.preventDefault();
                        fn(scope, {$event:event});
                    });
                });
            };
        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("ngRightClick", ['$parse', mifosX.directives.RightClickDirective]).run(function($log) {
    $log.info("RightClickDirective initialized");
});