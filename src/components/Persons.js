import React from 'react'

const Persons = ({persons, handleDeleteButton}) => {
    return (
      <div>
        {persons.map((person,index) => <p key = {index}> 
                                          <b>{person.name} - </b>{person.number} 
                                          <button value = {person.id} name = {person.name} onClick = {handleDeleteButton}>delete</button>
                                        </p>)}
      </div>
    )
}

export default Persons