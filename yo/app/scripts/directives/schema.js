/**
 * Copyright (C) 2013 – 2015  SLUB Dresden & Avantgarde Labs GmbH (<code@dswarm.org>)
 *  
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  
 * http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

angular.module('dmpApp')
    .controller('SchemaCtrl', function($scope, $timeout, $q, $modal, PubSub) {
        $scope.internalName = 'Source Target Schema Mapper';

        $scope.onOutputSelectorClick = function() {

            var modalInstance = $modal.open({
                templateUrl: 'views/directives/target-schema-selector.html',
                controller: 'TargetSchemaSelectorCtrl',
                resolve: {
                    project: function() {
                        return $scope.project;
                    }
                }
            });

            modalInstance.result.then(function(dataModel) {
                $scope.setOutputSchema(dataModel);
            });

        };

        $scope.collapse = function(schema) {
            schema.collapsed = !schema.collapsed;

            $timeout(function() {
                PubSub.broadcast('schemaCanvasUpdated', {});
            }, 0);

        };

        $scope.chevron = function(source) {
            return 'glyphicon-chevron-' + (source.collapsed ? 'right' : 'down');
        };

        /**
         * Activates a mapping
         * @param mapping
         */
        $scope.activateMapping = function(mapping) {
            console.log("mapping", mapping);

            PubSub.broadcast('connectionSelected', {
                connection_id: mapping._$connection_id,
                name: mapping.name,
                inputAttributePath: mapping.input_attribute_paths,
                outputAttributePath: mapping.output_attribute_path,
                mapping_id: mapping.uuid,
                additionalInput: [],
                click: true
            });

        };

        $scope.hightlightMapping = function(mapping) {

            console.log("mapping", mapping);

        };


    })
    .directive('schema', function() {
        return {
            scope: true,
            restrict: 'E',
            replace: true,
            templateUrl: 'views/directives/schema.html',
            controller: 'SchemaCtrl'
        };
    });

