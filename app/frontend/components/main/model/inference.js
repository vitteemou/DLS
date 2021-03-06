(function () {
    'use strict';

    angular
        .module('inference', ['ngMaterial', 'classifyImage'])
        .directive('inference', ['$compile', function ($compile) {

            function buildTemplate(modelType, modelId) {
                var inferenceType =
                {
                    'image2d-classification': '<classify-image model-id="' + modelId + '"></classify-image>'
                };
                return inferenceType[modelType];
            }

            return {
                scope: {
                    model: '@'
                },
                link: function (scope, element) {

                    scope.$watch('model', function (value) {
                        if (value) {
                            element.empty();
                            var modelJson = JSON.parse(scope.model);
                            var template = buildTemplate(modelJson.type, modelJson.id);
                            var compiled = $compile(template)(scope);
                            element.append(compiled);
                        }
                    });
                }
            };
        }]);

})();