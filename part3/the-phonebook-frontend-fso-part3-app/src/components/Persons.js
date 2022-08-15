import React from 'react'
import Person from './Person'

const Persons = ({ onPersons, onFilterText, onDeleteNameHandler }) => {
  return (
    <ul>
      {onPersons
        .filter((p) => p.name.toLowerCase().includes(onFilterText.toLowerCase()))
        .map((p) => (
          <Person
            key={p.name}
            name={p.name}
            number={p.number}
            id={p.id}
            onDeleteNameHandler={onDeleteNameHandler}
          />
        ))}
    </ul>
  )
}

export default Persons
