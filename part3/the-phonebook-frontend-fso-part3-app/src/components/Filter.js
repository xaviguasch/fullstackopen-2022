import React from 'react'

const Filter = ({ onFilterText, onHandleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={onFilterText} onChange={onHandleFilterChange} />
    </div>
  )
}

export default Filter
