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
import React, { useCallback, useEffect, useState } from 'react';
//import { styled } from '@superset-ui/core';
import { BubblePlotProps } from './types';
import { BubbleChart } from './components/BubbleChart';
import { ensureIsArray } from '@superset-ui/core';

// The following Styles component is a <div> element, which has been styled using Emotion
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

export default function BubblePlot(props: BubblePlotProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width, filters, setDataMask, emitCrossFilters, all_columns, active_selection } = props;


  const data2 = data.map((value: any) => {
    const prop: any = {};

    all_columns.forEach((column: any) => {
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

  const [filterPost, setFilterPost] = useState<string[]>([]);


  useEffect(() => {
    setFilterPost(filters?.ID_PAGE || []);
  }, [filters]);


  const isActiveFilterValue = useCallback(
    function isActiveFilterValue(key: string, val: any) {
      if (Array.isArray(val)) {
        return !!filters && val.some(v => filters[key]?.includes(v));
      }
      return !!filters && filters[key]?.includes(val);
    },
    [filters],
  );


  const getCrossFilterDataMask = (key: string, results: any) => {
    let updatedFilters = { ...(filters || {}) };


    const keys: any = [];
    const value: any = [];

    results.forEach((item: any) => {
      const key = item.dataContext.user;
      const val = item.dataContext.ID_PAGE;
      keys.push(key);
      value.push(val);
    });


    if (filters && isActiveFilterValue(key, value)) {
      updatedFilters = {};
    } else {
      updatedFilters = {
        [key]: Array.isArray(value) ? value : [value],
      };
    }
    if (
      Array.isArray(updatedFilters[key]) &&
      updatedFilters[key].length === 0
    ) {
      delete updatedFilters[key];
    }

    const groupBy = Object.keys(updatedFilters);
    const groupByValues = Object.values(updatedFilters);
    const labelElements: string[] = [];
    groupBy.forEach(col => {
      const filterValues = ensureIsArray(updatedFilters?.[col]);
      if (filterValues.length) {
        const valueLabels = filterValues;
        labelElements.push(`${valueLabels.join(', ')}`);
      }
    });

    return {
      dataMask: {
        extraFormData: {
          filters:
            groupBy.length === 0
              ? []
              : groupBy.map(col => {
                const val = ensureIsArray(updatedFilters?.[col]);
                if (!val.length)
                  return {
                    col,
                    op: 'IS NULL' as const,
                  };
                return {
                  col,
                  op: 'IN' as const,
                  val: val.map((el: any) =>
                    el!
                  ),
                };
              }),
        },
        filterState: {
          label: keys.join(', '),
          value: groupByValues.length ? groupByValues : null,
          filters:
            updatedFilters && Object.keys(updatedFilters).length
              ? updatedFilters
              : null,
        },
      },
      isCurrentValueSelected: false,
    };
  };


  const toggleFilter = useCallback(
    function toggleFilter(key: string, val: any) {
      if (!emitCrossFilters) {
        return;
      }
      setDataMask(getCrossFilterDataMask(key, val).dataMask);
    },
    [emitCrossFilters, getCrossFilterDataMask, setDataMask],
  );



  return (

    <BubbleChart
      data={
        data2.filter((item: any) => {
          if (filterPost.length > 0) {
            console.log('Item:', item);
            return filterPost.includes(item.ID_PAGE);
          }
          return true
        })
      }
      width={width}
      height={height}
      filterPosts={filterPost}
      isFiltereable={active_selection}
      setFilterPost={
        active_selection ? toggleFilter : () => { }
      }
    />

  );
}
