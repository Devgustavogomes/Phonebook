const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')




const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status - :response-time ms :body'));




app.get('/api/people', async (request, response) => {
    try {
        const result = await Person.find({})
        response.json(result)
    } catch (error) {
        console(error.message)
    }
})

app.get('/info', async (request, response) => {
    try {
        const length = await Person.countDocuments({})
        const date = new Date();
        response.send(`<h1>Phonebook has info for ${length} people</h1>
        <h2>${date}</h2>`)
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/api/people/:id', async (request, response) => {
    try {
        const person = await Person.findById(request.params.id)
        if (!person) {
        response.status(404).send({ error: 'Not found' })
        }
        response.json(person)
    } catch (error) {
        console.log(error.message)
    }
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.send(204).end()
})

app.post('/api/people', async (request, response) => {
    try {
        const body = await request.body

        if (!body.name) {
            return response.status(400).json({
                error: 'name missing'
            })
        }

        const repeatPerson = await Person.find({name: body.name})

        if(repeatPerson.length > 0){
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
        
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        await person.save()

        response.json(person)

    } catch (error) {
        console.log(error.message)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

