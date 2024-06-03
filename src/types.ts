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
import { ChartProps, FilterState, QueryFormData, supersetTheme, TimeseriesDataRecord, DataRecordFilters } from '@superset-ui/core';
import { SetDataMaskHook } from "@superset-ui/core/lib/chart/types/Base";

export interface BubblePlotStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface BubblePlotCustomizeProps {
  headerText: string;
}

export type BubblePlotQueryFormData = QueryFormData &
  BubblePlotStylesProps &
  BubblePlotCustomizeProps;


export type DataRecordValue = number | string | boolean | Date | null;

export interface BubblePlotProps extends ChartProps<BubblePlotQueryFormData> {
  data: TimeseriesDataRecord[];
  startDate: string,
  endDate: string,
  // add typing here for the props you pass in from transformProps.ts!
  setDataMask: SetDataMaskHook,
  filterState: FilterState,
  emitCrossFilters?: boolean,
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
  headerText: string;
  filters?: DataRecordFilters;
  onChangeFilter?: ChartProps['hooks']['onAddFilter'];
};
