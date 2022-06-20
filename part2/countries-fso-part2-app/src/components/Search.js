import React from 'react'

const Search = ({ onSearchTerm, onHandleSearchChange }) => {
  const handleInputChange = (e) => {
    onHandleSearchChange(e.target.value)
  }
  return (
    <div>
      Find countries{' '}
      <input type='text' value={onSearchTerm} onChange={handleInputChange} />
    </div>
  )
}

export default Search
