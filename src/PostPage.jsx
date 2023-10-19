import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const PostPage = () =>{

  const { results, handleDelete } = useContext(DataContext)

  const { id } = useParams(),

        result = results.find(result => (result.id).toString() === id)


    return(

        <main className="PostPage">

          <article className="post">

            {
            
              result &&

                <>
                
                  <h2>{result.title}</h2>

                  <p className="postDate">{result.datetime}</p>
                  
                  <p className="postBody">{result.body}</p>

                  <Link to={`/edit/${result.id}`}>

                    <button className="editButton">Edit Post</button>

                  </Link>

                  
                  <button className="deleteButton" onClick={() => handleDelete(result.id)}>Delete Post</button>
                
                </>
              
            }{

              !result &&

              <>
                <h2>Post Not Found</h2>

                <p>Well, that's disappointing.</p>

                <p><Link to='/'>Visit Our Homepage</Link></p>
                
              </>

            }

          </article>

        </main>

    )

}

export default PostPage