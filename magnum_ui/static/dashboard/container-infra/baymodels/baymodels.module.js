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
   * @name horizon.dashboard.container-infra.baymodels
   * @ngModule
   *
   * @description
   * Provides all the services and widgets require to display the baymodel
   * panel
   */
  angular
    .module('horizon.dashboard.container-infra.baymodels', [
      'ngRoute',
      'horizon.dashboard.container-infra.baymodels.actions',
      'horizon.dashboard.container-infra.baymodels.details'
    ])
    .constant('horizon.dashboard.container-infra.baymodels.events', events())
    .constant('horizon.dashboard.container-infra.baymodels.resourceType', 'OS::Magnum::Baymodel')
    .run(run)
    .config(config);

  /**
   * @ngdoc constant
   * @name horizon.dashboard.container-infra.baymodels.events
   * @description A list of events used by Baymodels
   */
  function events() {
    return {
      CREATE_SUCCESS: 'horizon.dashboard.container-infra.baymodels.CREATE_SUCCESS',
      DELETE_SUCCESS: 'horizon.dashboard.container-infra.baymodels.DELETE_SUCCESS'
    };
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.magnum',
    'horizon.dashboard.container-infra.baymodels.basePath',
    'horizon.dashboard.container-infra.baymodels.resourceType'
  ];

  function run(registry, magnum, basePath, resourceType) {
    registry.getResourceType(resourceType)
    .setNames(gettext('Baymodel'), gettext('Baymodels'))

    // for detail summary view on table row 
    .setSummaryTemplateUrl(basePath + 'details/drawer.html')
    // for table row items and detail summary view.
    .setProperty('name', {
      label: gettext('Name')
    })
    .setProperty('id', {
      label: gettext('ID')
    })
    .setProperty('coe', {
      label: gettext('COE')
    })
    .setProperty('network_driver', {
      label: gettext('Network Driver')
    })
    .setListFunction(listFunction)
    .tableColumns
    .append({
      id: 'name',
      priority: 1,
      sortDefault: true,
      filters: ['noName'],
      urlFunction: urlFunction
    })
    .append({
      id: 'id',
      priority: 2
    })
    .append({
      id: 'coe',
      priority: 1
    })
    .append({
      id: 'network_driver',
      priority: 2
    });

    // for magic-search
    registry.getResourceType(resourceType).filterFacets
    .append({
      'label': gettext('Name'),
      'name': 'name',
      'singleton': true
    })
    .append({
      'label': gettext('ID'),
      'name': 'id',
      'singleton': true
    })
    .append({
      'label': gettext('COE'),
      'name': 'coe',
      'singleton': true,
      options: [
        {label: gettext('Docker Swarm'), key: 'swarm'},
        {label: gettext('Kubernetes'), key: 'kubernetes'},
        {label: gettext('Mesos'), key: 'mesos'}
      ]
    })

    function listFunction(params) {
      return magnum.getBaymodels(params).then(modifyResponse);

      function modifyResponse(response) {
        return {data: {items: response.data.items.map(addTrackBy)}};

        function addTrackBy(baymodel) {
          baymodel.trackBy = baymodel.id;
          return baymodel;
        }
      }
    }

    function urlFunction(item) {
      return 'project/ngdetails/OS::Magnum::Baymodel/' + item.id;
    }
  }

  config.$inject = [
    '$provide',
    '$windowProvider',
    '$routeProvider'
  ];

  /**
   * @name config
   * @param {Object} $provide
   * @param {Object} $windowProvider
   * @param {Object} $routeProvider
   * @description Routes used by this module.
   * @returns {undefined} Returns nothing
   */
  function config($provide, $windowProvider, $routeProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/container-infra/baymodels/';
    $provide.constant('horizon.dashboard.container-infra.baymodels.basePath', path);
    $routeProvider.when('/project/baymodels/', {
      templateUrl: path + 'panel.html'
    });
  }
})();
