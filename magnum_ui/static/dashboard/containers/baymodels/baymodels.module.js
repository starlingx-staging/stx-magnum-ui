/**
 * Copyright 2015 Cisco Systems, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name horizon.dashboard.containers.baymodels
   * @ngModule
   *
   * @description
   * Provides all the services and widgets require to display the bay model
   * panel
   */
  angular
    .module('horizon.dashboard.containers.baymodels', [])
    .value('horizon.dashboard.containers.baymodels.events', events());

  /**
   * @ngdoc value
   * @name horizon.dashboard.containers.baymodels.events
   * @description A list of events used by Bay Models
   */
  function events() {
    return {
      selectedImage: 'horizon.dashboard.containers.baymodels.selectedImaged'
    };
  }
})();