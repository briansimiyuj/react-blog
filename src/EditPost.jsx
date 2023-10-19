import { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const EditPost = () =>{

    const { results, handleEdit, editBody, setEditBody, editTitle, setEditTitle } = useContext(DataContext)

    const { id } = useParams(),

          result = results.find(result => (result.id).toString() === id)


    useEffect(() =>{
    
       if(result){

            setEditTitle(result.title)

            setEditBody(result.body)

       }
    
    }, [result, setEditBody, setEditTitle])



    return(

        <main className="NewPost">

            {
            
                editTitle &&

                    <>
                    
                        <h2>Edit Post</h2>


                        <form onSubmit={e => e.preventDefault()} className="newPostForm">

                            <label htmlFor="postTitle">Title:</label>

                            <input 
                                type="text" 
                                required
                                id="postTitle" 
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                            />


                            <label htmlFor="postBody">Post:</label>

                            <textarea
                                id="postBody"
                                required
                                value={editBody}
                                onChange={e => setEditBody(e.target.value)}
                            />

                            <button type="submit" onClick={() => handleEdit(result.id)}>Submit</button>

                        </form>
                    
                    </>
                    
            }{

                !editTitle &&
  
                <>
                  <h2>Post Not Found</h2>
  
                  <p>Well, that's disappointing.</p>
  
                  <p><Link to='/'>Visit Our Homepage</Link></p>
                  
                </>
  
              }

           

        </main>

    )

}

export default EditPost