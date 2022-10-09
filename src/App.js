import React, { useState } from 'react'
import { isJsonString, isInteger } from './utils'
import TreeMap from './components/treeMap/TreeMap'
import './styles.css'

const mockData = [
  {
    name: 'A',
    weight: 3,
    value: -0.02,
  },
  {
    name: 'B',
    weight: 3,
    value: 0.05,
  },
  {
    name: 'C',
    weight: 6,
    value: 0.015,
  },
  {
    name: 'D',
    weight: 2,
    value: -0.01,
  },
  {
    name: 'E',
    weight: 3,
    value: 0.01,
  },
]

const App = () => {
  const [treeMapData, setTreeMapData] = useState(mockData)
  const [rowNum, setRowNum] = useState(3)

  const handleChangeTreeMapData = (e) => {
    const inputValue = e.target.value
    if (!isJsonString(inputValue)) {
      return
    }
    const dataArr = JSON.parse(inputValue)
    if (dataArr.length > 50) {
      return
    }

    for (let i = 0; i < dataArr.length; i++) {
      if (typeof dataArr[i].name !== 'string' || dataArr[i].name.length > 50) {
        return
      }

      if (!Number.isInteger(dataArr[i].weight)) {
        return
      }
    }

    setTreeMapData(dataArr)
  }

  const handleChangeRowNum = (e) => {
    const inputValue = e.target.value
    if (!isInteger(inputValue)) {
      return
    }
    const rowNumInt = parseInt(inputValue)
    if (rowNumInt > treeMapData.length) {
      return
    }
    setRowNum(rowNumInt)
  }

  return (
    <div className="container">
      <div className="input-section">
        <div className="input-data-wrapper">
          <div className="title">Data</div>
          <textarea
            className="textarea"
            value={JSON.stringify(treeMapData)}
            onChange={handleChangeTreeMapData}
          ></textarea>
        </div>

        <div className="input-row-number-wrapper">
          <div className="title">Row number</div>
          <input value={rowNum} onChange={handleChangeRowNum} />
        </div>
      </div>
      <TreeMap data={treeMapData} rowNum={rowNum} />
    </div>
  )
}

export default App
