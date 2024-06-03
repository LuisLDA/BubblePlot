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
import React, { createRef, useCallback, useEffect, useState } from 'react';
//import { styled } from '@superset-ui/core';
import { BubblePlotProps, DataRecordValue } from './types';
import { BubbleChart } from './components/BubbleChart';
import {
  DTTM_ALIAS,
  ensureIsArray,
  styled
} from '@superset-ui/core';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<BubblePlotStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) => (
    height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]
  )}px;
  }
`;

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
  const { data, height, width, filters, setDataMask, emitCrossFilters } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  // useEffect(() => {
  //   const root = rootElem.current as HTMLElement;
  //   console.log('Plugin element', root);
  // });

  console.log('Plugin Bubble props', props);

  const [filterPost, setFilterPost] = useState(props.filterState?.filters?.ID_PAGE ?? []);

  //const [filterPost, setFilterPost] = useState([]);




  const isActiveFilterValue = useCallback(
    function isActiveFilterValue(key: string, val: any) {
      if (Array.isArray(val)) {
        return !!filters && val.some(v => filters[key]?.includes(v));
      }
      return !!filters && filters[key]?.includes(val);
    },
    [filters],
  );


  const getCrossFilterDataMask = (key: string, value: any) => {
    let updatedFilters = { ...(filters || {}) };
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
          label: labelElements.join(', '),
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






  /*useEffect(() => {
    console.log('DATA BUBBLEPLOT :', filterPost);
    const dataMask = {
      extraFormData: {
        filters:
          filterPost.length > 0 ? ['ID_PAGE'].map((col, idx) => {
            return {
              col,
              op: 'IN' as const,
              val: filterPost as (string | number | boolean)[],
            };
          }) : [],
      },
      filterState: {
        label: 'ID_PAGE',
        value: filterPost,
        //selectedValues: ['any'],
        filters: {
          'ID_PAGE': filterPost,
        }
      },
    };
    console.log('dataMask bubble', dataMask);
    props.setDataMask(dataMask);
  }, [filterPost])*/

  return (



    <BubbleChart data={data} width={width} height={height} filterPosts={filterPost} setFilterPost={toggleFilter} />

    // <Styles
    //   ref={rootElem}
    //   boldText={props.boldText}
    //   headerFontSize={props.headerFontSize}
    //   height={height}
    //   width={width}
    // >

    // </Styles>

    // <Styles
    //   ref={rootElem}
    //   boldText={props.boldText}
    //   headerFontSize={props.headerFontSize}
    //   height={height}
    //   width={width}
    // >

    //   <button onClick={() => toggleFilter("ID_PAGE", ["100109035146827", "100113755207433"])}>Set Filter</button>
    //   <pre>
    //     {JSON.stringify(data, null, 2)}
    //   </pre>
    // </Styles>
  );
}
