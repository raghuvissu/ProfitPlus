(function (module) {
    mifosX.directives = _.extend(module, {
        fileModel: function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("fileModel", ['$parse', mifosX.directives.fileModel]).run(function ($log) {
    $log.info("fileModel initialized");
});
