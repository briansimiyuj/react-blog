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

        [postTitle, setPostTitle] = useState(''),

        [postBody, setPostBody] = useState(''),

        [editTitle, setEditTitle] = useState(''),

        [editBody, setEditBody] = useState(''),

        [posts, setPosts] = useState([]),

        { width } = useWindowSize(),

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


    const handleEdit = async (id) =>{
    
        const datetime = format(new Date(), 'MMM dd, yyyy pp'),
  
              updatedPost = { id, title: editTitle, body: editBody, datetime }
  
  
        try{
  
          const response = await API.put(`/posts/${id}`, updatedPost)
  
          setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
  
          setEditTitle('')
  
          setEditBody('')
  
          history.push('/')
  
        }catch(err){
  
          console.log(`Error: ${err.message}`)
  
        }
      
      }
  
  
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
  
  
    const handleSubmit = async (e) =>{
    
       e.preventDefault()
  
       const id = posts.length ? posts[posts.length - 1].id + 1 : 1,
  
            datetime = format(new Date(), 'MMM dd, yyyy pp'),
  
            newPost = { id, title: postTitle, body: postBody, datetime }
  
        try{
  
          const response = await API.post('/posts', newPost),
  
               allPosts = [...posts, response.data]
        
          setPosts(allPosts)
  
          setPostTitle('')
  
          setPostBody('')
  
          history.push('/')
  
        }catch(err){

          console.log(err)

        }
    
    }

    return(

        <DataContext.Provider value={{
          width, search, setSearch, handleSubmit, postTitle, setPostTitle, postBody, setPostBody, posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle, fetchError, isLoading
        }}>

            {children}

        </DataContext.Provider>

    )

}

export default DataContext