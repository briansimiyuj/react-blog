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
  return (
    <div className="script">
      
      <Header title="React JS Blog"/>

      <Nav/>

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