import React from 'react'
import TreeItem from './treeItem/'
import './styles.css'

const TreeMap = ({ isVisible, data, rowNum }) => {
  if (!isVisible) {
    return (
      <div className="tree-map-section">
        <div className="tree-map-title">Result</div>
        <div className="tree-map"></div>
      </div>
    )
  }

  const sortMockData = data.sort((a, b) => b.weight - a.weight)

  const getRowWeight = (row) => {
    return row.reduce((sum, item) => sum + item.weight, 0)
  }

  const getMinRowIndex = (rows) => {
    let minRowIndex = 0
    for (let i = 1; i < rows.length; i++) {
      const minRowWeight = getRowWeight(rows[minRowIndex])
      const rowWeight = getRowWeight(rows[i])
      if (rowWeight < minRowWeight) {
        minRowIndex = i
      }
    }
    return minRowIndex
  }

  const getMaxRowIndex = (rows) => {
    let maxRowIndex = 0
    for (let i = 1; i < rows.length; i++) {
      const maxRowWeight = getRowWeight(rows[maxRowIndex])
      const rowWeight = getRowWeight(rows[i])
      if (rowWeight > maxRowWeight) {
        maxRowIndex = i
      }
    }
    return maxRowIndex
  }

  const getItemRows = () => {
    const result = []
    let remainData = [...sortMockData]

    // Init all row have at least 1 element
    for (let i = 0; i < rowNum; i++) {
      result.push([remainData[i]])
    }

    remainData = remainData.slice(rowNum)

    for (let i = 0; i < remainData.length; i++) {
      const minRowIndex = getMinRowIndex(result)
      result[minRowIndex].push(remainData[i])
    }

    return result
  }

  const itemRows = getItemRows()

  const maxRowIndex = getMaxRowIndex(itemRows)
  const rowWeight = getRowWeight(itemRows[maxRowIndex])

  return (
    <div className="tree-map-section">
      <div className="tree-map-title">Result</div>
      <div className="tree-map">
        {itemRows.map((row, index) => (
          <div
            style={{ display: 'flex', height: `${100 / rowNum}%` }}
            key={index}
          >
            {row.map((item, index) => (
              <TreeItem key={index} rowWeight={rowWeight} {...item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TreeMap
