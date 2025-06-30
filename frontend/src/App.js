import './index.css'
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Text from './components/Text'
import PersonForm from './components/PersonForm'
import PhoneServices from './services/PhoneServices'
import ConfirmNotification from './components/ConfirmNotification'
import ErrorNotification from './components/errorNotification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState(false)
  const [personFilter, setPersonFilter] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    PhoneServices
      .getAll()
      .then(listPerson => setPersons(listPerson))
      .catch((error) => {
        setErrorMessage(error.message)
        setTimeout(() => {
          setErrorMessage(error.message)
        }, 5000)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      PhoneServices
        .addPerson(personObject)
        .then(newPerson => {
          setConfirmMessage(`Added ${newName}`)
          setTimeout(() => {
            setConfirmMessage(null)
          }, 5000)
          setPersons(persons.concat(newPerson))
        })
        .catch((error) => {
          setErrorMessage(error.message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, you want change?`)) {
        const changePerson = persons.find(person => person.name === newName)
        const personId = changePerson.id
        const personChanged = { ...changePerson, number: newNumber }
        PhoneServices
          .change(personId, personChanged)
          .then((returnedPerson) => {
            setPersons(persons.map(person =>
              person.id !== personId ? person : returnedPerson
            ))
            setConfirmMessage(`Changed ${newName}`)
            setTimeout(() => {
              setConfirmMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setErrorMessage(error.message)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const handleClickDelete = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      PhoneServices
        .deletePerson(id)
        .then(() => {
          setConfirmMessage(`Deleted ${name}`)
          setTimeout(() => {
            setConfirmMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch((error) => {
          setErrorMessage(error.message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    }
  }

  const inputName = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const inputNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  const inputFilter = (event) => {

    if (event.target.value.trim() !== '') {
      setFilter(true)
    } else {
      setFilter(false)
    }

    console.log(filter)
    setPersonFilter(event.target.value.trim())
  }

  const personsToShow = filter
    ? persons.filter(person => person.name === personFilter)
    : persons

  return (
    <div>
      <ConfirmNotification message={confirmMessage} />
      <ErrorNotification message={errorMessage} />
      <Text content='Phonebook' />
      <Filter inputFilter={inputFilter} />
      <Text content='add a new' />
      <PersonForm addName={addName} inputName={inputName} inputNumber={inputNumber} />
      <Text content='Numbers' />
      {personsToShow.map(person => {
        return (
          <div key={person.id}>
            <Persons name={person.name} number={person.number} handleClickDelete={() => handleClickDelete(person.id, person.name)} />
          </div>
        )
      })}

    </div>
  )
}

export default App