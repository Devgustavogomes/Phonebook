const Persons = ({ name, number, handleClickDelete }) => {
    return (
        <div>
            <p>{`${name} ${number}`}</p>
            <button onClick={handleClickDelete}>delete</button>
        </div>
    )
}

export default Persons