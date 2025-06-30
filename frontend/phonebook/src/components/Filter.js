const Filter = ({ inputFilter }) => {
    return (
        <form>
            <div>
                filter shown with: <input onChange={inputFilter} />
            </div>
        </form>
    )
}

export default Filter;