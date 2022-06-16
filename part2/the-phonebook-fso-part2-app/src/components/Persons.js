import React from 'react'
import Person from './Person'

const Persons = ({ onPersons, onFilterText }) => {
  return (
    <ul>
      {onPersons
        .filter((p) => p.name.toLowerCase().includes(onFilterText.toLowerCase()))
        .map((p) => (
          <Person key={p.name} name={p.name} number={p.number} />
        ))}
    </ul>
  )
}

export default Persons
