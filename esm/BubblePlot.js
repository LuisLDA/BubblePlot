function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useCallback, useEffect, useState } from 'react'; //import { styled } from '@superset-ui/core';

import { BubbleChart } from './components/BubbleChart';
import { ensureIsArray } from '@superset-ui/core'; // The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function BubblePlot(props) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  var {
    data,
    height,
    width,
    filters,
    setDataMask,
    emitCrossFilters,
    all_columns,
    active_selection
  } = props;
  var data2 = data.map(value => {
    var prop = {};
    all_columns.forEach(column => {
      if (typeof column === 'string') {
        prop[column] = value[column];
      } else if (typeof column === 'object') {
        // Usa 'label' o 'sqlExpression' según tus necesidades
        prop[column.label] = value[column.sqlExpression];
      }
    });
    return prop;
  });
  console.log('Plugin Bubble props', props);
  var [filterPost, setFilterPost] = useState([]);
  useEffect(() => {
    setFilterPost((filters == null ? void 0 : filters.ID_PAGE) || []);
  }, [filters]);
  var isActiveFilterValue = useCallback(function isActiveFilterValue(key, val) {
    var _filters$key2;

    if (Array.isArray(val)) {
      return !!filters && val.some(v => {
        var _filters$key;

        return (_filters$key = filters[key]) == null ? void 0 : _filters$key.includes(v);
      });
    }

    return !!filters && ((_filters$key2 = filters[key]) == null ? void 0 : _filters$key2.includes(val));
  }, [filters]);

  var getCrossFilterDataMask = (key, results) => {
    var updatedFilters = _extends({}, filters || {});

    var keys = [];
    var value = [];
    results.forEach(item => {
      var key = item.dataContext.user;
      var val = item.dataContext.ID_PAGE;
      keys.push(key);
      value.push(val);
    });

    if (filters && isActiveFilterValue(key, value)) {
      updatedFilters = {};
    } else {
      updatedFilters = {
        [key]: Array.isArray(value) ? value : [value]
      };
    }

    if (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0) {
      delete updatedFilters[key];
    }

    var groupBy = Object.keys(updatedFilters);
    var groupByValues = Object.values(updatedFilters);
    var labelElements = [];
    groupBy.forEach(col => {
      var _updatedFilters;

      var filterValues = ensureIsArray((_updatedFilters = updatedFilters) == null ? void 0 : _updatedFilters[col]);

      if (filterValues.length) {
        var valueLabels = filterValues;
        labelElements.push("" + valueLabels.join(', '));
      }
    });
    return {
      dataMask: {
        extraFormData: {
          filters: groupBy.length === 0 ? [] : groupBy.map(col => {
            var _updatedFilters2;

            var val = ensureIsArray((_updatedFilters2 = updatedFilters) == null ? void 0 : _updatedFilters2[col]);
            if (!val.length) return {
              col,
              op: 'IS NULL'
            };
            return {
              col,
              op: 'IN',
              val: val.map(el => el)
            };
          })
        },
        filterState: {
          label: keys.join(', '),
          value: groupByValues.length ? groupByValues : null,
          filters: updatedFilters && Object.keys(updatedFilters).length ? updatedFilters : null
        }
      },
      isCurrentValueSelected: false
    };
  };

  var toggleFilter = useCallback(function toggleFilter(key, val) {
    if (!emitCrossFilters) {
      return;
    }

    setDataMask(getCrossFilterDataMask(key, val).dataMask);
  }, [emitCrossFilters, getCrossFilterDataMask, setDataMask]);
  return /*#__PURE__*/React.createElement(BubbleChart, {
    data: data2.filter(item => {
      if (filterPost.length > 0) {
        console.log('Item:', item);
        return filterPost.includes(item.ID_PAGE);
      }

      return true;
    }),
    width: width,
    height: height,
    filterPosts: filterPost,
    isFiltereable: active_selection,
    setFilterPost: active_selection ? toggleFilter : () => {}
  });
}