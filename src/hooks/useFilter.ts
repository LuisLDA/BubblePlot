import { useState } from "react"

export const useFilter = ({valueX, valueY,}: {valueX: string, valueY: string}) => {
    const [filter, setFilter] = useState({
        filterAxisX: valueX,
        filterAxisY: valueY
    })

    const { filterAxisX, filterAxisY } = filter;

    const setFilterAxisX = (value: string) => {
        //console.log(`selected X: ${value}`);
        setFilter({ ...filter, filterAxisX: value })
    }

    const setFilterAxisY = (value: string) => {
        //console.log(`selected Y: ${value}`);
        setFilter({ ...filter, filterAxisY: value })
    }

    return {
        filterAxisX,
        filterAxisY,
        setFilterAxisX,
        setFilterAxisY
    }
}
