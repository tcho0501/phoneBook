

import React, { useState, useEffect } from 'react'
import personsServices from './services/persons'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ notifMessage, setNotifMessage ] = useState('')
  const [ errorStatus, setErrorStatus ] = useState(false);
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const handleFilterValueChange = (event) => {
    console.log('filterValue:', event.target.value)
    setFilterValue(event.target.value)
  }

  const handleNumberBoxChange = (event) => {
    // console.log('number box:', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameBoxChange = (event) => {
    // console.log('name box:', event.target.value)
    setNewName(event.target.value)
  }

  const createSuccessNotif = (message) => {
    setNotifMessage(message)
    setErrorStatus(false)
    setTimeout(() => {
      console.log('reset stuff')
      setNotifMessage('')
      setErrorStatus(false)
    }, 5000)
  }

  const createErrorNotif = (message) => {
    setNotifMessage(message)
    setErrorStatus(true)
    setTimeout(() => {
      console.log('reset stuff')
      setNotifMessage('')
      setErrorStatus(false)
    }, 5000)
  }

  const handleAddButton = (event) => {
    // console.log('name box:', event.target.value)
    console.log('add button pressed')
    event.preventDefault()
    const searchExistingName = persons.filter((person) => person.name === newName);

    if (searchExistingName.length > 0) {
      const oldPersonObj = searchExistingName[0]
      const newPerson = {
        ...oldPersonObj,
        number: newNumber
      }
      console.log('already exists', oldPersonObj)
      if(window.confirm(`${oldPersonObj.number} is already added to phonebook, replace the old number with a new one?`)) {
        personsServices
          .update(newPerson.id, newPerson)
          .then(response => {
            console.log('updated: ', newPerson)
            createSuccessNotif(`${newPerson.name} updated successfully`)
            setPersons(persons.map(person => person.id === newPerson.id ? newPerson : person))
          })
          .catch(error => {
            createErrorNotif(`${newPerson.name} was already removed from server`)
            setPersons(persons.filter(n => n.id !== oldPersonObj.id))
          })
      }
    } else if (newName === '' || newNumber === '') {
      alert(`Empty phone or name`)
    } else {
      console.log('adding:', newName)
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personsServices
        .create(newPerson)
        .then(response => {
          console.log('added: ', newPerson)
          createSuccessNotif(`${newPerson.name} added successfully`)
          setPersons(persons.concat(response))
        })
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handleDeleteButton = (event) => {
    event.preventDefault()
    // const id = parseInt(event.target.value)
    const id = event.target.value
    const name = event.target.name
    console.log(id)
    console.log(name)
    if(window.confirm(`Delete ${name}?`)) {
      personsServices
      .deleteItem(id)
      .then(response=> {
        console.log(response)
        console.log(`${name} deleted successfully`)
        createSuccessNotif(`${name} deleted successfully`)
        setPersons(persons.filter(person => {
          return person.id.toString() !== id
        }))
      })
      .catch(error => {
        console.log('Catch error',error)
        createErrorNotif(`${name} was already removed from server`)
        setPersons(persons.filter(n => n.id.toString() !== id))
      })
    }
    
  }

  const hook = () => {
    console.log('effect')
    personsServices
      .getAll()
      .then(initialData => {
        console.log('promise fulfilled')
        setPersons(initialData)
      })
  }

  console.log('use effect')
  useEffect(hook, []) // 2 parameters: function, how often effect is run
  // console.log(persons)
  console.log('render', persons.length, 'notes')

  const shownPersons = persons.filter((person) => person.name.includes(filterValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notifMessage} errorStatus = {errorStatus}/>
      <Filter filterValue = {filterValue} handleFilterValueChange = {handleFilterValueChange}/>
      <h3>Add New Number</h3>
      <PersonForm handleAddButton = {handleAddButton} newName= {newName} handleNameBoxChange= {handleNameBoxChange} newNumber = {newNumber} handleNumberBoxChange = {handleNumberBoxChange}/>
      <h3>Numbers</h3>
      <Persons persons = {shownPersons} handleDeleteButton = {handleDeleteButton}/>
      {/* <p onMouseOver = {generalAlertTest}> <i>Hover over me for info</i> </p> */}
    </div>
  )
}

export default App