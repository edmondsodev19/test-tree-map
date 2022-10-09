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

const MIN_ROW_NUM = 1

const App = () => {
  const [displayData, setDisplayData] = useState(
    JSON.stringify(mockData, null, 2)
  )
  const [treeMapData, setTreeMapData] = useState(mockData)
  const [rowNum, setRowNum] = useState(MIN_ROW_NUM)
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  const handleChangeTreeMapData = (e) => {
    const inputValue = e.target.value
    setDisplayData(inputValue)
    setRowNum(MIN_ROW_NUM)
    setShowErrorMsg(true)
    if (!isJsonString(inputValue)) {
      return
    }
    const dataArr = JSON.parse(inputValue)
    if (dataArr.length === 0 || dataArr.length > 50) {
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
    setShowErrorMsg(false)
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

  const handleClickMinusRowNum = () => {
    if (rowNum === 1) {
      return
    }
    setRowNum((prev) => prev - 1)
  }

  const handleClickPlusRowNum = () => {
    if (rowNum === treeMapData.length) {
      return
    }
    setRowNum((prev) => prev + 1)
  }

  return (
    <div className="container">
      <div className="input-section">
        <div className="input-data-wrapper">
          <div className="title">Data</div>
          <textarea
            className="textarea"
            value={displayData}
            onChange={handleChangeTreeMapData}
          ></textarea>
          <div className="error-msg">{showErrorMsg && 'Invalid Data'}</div>
        </div>

        <div className="input-row-number-wrapper">
          <div className="title">Row number</div>
          <div className="input-row-number">
            <input
              style={{ flex: 1 }}
              value={rowNum}
              onChange={handleChangeRowNum}
            />
            <button onClick={handleClickMinusRowNum}>-1</button>
            <button onClick={handleClickPlusRowNum}>+1</button>
          </div>
        </div>
      </div>
      <TreeMap isVisible={!showErrorMsg} data={treeMapData} rowNum={rowNum} />
    </div>
  )
}

export default App
