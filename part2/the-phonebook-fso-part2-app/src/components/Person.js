import React from 'react'

const Person = ({ name, number, id, onDeleteNameHandler }) => {
  const deleteButtonHandler = () => {
    onDeleteNameHandler(id)
  }
  return (
    <li>
      {name} {number} <button onClick={deleteButtonHandler}>delete</button>
    </li>
  )
}

export default Person
