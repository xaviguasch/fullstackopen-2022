import React from 'react'

const PersonForm = ({
  onAddNameHandler,
  onNewName,
  onHandleNameChange,
  onNewNumber,
  onHandleNumberChange,
}) => {
  return (
    <form onSubmit={onAddNameHandler}>
      <div>
        name: <input value={onNewName} onChange={onHandleNameChange} />
      </div>
      <div>
        number: <input value={onNewNumber} onChange={onHandleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
