import React from 'react'

const TreeItem = ({ rowWeight, name, weight, value }) => {
  const itemWidth = (weight / rowWeight) * 100
  const backgroundColor = value >= 0 ? 'green' : 'red'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        border: '1px solid black',
        width: `${itemWidth}%`,
        backgroundColor: backgroundColor,
      }}
    >
      <div style={{ wordBreak: 'break-word', textAlign: 'center' }}>{name}</div>
      <div>{`${Math.round(value * 100 * 100) / 100}%`}</div>
    </div>
  )
}

export default TreeItem
