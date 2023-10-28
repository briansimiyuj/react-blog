import { useEffect, useContext, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import API from './api/posts'
import { format } from 'date-fns'
import DataContext from './context/DataContext'
 
const EditPost = () =>{

    const [editTitle, setEditTitle] = useState(''),

          [editBody, setEditBody] = useState(''),

          [results, setResults] = useContext(DataContext),

          history = useHistory(),

          { id } = useParams(),

          result = results.find(result => (result.id).toString() === id)


    useEffect(() =>{
    
       if(result){

            setEditTitle(result.title)

            setEditBody(result.body)

       }
    
    }, [result, setEditBody, setEditTitle])


    const handleEdit = async (id) =>{
    
       const dateTime = format(new Date(), 'MMM dd, yyy ppp'),

        updatedPost = { id, title: editTitle, dateTime, body: editBody }

       
        try{

            const response = await API.put(`/posts/${id}`, updatedPost)

            setResults(results.map(result => result.id === id ? { ...response.data } : result))

            setEditTitle('')

            setEditBody('')

            history.push('/')

        }catch(err){
  
            console.log(`Error: ${err.message}`)
    
        }
    
    }



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