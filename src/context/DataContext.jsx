import { createContext, useState, useEffect } from 'react'
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({ children }) =>{

    const [search, setSearch] = useState(''),

        [results, setResults] = useState([]),

        [posts, setPosts] = useState([]),

        { data, fetchError, isLoading } = useAxiosFetch('http://localhost:8000/posts')



    useEffect(() =>{
    
       setPosts(data)
     
    }, [data]) 
    


    useEffect(() =>{
    
      const filteredResults = posts.filter(post => 
        
        ((post.body).toLowerCase()).includes(search.toLowerCase())

        ||  ((post.title).toLowerCase()).includes(search.toLowerCase())
        
      )

      setResults(filteredResults.reverse())
    
    }, [posts, search])  
  

    return(

        <DataContext.Provider value={{
          search, setSearch, results, fetchError, isLoading, posts, setPosts
        }}>

            {children}

        </DataContext.Provider>

    )

}

export default DataContext