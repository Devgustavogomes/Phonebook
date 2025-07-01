const mongoose = require('mongoose')

const password = process.argv[2]

const url =
    `mongodb+srv://DevGustavo:${password}@cluster0.agnqyik.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


async function addPerson (){
    try {
        await mongoose.connect(url)
        const person = new Person({
            name:process.argv[3],
            number: process.argv[4]
        })
        await person.save()
        console.log(`added ${person.name} number ${person.number} to phonebook`)
    } catch (error) {
        console.log(error.message)
    } finally {
        mongoose.connection.close()
    }
}

async function showPersons(){
    try {
        await mongoose.connect(url)
        const result = await Person.find({})
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        });
    } catch (error) {
        console.log(error.message)
    } finally {
        mongoose.connection.close()
    }
}


if(process.argv.length === 5){
    addPerson()
}else{
    showPersons()
}