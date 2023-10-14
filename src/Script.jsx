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

function Script() {

  const [search, setSearch] = useState(''),

        [results, setResults] = useState([]),

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

  return (
    <div className="script">
      
      <Header title="React JS Blog"/>

      <Nav search={search} setSearch={setResults}/>

      <Switch>

        <Route exact path="/">

          <Home/>

        </Route>


        <Route exact path="/post">

          <NewPost/>

        </Route>


        <Route exact path="/post/:id">

          <PostPage/>

        </Route>


        <Route path="/about" component={About}/>

        
        <Route path="*" component={Missing}/>

      </Switch>

      <Footer/>

      

    </div>
  )
}

export default Script