import React, { useState, useEffect } from 'react';
import { Select, Space } from 'antd';
import { useFilter } from '../hooks/useFilter';
import { mapToBubbleData } from '../data/mappers';
import { useBubbleGraph } from '../hooks/useBubbleGraph';


export const BubbleChart = ({ data, width, height }: { data: any[]; width: number; height: number }) => {

  const {
    filterAxisX,
    filterAxisY,
    setFilterAxisX,
    setFilterAxisY
  } = useFilter({ valueX: "comments", valueY: "shares" });



  const optionsDropdown = Object.keys(data[0])
    .filter(key => !(key === "id" || key === "id_page" || key === "username" || key === "red" || key === "red_name"))
    .map(key => ({ value: key, label: key }));


  const [dataAxis, setDataAxis] = useState(mapToBubbleData(data, filterAxisX, filterAxisY));


  useBubbleGraph({ id: "chartdiv", filterAxisX, filterAxisY, dataAxis });


  useEffect(() => { 
    setDataAxis(mapToBubbleData(data, filterAxisX, filterAxisY)) 
  }, [filterAxisX, filterAxisY])


  const restHeight = height - 40;


  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", width: width }}>

        <Space wrap>
          <Select
            defaultValue={filterAxisY}
            variant="borderless"
            placement='bottomRight'
            style={{
              width: 120, transform: "rotate(-90deg)"
            }}
            onChange={setFilterAxisY}
            options={
              optionsDropdown
                .filter(option => option !== undefined && option.value !== filterAxisX)
            }
          />
        </Space>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
          <div id="chartdiv" style={{ width: "100%", height: restHeight }} />
          <Select
            defaultValue={filterAxisX}
            variant="borderless"
            style={{
              width: 120,
            }}
            onChange={setFilterAxisX}
            options={
              optionsDropdown.filter(option => option !== undefined && option.value !== filterAxisY)
            }
          />

        </div>

      </div>

    </>

  );
}
