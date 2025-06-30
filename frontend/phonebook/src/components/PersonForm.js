const PersonForm = ({ addName, inputName, inputNumber }) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input onInput={inputName} />
            </div>
            <div>
                number: <input onChange={inputNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm