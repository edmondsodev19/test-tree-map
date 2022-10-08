import React, { useState } from 'react'
import { isJsonString, isInteger } from './utils'
import './styles.css'

const mockData = [
  {
    name: 'A',
    weight: 19,
    value: -0.02,
  },
  {
    name: 'B',
    weight: 2,
    value: 0.05,
  },
  {
    name: 'C',
    weight: 3,
    value: 0.015,
  },
  {
    name: 'D',
    weight: 4,
    value: -0.01,
  },
  {
    name: 'E',
    weight: 5,
    value: 0.01,
  },
]

const mockJsonData = JSON.stringify(mockData)

const App = () => {
  const [treeMapData, setTreeMapData] = useState(mockJsonData)
  const [rowNum, setRowNum] = useState(0)

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

  const handleChangeNumOfRow = (e) => {
    const inputValue = e.target.value
    if (!isInteger(inputValue)) {
      return
    }
    const rowNumInt = parseInt(inputValue)
    const dataArr = JSON.parse(treeMapData)
    if (rowNumInt > dataArr.length) {
      return
    }
    setRowNum(rowNumInt)
  }

  return (
    <div className="container">
      <div className="input-section">
        <div className="input-data-wrapper">
          Data
          <textarea
            className="textarea"
            value={treeMapData}
            onChange={handleChangeTreeMapData}
          ></textarea>
        </div>

        <div className="input-row-number-wrapper">
          Row number
          <input value={rowNum} onChange={handleChangeNumOfRow} />
        </div>
      </div>
    </div>
  )
}

export default App
