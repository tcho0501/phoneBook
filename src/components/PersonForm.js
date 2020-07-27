import React from 'react'
const PersonForm = ({handleAddButton, newName, handleNameBoxChange, newNumber, handleNumberBoxChange}) => {
    return (
      <div>
        <form onSubmit={handleAddButton}>
          <div>
            name: <input value = {newName} onChange = {handleNameBoxChange}/>
          </div>
        </form>
        <form onSubmit={handleAddButton}>
          <div>
            number: <input value = {newNumber} onChange = {handleNumberBoxChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      
    )
}

export default PersonForm