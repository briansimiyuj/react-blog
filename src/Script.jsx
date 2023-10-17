import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import API from './api/posts';
import posts from './api/posts'

function Script() {

  const [search, setSearch] = useState(''),

        [results, setResults] = useState([]),

        [postTitle, setPostTitle] = useState(''),

        [postBody, setPostBody] = useState(''),

        [editTitle, setEditTitle] = useState('')

        [editBody, setEditBody] = useState('')

        [posts, setPosts] = useState([]),

        history = useHistory()


    useEffect(() =>{
    
      const fetchPost = async() =>{
      
        try{

          const response = await API.get('/posts')

          setPosts(response.data)
          
        }catch(error){

          if(error.response){

            console.log(error.response.data)

            console.log(error.response.status)

            console.log(error.response.headers)

          }else{

            console.log(`Error: ${error.message}`)
            
          }
          
        }
      
      }


      fetchPost()
    
    }, [])


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

      }catch(err){}
  
  }


  return (
    <div className="script">
      
      <Header title="React JS Blog"/>

      <Nav search={search} setSearch={setSearch}/>

      <Switch>

        <Route exact path="/">

          <Home posts={results}/>

        </Route>


        <Route exact path="/post">

          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />

        </Route>


        <Route exact path="/post/:id">

          <PostPage posts={posts} handleDelete={handleDelete}/>

        </Route>


        <Route path="/about" component={About}/>

        
        <Route path="*" component={Missing}/>

      </Switch>

      <Footer/>

      

    </div>
  )
}

export default Script