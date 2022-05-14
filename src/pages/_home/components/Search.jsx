import React , { useRef } from 'react'
import { useHistory } from 'react-router-dom'

const Search = () => {

  const inputRef = useRef(null)
  const history = useHistory()
  const handleSearch = () => history.push(`/search/${ inputRef.current.value }`)

  return (
    <form>
          <div className="input-group mb-2 input-group-sm">
             <span className="input-group-text px-1 sp-1 bi ps-2 bi-search"></span>
              <input ref={ inputRef }
                    type="text" 
                    className="form-control" 
                    placeholder='Bikes,drones,cameras...'
               />
               <span className="input-group-text search-btn px-1 sp-2">  
                   <span onClick={ handleSearch }>  Search  </span>
               </span>
            </div>
    </form>
  )
}

export default Search