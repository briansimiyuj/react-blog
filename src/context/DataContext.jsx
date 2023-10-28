import { createContext, useState, useEffect } from 'react'
import {  useHistory } from 'react-router-dom'
import { format } from 'date-fns';
import API from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({ children }) =>{

    const [search, setSearch] = useState(''),

        [results, setResults] = useState([]),

        [posts, setPosts] = useState([]),

        { data, fetchError, isLoading } = useAxiosFetch('http://localhost:8000/posts'),

        history = useHistory()


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

  
  
    const handleDelete = async (id) =>{
    
        try{
  
          await API.delete(`/posts/${id}`)
  
          const postList = posts.filter(post => post.id !== id)
  
          setPosts(postList)
  
          history.push('/')
  
        }catch(err){
  
          console.log(`Error: ${err.message}`)
  
        }
    
    }
  
  

    return(

        <DataContext.Provider value={{
          search, setSearch, results, fetchError, isLoading, posts, setPosts
        }}>

            {children}

        </DataContext.Provider>

    )

}

export default DataContext