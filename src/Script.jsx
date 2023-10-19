import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import DataProvider from './context/DataContext';
import { Switch, Route } from 'react-router-dom'

function Script() {

  return (
    <div className="script">      

      <Header title="React JS Blog"/>

      <DataProvider>

        <Nav/>

        <Switch>

          <Route exact path="/" component={Home}/>


          <Route exact path="/post" component={NewPost}/>
          
          
          <Route path="/edit/:id" component={EditPost}/>


          <Route exact path="/post/:id" component={PostPage}/>


          <Route path="/about" component={About}/>

          
          <Route path="*" component={Missing}/>

        </Switch>

      </DataProvider>

        <Footer/>


    </div>
  )
}

export default Script