import {createContext, useState} from 'react'

const SearchContext = createContext({
  searchInput: '',
  setSearchInput: () => {},
})

export const SearchContextProvider = ({children}) => {
  const [searchInput, setSearchInput] = useState('')
  return (
    <SearchContext.Provider value={{searchInput, setSearchInput}}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext
