import './Search.css'

const Search = ({list=[1,2,3,4,5,6,7]}: {list?: number[]}) => {
    return (
        <div>
            <div>SEARCH</div>
            <input type="text" name='search' list="Datalist"/>
            <datalist id="Datalist">
                {list.map(item => <option key={1} value={item}/>)}
            </datalist>
        </div>
    )
}

export default Search;