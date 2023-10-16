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

function Script() {

  const [search, setSearch] = useState(''),

        [results, setResults] = useState([]),

        [postTitle, setPostTitle] = useState(''),

        [postBody, setPostBody] = useState(''),

        history = useHistory(),

        [posts, setPosts] = useState([

          {
            id: 1,
            title: "My First Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
          },
          
          {
            id: 2,
            title: "My 2nd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
          },
          
          {
            id: 3,
            title: "My 3rd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
          },
          
          {
            id: 4,
            title: "My Fourth Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
          }

        ])


    useEffect(() =>{
    
      const filteredResults = posts.filter(post => 
        
        ((post.body).toLowerCase()).includes(search.toLowerCase())

        ||  ((post.title).toLowerCase()).includes(search.toLowerCase())
        
      )

      setResults(filteredResults.reverse())
    
    }, [posts, search])


  const handleDelete = (id) =>{
  
     const postList = posts.filter(post => post.id !== id)

     setPosts(postList)

     history.push('/')
  
  }


  const handleSubmit = (e) =>{
  
     e.preventDefault()

     const id = posts.length ? posts[posts.length - 1].id + 1 : 1,

          datetime = format(new Date(), 'MMM dd, yyyy pp'),

          newPost = { id, title: postTitle, body: postBody, datetime },

          allPosts = [...posts, newPost]

      
      setPosts(allPosts)

      setPostTitle('')

      setPostBody('')

      history.push('/')
  
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